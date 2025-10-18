import {Routes, Route} from 'react-router-dom';
import Landing from './pages/Landing/Landing';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import About from './pages/About/About';
import Todolist from './pages/Todolist/Todolist';
import Homepage from './pages/Homepage/Homepage';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './components/ProtectedRoute.jsx';


function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/home' element={<ProtectedRoute><Homepage/></ProtectedRoute>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/todolist' element={<Todolist/>}/>
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
