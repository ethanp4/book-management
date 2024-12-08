import { useContext, useReducer, useRef, useState } from 'react';
import './LoginPage.css';
import LoginModal from './LoginModal';
import { LoginContext } from './LoginProvider';

const initialLoginState = {
    username: '',
    password: ''
}

function loginReducer(state, action) {
    switch (action.type) {
        case 'updateField':
            return {
                ...state,
                [action.field]: action.value
            }
        case 'reset':
            return initialLoginState
        default:
            return state
    }
}

export default function LoginPage() {
    const { setIsAdmin } = useContext(LoginContext)
    const dialog = useRef()
    const [loginSuccessful, setLoginSuccessful] = useState(false);
    const [loginState, setLogin] = useReducer(loginReducer, initialLoginState); //set up reducer
    function handleFormChange(e) {
        setLogin({
            type: 'updateField',
            field: e.target.name,
            value: e.target.value
        })
    }
    function attemptLogin(e) {
        e.preventDefault();
        fetch('http://127.0.0.1:7000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: loginState.username,
                password: loginState.password
            }),
        }).then((response) => {
            if (response.ok) {
                setLoginSuccessful(true);
                return response.json();
            }
        }).then((data) => {
            if (data) {
                setIsAdmin(true);
            }
        }).catch((error) => { //http error (unauthorized)
            console.log("set login successful to false");
            setLoginSuccessful(false);
            console.error(error);
        }).finally(() => {
            dialog.current.showModal();
        })
    }
    return (
        <div className='LoginPage'>
            <div className='loginDiv'>
                <LoginModal ref={dialog} success={loginSuccessful} />
                <form onSubmit={(e) => attemptLogin(e)}>
                    <h2>Bow Valley Library System Admin Login</h2>
                    <br />
                    <br />
                    <br />
                    <br />
                    <table>
                        <tr>
                            <td><label>Username:</label></td>
                            <td><input onChange={handleFormChange} type="text" name="username" /></td>
                        </tr>
                        <tr>
                            <td><label>Password:</label></td>
                            <td><input onChange={handleFormChange} type="password" name="password" /></td>
                        </tr>
                        <tr>
                            <td><button type="submit">Login</button></td>
                        </tr>
                    </table>
                </form>
            </div>
        </div>
    );

}

