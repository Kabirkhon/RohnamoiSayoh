import { Link } from 'react-router-dom';
import './glawn.css';


export default function Glow() {
    
    return (
      <div className="percon w-full bg-gray-100 text-center">
      
      <div className="w-full h-[90vh] flex items-start justify-start bg-cover bg-no-repeat"   style={{ backgroundImage: "url('./photo/e.webp')" }} >
       
        <div className="text-left flex flex-col backdrop-blur-sm rounded-2xl font-bold w-full sm:w-11/12 md:w-2/5 h-auto md:h-[45%]  mt-16 md:mt-60 ml-4 md:ml-20 p-4">
         
          <h1 className="text-black text-2xl md:text-3xl w-full">
            Хуш омадед ба Таджикистон
          </h1>
          
          <h1 className="text-black font-bold text-base md:text-lg w-full mt-2">
            Таджикистон — кишвари кӯҳҳои сарбаланд ва фарҳанги қадима. Ин ҷои меҳмоннавозӣ бо табиати зебо, кӯлҳои мусаффо ва шаҳрҳои таърихӣ, аз қабили Душанбе, Хуҷанд ва Бохтар, сайёҳонро ҷалб мекунад. Мардуми маҳаллӣ бо ҳунарҳои дастии худ ва таомҳои лазиз маъруфанд, ки фарҳанги ғании минтақаи Осиёи Миёнаро инъикос мекунанд.
          </h1>
        
          <button className="mt-4 w-full max-w-sm h-12 bg-[#648a6c] rounded-xl">
            <Link 
              className="text-[1.3rem] text-[#f5deb3] inline-block w-full h-full flex items-center justify-center"
              to="/a">
              Харита
            </Link>
          </button>
        </div>
      </div>
    </div>
    );
}
        
    

