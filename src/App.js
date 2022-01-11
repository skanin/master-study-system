import Home from './components/Home/Home';
import Pretest from './components/Pretest/Pretest';
import InformationPage from './components/InformationPage/InformationPage';
import Login from './components/Auth/Login';

import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/master-study-system/login" element={<Login />} />
        <Route path="/master-study-system/Info" element={<PrivateRoute><InformationPage /></PrivateRoute>} />
        <Route path="/master-study-system/pretest/:pretestId" element={<PrivateRoute><Pretest /></PrivateRoute>} />
        <Route path="/master-study-system" element={<PrivateRoute><Home /></PrivateRoute>}/>
      </Routes>
    </Router>
  );
}

export default App;
