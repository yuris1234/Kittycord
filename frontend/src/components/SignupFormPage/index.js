import { useDispatch } from "react-redux";
import { useState } from "react";
import { signup } from "../../store/session";
import './SignupFormPage.css'

export default function SignupFormPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors(prevErrors => [] );
            return dispatch(signup({username, email, password}))
                .catch(async (res) => {
                    let data;
                    try {
                        data = await res.clone().json();
                    } catch {
                        data = await res.text();
                    }
                    if (data?.errors) setErrors(prevErrors => [...prevErrors, ...data.errors] );
                    else if (data) setErrors(prevErrors => [...prevErrors, ...data]);
                    else setErrors(prevErrors => [...prevErrors, ...res.statusText]);
                });
            }
        return setErrors(['Password fields do not match'])
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error) => {
                        return <li key={error}>{error}</li>
                    })}
                </ul>
                <label>Email 
                    <input value={email} onChange={(e) => {setEmail(e.target.value)}}/>
                </label>
                <label>Username 
                    <input value={username} onChange={(e) => {setUsername(e.target.value)}}/>
                </label>
                <label>Password 
                    <input value={password} onChange={(e) => {setPassword(e.target.value)}}/>
                </label>
                <label>Confirm Password 
                    <input value={confirmPassword} onChange={(e) => {setConfirmPassword(e.target.value)}}/>
                </label>
                <input type="submit" value="Sign Up" />
            </form>
        </>
    )
}