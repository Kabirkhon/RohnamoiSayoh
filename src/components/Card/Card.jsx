
import "./card.css"

export default function Card({ image, id, name, description }) {
    return (
        <div className="cals p-5 mb-10 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
        <img src={'./bolflag.webp'} alt={name} className="rounded-lg w-full h-48 object-cover" />
        <div className="p-4 flex flex-col justify-between flex-grow">
          <h3 className="text-lg font-bold text-gray-800 mb-2 text-center">{name}</h3>
          <p className="text-sm text-gray-600 italic mb-4 text-center">{description}</p>
          <button className="w-full py-2 mt-auto rounded-md bg-emerald-600 text-white hover:bg-emerald-500 transition-colors duration-300 font-medium">
            Подробнее
          </button>
        </div>
      </div>
    );
}
