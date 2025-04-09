import { Link } from "react-router-dom";
import log from './log.png';


export function Nav() {
    return (
        <header className="w-full h-24 bg-wheat flex items-center justify-start px-[3%] bg- stiky top-0 z-50 backdrop-blur-sm shadow-md">
            <div className="flex bg-wheat items-center justify-start w-1/4 h-full">
                <img src={log} alt="logo" className="w-[80%] max-w-[120px] object-contain" />
            </div>
            <div className="flex items-center justify-around w-1/2 max-sm:w-full max-sm:justify-center">
                <Link to="/" className="mx-2 px-2 py-1 text-xl font-bold italic text-teal-700 hover:text-black hover:-translate-y-1 transition duration-700">df</Link>
                <Link to="/a" className="mx-2 px-2 py-1 text-xl font-bold italic text-teal-700 hover:text-black hover:-translate-y-1 transition duration-700">df</Link>
                <Link to="/pagesi" className="mx-2 px-2 py-1 text-xl font-bold italic text-teal-700 hover:text-black hover:-translate-y-1 transition duration-700">dfdsf</Link>
            </div>
        </header>
    );
}
