import React, { useState } from 'react';
import { Form, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

export default function BadgerRegister() {

    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [repeat, setRepeat] = useState("")
    const navigate = useNavigate()

    const register = () => {

        if (password !== repeat) {
            alert("Passwords do not match!")
            return
        } else if (username === "" || password === "") {
            alert("You must provide both a username and password!")
            return
        }

        fetch("https://cs571.org/api/f23/hw6/register", {
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
            .then(res => {
                if (res.status === 200) {
                    alert("Registration successful!")
                    navigate("/")
                } else if (res.status === 409) {
                    alert("The user already exists!")
                } else {
                    return res.json()
                }
            }).then(json => {
                alert(json.msg)
            })
    }

    return <>
        <h1>Register</h1>
        <br />

        <Form.Label htmlFor="username"> Username </Form.Label>
        <Form.Control id="username" value={username} onChange={(e) => setUserName(e.target.value)}></Form.Control>

        <Form.Label htmlFor="password"> Password </Form.Label>
        <Form.Control id="password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" ></Form.Control>

        <Form.Label htmlFor="repeat"> Repeat Password </Form.Label>
        <Form.Control id="repeat" value={repeat} onChange={(e) => setRepeat(e.target.value)} type="password" ></Form.Control>

        <br />
        <Button onClick={register}> Register </Button>
    </>
}
