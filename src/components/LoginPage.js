
import './LoginPage.css';
export default function LoginPage() {
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
            <button> Login </button>
        </form>
    </div>);
}

