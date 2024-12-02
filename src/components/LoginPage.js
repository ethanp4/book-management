import './LoginPage.css';
import {useNavigate} from 'react-router-dom';

export default function LoginPage() {
 const navigatetoBookBrowser = useNavigate();
 
 function Navigate(){
    navigatetoBookBrowser('/'); // Navigates to the book browser page 
  }

    return (<div>
        <h3> Bow Valley Library System Admin Login </h3>
        <br />
        <br />
        <br />
        <form>
            <label> UserName: </label>
            <input type="text" name="username" />
            <br />
            <br />
            <label> Password: </label>
            <input type="password" name="password" />
            <br />
            <br />
            <button onClick={Navigate()}> Login </button>
        </form>
    </div>);
}

