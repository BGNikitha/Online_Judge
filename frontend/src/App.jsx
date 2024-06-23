import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './components/Welcome';
import Login from './components/Login';
import Register from './components/Register';
import ProblemPage from './components/ProblemPage/ProblemPage';
import Problem from './components/ProblemPage/Problem';
import FooterText from './FooterText';
import Admin from './components/Admin/Admin'
import Create from './components/Functions/create'
import Edit from './components/Functions/edit'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/problems" element={<ProblemPage />} />
        <Route path="/problem/:id" element={<Problem />} /> 
        <Route path='/admin' element={<Admin/>} />
        <Route path='/admin/create' element={<Create/>} />
        <Route path='/admin/edit/:id' element={<Edit/>} />
        
      </Routes>
      <FooterText /> 
    </Router>
  );
};

export default App;

