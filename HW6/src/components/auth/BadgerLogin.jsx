
import React, { useState, useContext } from 'react';
import { Form, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import BadgerLoginStatusContext from "../contexts/BadgerLoginStatusContext";

export default function BadgerLogin() {

    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const [loginStatus, setLoginStatus] = useContext(BadgerLoginStatusContext);

    const login = () => {

        if (username === "" || password === "") {
            alert("You must provide both a username and password!")
            return
        }

        fetch("https://cs571.org/api/f23/hw6/login", {
            method: "POST",
            credentials: "include",
            headers: {
                "X-CS571-ID": CS571.getBadgerId(),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
            .then(res => res.json())
            .then(json => {
                if (json.msg === "Successfully authenticated.") {

                    setLoginStatus("true")
                    sessionStorage.setItem('login', "true")
                    sessionStorage.setItem('username', username)
                    navigate("/")

                    alert("Login successful!")
                } else if (json.msg === "That username or password is incorrect!") {
                    alert("Incorrect username or password!")
                }
            })
    }

    return <>
        <h1>Login</h1>
        <br />

        <Form.Label htmlFor="username"> Username </Form.Label>
        <Form.Control id="username" value={username} onChange={(e) => setUserName(e.target.value)} ></Form.Control>

        <Form.Label htmlFor="password"> Password </Form.Label>
        <Form.Control id="password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" ></Form.Control>

        <br />
        <Button onClick={login}> Login </Button>
    </>
}
