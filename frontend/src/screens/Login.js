import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });

    let navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        // Making the API call
        try {
            const response = await fetch("http://localhost:5000/api/loginuser", {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({
                    email: credentials.email,
                    password: credentials.password
                })
            });

            const json = await response.json();
            console.log("Response:", json); // Log the response from the server


            // Handle success or error from the response
            if (json.success) {
                localStorage.setItem("userEmail", credentials.email);
                localStorage.setItem("authToken", json.authToken);
                console.log(localStorage.getItem("authToken"));
                navigate("/");
                // Redirect or perform additional actions on successful login
            } else {
                alert("Invalid login credentials.");
            }
        } catch (error) {
            // Catch any network errors
            console.error("Error:", error);
            alert("Network error, please try again.");
        }
    };

    const onChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value });
    };

    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={credentials.email}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={credentials.password}
                        onChange={onChange}
                        required
                    />
                </div>
                <button type="submit" className="m-3 btn btn-success">Submit</button>
                <Link to="/creatuser" className='m-3 btn btn-primary'>I'm a new user</Link>
            </form>
        </div>
    );
}
