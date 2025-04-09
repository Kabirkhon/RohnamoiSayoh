
import axios from 'axios';
import './home.css';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from '../Card/Card';

const CityPage = () => {
  const [citiry, setCitiry] = useState([]);

  const { id } = useParams(); 

  console.log(id);
  const getCiti = async () => {
    try {
      
      const result = await axios.get(`http://localhost:3000/attracciti?id=${id}`);
      const data = result.data;
      
      if (Array.isArray(data)) {
        setCitiry(data); 
      } else {
        console.error('Полученные данные не являются массивом');
      }
      console.log(data); 
    } catch (error) {
      console.error('Ошибка при получении городов:', error);
    }
  };


  return (
    <div className="city-page w-full font-sans text-[#333] bg-no-repeat bg-top bg-cover min-h-screen">
  <button onClick={getCiti} className="bg-[#197368] text-white px-4 py-2 rounded m-4 hover:bg-[#145c50] transition">OO</button>

  <div className="centerc w-full flex items-start flex-wrap justify-center text-center h-[40rem]">
    <h1 className="w-[15%] text-[1.3rem] mt-[11%] text-black font-normal italic">
      Добро пожаловать
    </h1>
  </div>

  <div className="w-10/12 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
  
      <Card
        key={1}
        id={1}
       
        description={'lorem from desituioion deret sretg vfhy cretyut div from cletr fr gfd gfsdgbfgb feryuiil jkib 65dv  yth '}
        name={'Aleg Der'}
      />

<Card
        key={1}
        id={1}
       
        description={'lorem from desituioion deret sretg vfhy cretyut div from cletr fr gfd gfsdgbfgb feryuiil jkib 65dv  yth '}
        name={'Aleg Der'}
      />
  
  <Card
        key={1}
        id={1}
       
        description={'lorem from desituioion deret sretg vfhy cretyut div from cletr fr gfd gfsdgbfgb feryuiil jkib 65dv  yth '}
        name={'Aleg Der'}
      />
  
  <Card
        key={1}
        id={1}
       
        description={'lorem from desituioion deret sretg vfhy cretyut div from cletr fr gfd gfsdgbfgb feryuiil jkib 65dv  yth '}
        name={'Aleg Der'}
      />
  
  <Card
        key={1}
        id={1}
       
        description={'lorem from desituioion deret sretg vfhy cretyut div from cletr fr gfd gfsdgbfgb feryuiil jkib 65dv  yth '}
        name={'Aleg Der'}
      />
  
  <Card
        key={1}
        id={1}
       
        description={'lorem from desituioion deret sretg vfhy cretyut div from cletr fr gfd gfsdgbfgb feryuiil jkib 65dv  yth '}
        name={'Aleg Der'}
      />
  
  <Card
        key={1}
        id={1}
       
        description={'lorem from desituioion deret sretg vfhy cretyut div from cletr fr gfd gfsdgbfgb feryuiil jkib 65dv  yth '}
        name={'Aleg Der'}
      />
  
  
  
</div>

</div>


      )
};

export default CityPage;
