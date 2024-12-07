import './LoginPage.css';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {

    const navigatetoBookBrowser = useNavigate();

    async function Authentication() {
    navigatetoBookBrowser('/'); // If the login is successsful, navigate to the book browser page  
    }

    return (<div className="LoginPage">
        <h2> Bow Valley Library System Admin Login </h2>
        <br />
        <br />
        <br />
        <form onSubmit={Authentication}>
            <label> UserName: </label>
            <input type="text" name="username"  required />
            <br />
            <br />
            <label> Password: </label>
            <input type="password" name="password"  required />
            <br />
            <br />
            <button type="submit"> Login </button>
        </form>
    </div>);
}

