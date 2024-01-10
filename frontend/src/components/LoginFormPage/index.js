import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { login } from "../../store/session";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
// import './LoginForm.css';
import LoginBackground from "../../assets/login";
import { Link } from "react-router-dom/cjs/react-router-dom.min";


function LoginFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state=>state.session)
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);


    if (sessionUser.user) return <Redirect to="/channels" />;

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(prevErrors => [] );
        return dispatch(login({credential, password}))
            .catch(async (res) => {
                let data;
                try {
                    data = await res.clone().json();
                } catch {
                    data = await res.text();
                }
                console.log(data);
                if (data?.errors) setErrors(prevErrors => [...prevErrors, ...data.errors]);
                else if (data) setErrors(prevErrors => [...prevErrors, ...data]);
                else setErrors(prevErrors => [...prevErrors, ...res.statusText]);
            });
    }

    const credentialChange = (e) => {
        setCredential(e.target.value);
    }

    const passwordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleDemo = (e) => {
        dispatch(login({credential: "Demo-lition", password: "password"}))
    }

    return (
        <>
            <div className="form-container">
                <div className="form-wrapper">
                    <div className="login-welcome">
                        <h1 className="header">Welcome back!</h1>
                        <div className="subheader">We're so excited to see you again!</div>
                    </div>
    
                    <form className="login-form" onSubmit={handleSubmit}>
                        <ul className="errors">
                            {errors && errors.map((error) => {return <li key={error}>{error}</li>})}
                        </ul>
                        <label className="label" for="credential">Username or Email <span className="login-span">*</span>
                        </label>
                        <input name="email" className="input" value={credential} onChange={credentialChange} />
                        <label className="label" for="password">Password <span className="login-span">*</span>
                        </label>
                        <input type="password" name="password" className="input" value={password} onChange={passwordChange} />
                        <input className="submit" type="submit" value="Login" />
                        {/* <p>Need an account? <Link to="/signup"><p className="register">Register</p></Link></p> */}
                    </form>
                    <div>
                        <p className="register-text">Need an account? <Link to="/signup"><span className="register">Register</span></Link></p>
                    </div>
                    <input type="submit" value="Demo Login" className="submit" onClick={handleDemo} />
                </div>
                <LoginBackground className="login-background"/>
            </div>
        </>
    )
}

export default LoginFormPage