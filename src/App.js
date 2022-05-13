import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import Components
import Header from './Components/Header';
import Homepage from './Pages/Homepage';
import Coin from './Pages/Coin';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Header/>
        <Routes>
          <Route path='/' element = {<Homepage/>} exact/>
          <Route path='/coins/:id' element = {<Coin/>} exact/>
        </Routes>
        
      </div>
    </BrowserRouter>
  );
}

export default App;
