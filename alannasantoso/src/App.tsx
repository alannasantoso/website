import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import About from './pages/About'
import Photos from './pages/Photos'
import Projects from './pages/Projects'
import Links from './pages/Links'
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
          </Routes>
        </div>
      </div>
    </Router>
  );
}
