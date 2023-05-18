
import './App.css';
import Login from './auth/signin/Login';
import Register from './auth/signup/Register';
import {Routes, Route} from "react-router-dom";
import Product from './components/Products/Product';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/' element={<Register/>}/>
        <Route path='/capsules' element={<Product/>}/>
      </Routes>
    </div>
  );
}

export default App;
