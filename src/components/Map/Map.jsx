import map from './map.png';

import './map.css'
import { citiesTj } from '../citiesData';
import { useNavigate } from 'react-router-dom';

export default function Map()  {

  const navigate = useNavigate();

  

  const handleClick = (id) => {
    console.log(id);
    navigate(`/pagesi/${id}`);
  };
  
  return (
   
    <div className='obls'>
      <div className="hidden md:block w-full overflow-hidden mx-auto bg-cover bg-no-repeat" 
           style={{ backgroundImage: "url('./photo/nar.webp')" }}>
        <div className="w-full relative transition-transform duration-1000 ease-linear origin-center h-[90vh] md:h-[108vh]">
          <img src={map} alt="Карта Таджикистана" className="sds object-contain drop-shadow-lg" />
          {citiesTj.map((city, index) => (
            <div onClick={() => handleClick(city.id)} key={index} className="absolute font-bold  text-[#053f38] p-1 rounded cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 ease-out hover:scale-110 hover:text-red-500"   style={{ top: city.top, left: city.left }} >
              <span >{city.name}{city.id}</span>
              <span className="absolute -left-1 -top-1 w-2.5 h-2.5 bg-black rounded-full"></span>
            </div>
          ))}
        </div>
      </div>

      
      <div className="block md:hidden p-4 space-y-2">
        {citiesTj.map((city, index) => (
          <div onClick={() => handleClick(city.id)} key={index} className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
            <div className="flex flex-col">
              <h3 className="text-lg font-bold text-[#053f38]">{city.name}</h3>
              <p className="text-sm text-gray-600">{city.description}</p>
            </div>
        
          </div>
        ))}
      </div>
    </div>
  );
}

    









