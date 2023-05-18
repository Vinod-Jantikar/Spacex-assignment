import React, { useState } from 'react'
import {useNavigate, Link} from "react-router-dom";

const Login = () => {
    const [data, setData] = useState({
        email: "",
        password: ""
    })
    const navigate = useNavigate()


    const handleChange = (e) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:8989/api/auth/login', {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "Application/json",
            },
        })
        navigate("/capsules")
    }

    return (
        <div className='mainDiv'>
            <form onSubmit={handleSubmit}>
               
                <div className='inputDiv'>
                    <input type="text" name="email" value={data.email} onChange={handleChange} id="" placeholder='Enter Email' />
                </div>
              
                <div className='inputDiv'>
                    <input type="text" name="password" value={data.password} onChange={handleChange} id="" placeholder='Enter Password' />
                </div>
                <div>
                    <input className='submit-btn' type="submit" value="Submit" />
                </div>

            </form>
            <p>Don't have an account? click here to <Link to="/">Register</Link></p>
        </div>
    )
}

export default Login
