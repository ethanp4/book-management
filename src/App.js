import './App.css';
import { BrowserRouter } from 'react-router-dom';
import LoginPage from './components/LoginPage.js';


function App() {
  return (
    <BrowserRouter>
    <LoginPage/>
    </BrowserRouter>
  );
}

export default App;
