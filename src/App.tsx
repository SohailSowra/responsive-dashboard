import './App.css'
import Dashboard from './Dashboard/Dashboard';
import Users from './Dashboard/Users/Users';
import {BrowserRouter,Routes,Route } from 'react-router-dom';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/user/:id" element={<Users />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
