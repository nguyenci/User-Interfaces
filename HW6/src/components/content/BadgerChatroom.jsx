import React, { useEffect, useState, useRef, useContext } from "react"
import BadgerMessage from "./BadgerMessage"
import { Container, Row, Col, Pagination, Form, Button } from "react-bootstrap"
import BadgerLoginStatusContext from "../contexts/BadgerLoginStatusContext"


export default function BadgerChatroom(props) {

    const [messages, setMessages] = useState([])
    const [activePage, setActivePage] = useState(1)
    const [loginStatus, setLoginStatus] = useContext(BadgerLoginStatusContext);
    const title = useRef()
    const message = useRef()

    const loadMessages = () => {
        fetch(`https://cs571.org/api/f23/hw6/messages?chatroom=${props.name}&page=${activePage}`, {
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        }).then(res => res.json()).then(json => {
            setMessages(json.messages)
            console.log(json.messages)
        })
    }

    const postMessage = () => {

        if (title.current.value === "" || message.current.value === "") {
            alert("You must provide both a title and message!")
            return
        }

        fetch(`https://cs571.org/api/f23/hw6/messages?chatroom=${props.name}`, {
            method: "POST",
            credentials: "include",
            headers: {
                "X-CS571-ID": CS571.getBadgerId(),
                "Content-Type": "application/json"
            }, body: JSON.stringify({
                title: title.current.value,
                content: message.current.value
            })
        }).then(res => {
            if (res.status === 200) {
                alert("Successfully posted!")
                loadMessages()
            } 
        })
    }

    const deleteMessage = (id) => {
        fetch(`https://cs571.org/api/f23/hw6/messages?id=${id}`, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "X-CS571-ID": CS571.getBadgerId()
            },
        }).then((res) => {
                if (res.status === 200) {
                    alert("Successfully deleted the post!")
                    loadMessages()
                }
            })
    }

    // Why can't we just say []?
    // The BadgerChatroom doesn't unload/reload when switching chatrooms, only its props change! Try it yourself.
    useEffect(loadMessages, [props, activePage]);

    return <>
        <h1>{props.name} Chatroom</h1>
        <hr />
        <Container fluid>
            <Row>

                {loginStatus === "true" ? (
                    <Form>
                        <Form.Group>
                            <Form.Label htmlFor="title">Post Title</Form.Label>
                            <Form.Control id="title" ref={title} />
                            <Form.Label htmlFor="msg" style={{ marginTop: "1rem" }}>Post Message</Form.Label>
                            <Form.Control id="msg" ref={message} />
                        </Form.Group>

                        <Button style={{ marginBottom: "1rem", marginTop: "1rem" }} onClick={postMessage} > Create Post </Button>
                    </Form>)
                    : (<p>You must be logged in to post!</p>)}
                {messages.length > 0 ?
                    <>
                        {messages.map((message) => (
                                <Col xs={12} sm={8} md={4} lg={3} xl={3} key={message.id}>
                                    <BadgerMessage
                                        title={message.title} poster={message.poster} content={message.content} created={message.created}
                                        id={message.id} deletePost={deleteMessage} />
                                </Col>
                            ))
                        }
                    </>
                    :
                    <>
                        <p style={{ marginTop: "1rem", marginBottom: "2rem" }}>There are no messages on this page yet!</p>
                    </>}
            </Row>
        </Container>

        <Pagination style={{ marginLeft: "1rem", marginTop: "1rem" }}>
            <Pagination.Item active={activePage === 1} onClick={() => setActivePage(1)}> 1 </Pagination.Item>
            <Pagination.Item active={activePage === 2} onClick={() => setActivePage(2)}> 2 </Pagination.Item>
            <Pagination.Item active={activePage === 3} onClick={() => setActivePage(3)}> 3 </Pagination.Item>
            <Pagination.Item active={activePage === 4} onClick={() => setActivePage(4)}> 4 </Pagination.Item>
        </Pagination>
    </>

}
