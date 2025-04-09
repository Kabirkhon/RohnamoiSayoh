import { Routes, Route } from 'react-router-dom';
import './App.css';
import { Nav } from './components/Header/Header';

import Glow from './components/Glawn/glawn'

import Map from './components/Map/Map'
import CityPage from './components/Home/Home';




export default function App() {


    return (
        <>
            <Nav  />
            <Routes>
                <Route path="/" element={<Glow/>} />
                <Route path="/a" element={<Map/>} />
                <Route path='/pagesi/:id' element={<CityPage/>}/>
               
               
            </Routes>
          
        </>
    );
}

