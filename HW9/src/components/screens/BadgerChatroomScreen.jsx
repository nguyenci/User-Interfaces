import { Alert, Button, StyleSheet, Text, TextInput, View, ScrollView, Modal } from "react-native"
import { useEffect, useState } from 'react'
import * as SecureStore from 'expo-secure-store'

import BadgerChatMessage from "../helper/BadgerChatMessage"

function BadgerChatroomScreen(props) {

    const [messages, setMessages] = useState([])
    const [activePage, setActivePage] = useState(1)
    const [modalVisible, setModalVisible] = useState(false)
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")

    const nextPage = () => {
        setActivePage(activePage + 1)
    }

    const prevPage = () => {
        setActivePage(activePage - 1)
    }

    const loadMessages = () => {
        fetch(`https://cs571.org/api/f23/hw9/messages?chatroom=${props.name}&page=${activePage}`, {
            headers: {
                "X-CS571-ID": "bid_07a545e236232f2479bf4a9c7381458910719af02a0a82c649f5f8d580288ade"
            }
        }).then(res => res.json()).then(json => {
            setMessages(json.messages)
        })
    }

    const postMessage = async () => {
        fetch(`https://cs571.org/api/f23/hw9/messages?chatroom=${props.name}`, {
            method: "POST",
            headers: {
                "X-CS571-ID": "bid_07a545e236232f2479bf4a9c7381458910719af02a0a82c649f5f8d580288ade",
                "Content-Type": "application/json",
                "Authorization": `Bearer: ${await SecureStore.getItemAsync("token")}`
            },
            body: JSON.stringify({
                title: title,
                content: body
            })
        }).then(res => res.json()).then(json => {
            if (json.msg === "Successfully posted message!") {
                setModalVisible(false)
                loadMessages()
            }
            Alert.alert(json.msg)
        })
    }
    
    const deleteMessage = async (id) => { 
        fetch(`https://cs571.org/api/f23/hw9/messages?id=${id}`, {
            method: "DELETE",
            headers: {
                "X-CS571-ID": "bid_07a545e236232f2479bf4a9c7381458910719af02a0a82c649f5f8d580288ade",
                "Content-Type": "application/json",
                "Authorization": `Bearer: ${await SecureStore.getItemAsync("token")}`
            }
        }).then(res => res.json()).then(json => {
            if (json.msg === "Successfully deleted message!") {
                loadMessages()
            }
            Alert.alert(json.msg)
        })
    }

    useEffect(loadMessages, [props, activePage])

    return <View style={{ flex: 1 }}>
        <ScrollView>
            {messages.length > 0 ?
                messages.map((message) => (
                    <BadgerChatMessage key={message.id} id={message.id} poster={message.poster}
                        title={message.title} content={message.content} created={message.created} deleteMessage={deleteMessage} />))
                : <Text style={styles.text}>No messages to display!</Text>}
        </ScrollView>
        <Text style={styles.text}>You are on page {activePage} of 4</Text>
        <View style={styles.buttons}>
            <Button title="Prev" onPress={prevPage} disabled={activePage === 1}></Button>
            <Button title="Next" onPress={nextPage} disabled={activePage === 4}></Button>
        </View>
        <Modal transparent={true} presentationStyle={"overFullScreen"} animationType="slide" visible={modalVisible}
            onRequestClose={() => { setModalVisible(false) }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text>Title</Text>
                    <TextInput style={styles.input} placeholder="Title" value={title} onChangeText={(e) => setTitle(e)} />
                    <Text>Body</Text>
                    <TextInput style={styles.input} placeholder="Body" value={body} onChangeText={(e) => setBody(e)} />
                    <View style={styles.buttons}>
                        <Button title="Cancel" onPress={() => setModalVisible(bool => !bool)}></Button>
                        <Button title="Post" onPress={postMessage} disabled={title === "" || body === "" ? true : false}></Button>
                    </View>
                </View>
            </View>
        </Modal>
        <View style={[styles.buttons, { marginBottom: 25 }]}>
            <Button title="Add Post" color="crimson" onPress={() => setModalVisible(true)}></Button>
        </View>

    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",

    },
    text: {
        textAlign: "center",
        marginTop: 15
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 10,
        backgroundColor: 'white',
        borderRadius: 25,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        width: 275,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    input: {
        height: 40,
        width: 200,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
})

export default BadgerChatroomScreen