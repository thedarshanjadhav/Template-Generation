// LoginForm.jsx
import {  useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../assets/css/login.css";
import { UserContext } from "../../App";

export default function LoginForm(){

    const { dispatch } = useContext(UserContext);

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const [errorMessage, setErrorMessage] = useState('');

    const { username, password } = formData;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/login', {
                username,
                password
            });
            const { token } = response.data;
            console.log("token", token);
            localStorage.setItem('token', token);
            localStorage.setItem('successMessage', 'Login successful!'); // Store success message
            dispatch({type: "USER", payload: true})
            // window.alert("Login Successful!")
            navigate('/');
        } catch (error) {
            console.error("Login error:", error);
            if (error.response && error.response.data && error.response.data.message) {
                setErrorMessage(error.response.data.message); // Set error message from backend
            } else {
                setErrorMessage('An unexpected error occurred');
            }
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="login-box">
            <h1>𝐋𝐨𝐠𝐢𝐧</h1>
            <form onSubmit={handleSubmit}>
                <div className="user-box">
                    <input
                        name="username"
                        type="text"
                        value={username}
                        onChange={handleChange}
                        required
                    />
                    <label>Username</label>
                </div>
                <div className="user-box">
                    <input
                        name="password"
                        type="password"
                        value={password}
                        onChange={handleChange}
                        required
                    />
                    <label>Password</label>
                </div>
                {errorMessage && <p style={{color:'#FF5733', fontSize:'14px'}}>{errorMessage}</p>}
                <button type="Submit">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Login
                </button>
            </form>
        </div>
    );
}

