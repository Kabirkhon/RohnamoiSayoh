/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./src/**/*.{js,ts,jsx,tsx,html}",
    ],
    theme: {
        extend: {
            colors: {
                wheat: '#f5deb3', // Кастомный цвет
                customGreen: '#137a6e',
            },
        },
    },
    plugins: [],
};
