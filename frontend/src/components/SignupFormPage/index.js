import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { signup } from "../../store/session";
// import './SignupForm.css'
import { Redirect } from "react-router-dom";
import React from "react";
import LoginBackground from "../../assets/login";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export default function SignupFormPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [errors, setErrors] = useState([]);
    const [year, setYear] = useState(2023);
    const [month, setMonth] = useState(1);
    const [day, setDay] = useState(1);
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session);

    if (sessionUser.user) return <Redirect to="/channels" />;

    const handleSubmit = (e) => {
        e.preventDefault();
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

    const days = Array.from(Array(32).keys())
    days.shift();

    const years = Array.from(
        { length: 2023 - 1900 + 1 },
        (_, i) => 1900 + i
    )
    years.reverse();

    return (
        <>
            <div className="form-container">
                <div className="form-wrapper">
                    <h1 className="header">Create an Account</h1>
                    <form className="login-form" onSubmit={handleSubmit}>
                        <ul>
                        </ul>
                        <label className="label" for="email">Email <span className="login-span">*</span>
                        </label>
                            <input className="input" name="email" value={email} onChange={(e) => {setEmail(e.target.value)}}/>
                        <label className="label" for="display-name">Display Name 
                        </label>
                            <input className="input" name="display-name" value={displayName} onChange={(e) => {setDisplayName(e.target.value)}}/>
                        <label className="label" for="username">Username <span className="login-span">*</span>
                        </label>
                            <input className="input" name="username" value={username} onChange={(e) => {setUsername(e.target.value)}}/>
                        <label className="label" for="password">Password <span className="login-span">*</span>
                        </label>
                            <input type="password" className="input" name="password" value={password} onChange={(e) => {setPassword(e.target.value)}}/>
                        <div className="date-container">  
                            <label className="label">Date of Birth <span className="login-span">*</span></label>
                            <div className="date-wrapper">
                                {/* <label className="label" for="month">Month
                                </label> */}
                                    <select className="input date" name="month" onChange={(e) => {setMonth(e.target.value)}}>
                                        <option disabled selected>Month</option>
                                        <option value='January'>January</option>
                                        <option value='February'>February</option>
                                        <option value='March'>March</option>
                                        <option value='April'>April</option>
                                        <option value='May'>May</option>
                                        <option value='June'>June</option>
                                        <option value='July'>July</option>
                                        <option value='August'>August</option>
                                        <option value='September'>September</option>
                                        <option value='October'>October</option>
                                        <option value='November'>November</option>
                                        <option value='December'>December</option>
                                    </select>
                                {/* <label className="label" for="day">Day 
                                </label> */}
                                    <select className="input date" name="day" onChange={(e) => {setDay(e.target.value)}}>
                                        <option disabled selected>Day</option>
                                        {days.map((num) => {
                                            return <option key={num} value={num}>{num}</option>
                                        })}
                                    </select>
                                {/* <label className="label" for="year">Year 
                                </label> */}
                                    <select className="input date" name="year" onChange={(e) => {setYear(e.target.value)}}>
                                        <option disabled selected>Year</option>
                                        {years.map((num) => {
                                            return <option key={num} value={num}>{num}</option>
                                        })}
                                    </select>
                            </div>
                        </div>  
                        <input type="submit" className="submit" value="Continue" />
                    </form>
                    <div>
                        <p className="register-text"><Link to="/login"><span className="register">Already have an account?</span></Link></p>
                    </div>
                </div>
                <LoginBackground className="login-background"/>
            </div>
        </>
    )
}