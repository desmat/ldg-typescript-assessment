import Stack from 'react-bootstrap/Stack';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './App.css';
import Logo from './components/Logo';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className="App">
      <Router>
        <Stack gap={0} className="Page mx-auto">
          <div className="Page-header px-2">
            <Stack direction="horizontal" gap={0}>
              <div className="p-2 flex ">
                <Stack direction="horizontal" gap={2}>
                <Logo fill="white" height="3rem"/>
                  <div><b>LDG Typescript Assessement</b></div>
                </Stack>
              </div>              
              <div className="_p-2 ms-auto"></div> {/* spacer */}
              <div className="p-2"><Link to="/"><b>Dashboard</b></Link></div>
              <div className="p-2"><Link to="/about"><b>About</b></Link></div>
            </Stack>
          </div>
          <div className="Page-body p-2">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <div className="Page-footer p-2">Submitted by <a href="https://github.com/desmat" target="_blank">@desmat</a></div>
        </Stack>
      </Router>
    </div>
  );
}

export default App;
