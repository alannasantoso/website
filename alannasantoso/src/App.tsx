import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from './pages/Home.js'
import About from './pages/About.js'
import Photos from './pages/Photos.js'
import Projects from './pages/Projects.js'
import Links from './pages/Links.js'
import Photobooth from './pages/Photobooth.js'
import TakePhoto from './pages/TakePhoto.js'
import './main.css'

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/photos" element={<Photos />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/links" element={<Links />}/>
            <Route path="/photobooth" element={<Photobooth />}/>
            <Route path="/photobooth/take-photo" element={<TakePhoto />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
