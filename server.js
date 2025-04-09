import express from 'express';
import cors from 'cors';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'public/uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });
const usersFilePath = path.join(__dirname, 'public', 'users.json');

app.get('/api/users', (req, res) => {
    fs.readFile(usersFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Ошибка чтения файла' });
        }

        try {
            const users = JSON.parse(data);
            res.json(users);
        } catch (parseError) {
            return res.status(500).json({ message: 'Ошибка при парсинге данных' });
        }
    });
});

app.get('/api/users/me', (req, res) => {
    const userId = req.query.userId;

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    fs.readFile(usersFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Ошибка чтения файла' });
        }

        try {
            const users = JSON.parse(data);
            const user = users.find(user => user.id === userId);

            if (user) {
                res.json(user);
            } else {
                return res.status(404).json({ message: 'Пользователь не найден' });
            }
        } catch (parseError) {
            return res.status(500).json({ message: 'Ошибка при парсинге данных' });
        }
    });
});

app.post('/api/users', (req, res) => {
    const { name, email, password } = req.body;

    fs.readFile(usersFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Ошибка чтения файла' });
        }

        try {
            const users = JSON.parse(data);
            // Проверка существующего пользователя
            const existingUser = users.find(user => user.email === email);
            if (existingUser) {
                return res.status(400).json({ message: 'Пользователь с таким email уже существует.' });
            }

            // Создание нового пользователя
            const newUser = {
                name,
                email,
                password,
                verificationCode: Math.floor(100000 + Math.random() * 900000).toString(),
                avatar: '',
                stories: [],
                likes: [],
                id: Date.now().toString()
            };

            users.push(newUser);

            fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (err) => {
                if (err) {
                    return res.status(500).json({ message: 'Ошибка записи в файл' });
                };

                // await sendVerificationEmail(email, newUser.verificationCode); // Раскомментируйте, если у вас есть функция отправки email

                res.status(201).json({
                    message: 'Пользователь создан',
                    userId: newUser.id,
                    verificationCode: newUser.verificationCode // Вернуть код подтверждения, если это необходимо
                });
            });
        } catch (parseError) {
            return res.status(500).json({ message: 'Ошибка при парсинге данных' });
        }
    });
});

app.post('/api/upload', upload.single('media'), (req, res) => {
    if (req.file) {
        return res.json({ message: 'Файл загружен', filePath: `/uploads/${req.file.filename}` });
    } else {
        return res.status(400).json({ message: 'Ошибка при загрузке файла' });
    }
});

app.post('/api/users/upload-video', upload.single('video'), (req, res) => {
    const userId = req.body.userId;

    fs.readFile(usersFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Ошибка чтения файла' });
        }

        try {
            const users = JSON.parse(data);
            const user = users.find(user => user.id === userId);

            if (user) {
                const newStory = {
                    id: Date.now().toString(),
                    url: `/uploads/${req.file.filename}`,
                    type: 'video',
                    comments: [],
                    likes: []
                };
                user.stories.push(newStory);
                fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (err) => {
                    if (err) {
                        return res.status(500).json({ message: 'Ошибка записи в файл' });
                    }

                    res.json({ message: 'Видео загружено', filePath: `/uploads/${req.file.filename}` });
                });
            } else {
                return res.status(404).json({ message: 'Пользователь не найден' });
            }
        } catch (parseError) {
            return res.status(500).json({ message: 'Ошибка при парсинге данных' });
        }
    });
});

app.post('/api/users/upload-avatar', upload.single('avatar'), (req, res) => {
    const userId = req.body.userId;

    fs.readFile(usersFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Ошибка чтения файла' });
        }

        try {
            const users = JSON.parse(data);
            const user = users.find(user => user.id === userId);

            if (user) {
                user.avatar = `/uploads/${req.file.filename}`;
                fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (err) => {
                    if (err) {
                        return res.status(500).json({ message: 'Ошибка записи в файл' });
                    }

                    res.json({ message: 'Аватар загружен', avatar: user.avatar });
                });
            } else {
                return res.status(404).json({ message: 'Пользователь не найден' });
            }
        } catch (parseError) {
            return res.status(500).json({ message: 'Ошибка при парсинге данных' });
        }
    });
});

app.post('/api/users/upload-photo', upload.single('photo'), (req, res) => {
    const userId = req.body.userId;

    fs.readFile(usersFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Ошибка чтения файла' });
        }

        try {
            const users = JSON.parse(data);
            const user = users.find(user => user.id === userId);

            if (user) {
                const newStory = {
                    id: Date.now().toString(),
                    url: `/uploads/${req.file.filename}`,
                    type: 'photo',
                    comments: [],
                    likes: []
                };
                user.stories.push(newStory);
                fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (err) => {
                    if (err) {
                        return res.status(500).json({ message: 'Ошибка записи в файл' });
                    }

                    res.json({ message: 'Фото загружено', filePath: `/uploads/${req.file.filename}` });
                });
            } else {
                return res.status(404).json({ message: 'Пользователь не найден' });
            }
        } catch (parseError) {
            return res.status(500).json({ message: 'Ошибка при парсинге данных' });
        }
    });
});

app.post('/api/stories/:storyId/comments', (req, res) => {
    const { storyId } = req.params;
    const { text } = req.body;

    fs.readFile(usersFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Ошибка чтения файла' });
        }

        try {
            const users = JSON.parse(data);
            const story = users.flatMap(user => user.stories).find(story => story.id === storyId);

            if (story) {
                const newComment = {
                    id: Date.now().toString(),
                    text,
                };
                story.comments.push(newComment);
                fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (err) => {
                    if (err) {
                        return res.status(500).json({ message: 'Ошибка записи в файл' });
                    }

                    res.status(201).json({ message: 'Комментарий добавлен', comment: newComment });
                });
            } else {
                return res.status(404).json({ message: 'Сторис не найден' });
            }
        } catch (parseError) {
            return res.status(500).json({ message: 'Ошибка при парсинге данных' });
        }
    });
});app.post('/api/stories/:storyId/like', (req, res) => {
    const { storyId } = req.params;
    const userId = req.body.userId;

    fs.readFile(usersFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Ошибка чтения файла' });
        }

        try {
            const users = JSON.parse(data);
            const allStories = users.flatMap(user => user.stories);
            const story = allStories.find(story => story.id === storyId);

            if (story) {
                // Просто добавляем ID пользователя в список лайков
                story.likes.push(userId);

                // Записываем обновленные данные обратно в файл
                fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (err) => {
                    if (err) {
                        return res.status(500).json({ message: 'Ошибка записи в файл' });
                    }

                    res.status(200).json({ message: 'Лайк добавлен', likes: story.likes });
                });
            } else {
                return res.status(404).json({ message: 'Сторис не найден' });
            }
        } catch (parseError) {
            return res.status(500).json({ message: 'Ошибка при парсинге данных' });
        }
    });
});


app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
