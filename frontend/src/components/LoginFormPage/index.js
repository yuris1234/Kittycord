import { useDispatch } from "react-redux";
import { useState } from "react";
import { login } from "../../store/session";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './LoginForm.css';


function LoginFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state=>state.session.user)
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(login({credential, password}))
            .catch(async (res) => {
                let data;
                try {
                    data = await res.clone().json();
                } catch {
                    data = await res.text();
                }
                if (data?.errors) setErrors(data.errors);
                else if (data) setErrors([data]);
                else setErrors([res.statusText]);
            });
    }

    const credentialChange = (e) => {
        setCredential(e.target.value);
    }

    const passwordChange = (e) => {
        setPassword(e.target.value);
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                {errors.map((error) => {return <li key={error}>{error}</li>})}
                <label>Username or Email
                    <input value={credential} onChange={credentialChange} />
                </label>
                <label>Password 
                    <input value={password} onChange={passwordChange} />
                </label>
                <input type="submit" value="Login" />
            </form>
        </>
    )
}

export default LoginFormPage