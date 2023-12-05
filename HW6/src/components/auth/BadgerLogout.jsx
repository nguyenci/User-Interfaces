import React, { useEffect, useContext } from 'react';
import BadgerLoginStatusContext from "../contexts/BadgerLoginStatusContext";


export default function BadgerLogout() {

    const [loginStatus, setLoginStatus] = useContext(BadgerLoginStatusContext);

    useEffect(() => {
        fetch("https://cs571.org/api/f23/hw6/logout", {
            method: "POST",
            credentials: "include",
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            },
        }).then(() => {
            setLoginStatus("false")
            sessionStorage.setItem("login", "false")
            sessionStorage.setItem("username", "")
            alert("Logout successful!")
        })
    }, [])

    return <>
        <h1>Logout</h1>
        <p>You have been successfully logged out.</p>
    </>
}
