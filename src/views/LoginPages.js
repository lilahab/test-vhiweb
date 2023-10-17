import React, { useState } from 'react';
import {Form, Button } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useHistory } from 'react-router-dom'
import axios from 'axios';

function LoginPages() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errorMsg, setErrorMsg] = useState("")
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = { email, password };
        axios
          .post('https://reqres.in/api/login', userData)
          .then((response) => {
            // Handle successful login, for example, store a token in local storage
            history.replace('/users')
            localStorage.setItem("token", response.data.token)
          })
          .catch((error) => {
            // Handle login error
            setErrorMsg("Login failed. Please check your email and password.");
          });
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    return (
        <div className="login-container">
            <div className="login-form">
                <h2>Login Form</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicEmail" className="form-group">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword" className="form-group">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type={showPassword ? 'text' : 'password'} // Show/hide password
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <FaEye
                            className="append-icon"
                            onClick={togglePasswordVisibility}
                        />
                        { showPassword ? <FaEye className="append-icon"  onClick={togglePasswordVisibility} /> : <FaEyeSlash  className="append-icon"  onClick={togglePasswordVisibility}/> }
                    </Form.Group>
                    {
                        errorMsg && (
                            <div className="error-message">
                                {errorMsg}
                            </div>
                        )
                    }

                    <Button variant="dark" type="submit">
                        Login
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default LoginPages;