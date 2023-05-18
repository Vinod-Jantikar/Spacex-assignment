import React, { useState } from 'react'
import {useNavigate, Link} from "react-router-dom";
import "../Styles/RegisterLogin.css";

const Register = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        mobile: "",
        password: ""
    })

    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:8989/api/auth/register', {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "Application/json",
            },
        })
        navigate("/login")

    }

    return (
        <div className='mainDiv'>
            <form onSubmit={handleSubmit}>
                <div className='inputDiv'>
                    <input type="text" name="name" value={data.name} onChange={handleChange} id="" placeholder='Enter Name' />
                </div>
                <div className='inputDiv'>
                    <input type="text" name="email" value={data.email} onChange={handleChange} id="" placeholder='Enter Email' />
                </div>
                <div className='inputDiv'>
                    <input type="text" name="mobile" value={data.mobile} onChange={handleChange} id="" placeholder='Enter Mobile' />
                </div>
                <div className='inputDiv'>
                    <input type="text" name="password" value={data.password} onChange={handleChange} id="" placeholder='Enter Password' />
                </div>
                <div>
                    <input className='submit-btn' type="submit" value="Submit" />
                </div>

            </form>

            <p>Already have an account? click here to <Link to="/login">Login</Link></p>

        </div>
    )
}

export default Register
