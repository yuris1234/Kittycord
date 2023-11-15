import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { signup } from "../../store/session";
import './SignupForm.css'
import { Redirect } from "react-router-dom";
import React from "react";

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
                    <form className="login-form" onSubmit={handleSubmit}>
                        <ul>
                            {errors.map((error) => {
                                return <li key={error}>{error}</li>
                            })}
                        </ul>
                        <label className="label" for="email">Email 
                        </label>
                            <input className="input" name="email" value={email} onChange={(e) => {setEmail(e.target.value)}}/>
                        <label className="label" for="display-name">Display Name
                        </label>
                            <input className="input" name="display-name" value={displayName} onChange={(e) => {setDisplayName(e.target.value)}}/>
                        <label className="label" for="username">Username 
                        </label>
                            <input className="input" name="username" value={username} onChange={(e) => {setUsername(e.target.value)}}/>
                        <label className="label" for="password">Password 
                        </label>
                            <input className="input" name="password" value={password} onChange={(e) => {setPassword(e.target.value)}}/>
                        <label className="label" for="month">Month
                        </label>
                            <select className="input" name="month" onChange={(e) => {setMonth(e.target.value)}}>
                                <option disabled defaultValue={month}>Month</option>
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
                        <label className="label" for="day">Day 
                        </label>
                            <select className="input" name="day" onChange={(e) => {setDay(e.target.value)}}>
                                <option disabled defaultValue={day}>Day</option>
                                {days.map((num) => {
                                    return <option key={num} value={num}>{num}</option>
                                })}
                            </select>
                        <label className="label" for="year">Year 
                        </label>
                            <select className="input" name="year" onChange={(e) => {setYear(e.target.value)}}>
                                <option disabled defaultValue={year}>Year</option>
                                {years.map((num) => {
                                    return <option key={num} value={num}>{num}</option>
                                })}
                            </select>
                        <input type="submit" value="Continue" />
                    </form>
                </div>
            </div>
        </>
    )
}