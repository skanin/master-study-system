import './App.css';

import Home from './components/Home/Home';
import Pretest from './components/Pretest/Pretest';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/pretest/:pretestId" element={<Pretest />} />
        <Route path="/" element={<Home />}/>
      </Routes>
    </Router>
  );
}

export default App;
