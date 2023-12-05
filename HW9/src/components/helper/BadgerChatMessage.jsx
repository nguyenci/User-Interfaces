import { Button, Text } from "react-native"
import { useState } from 'react'
import * as SecureStore from 'expo-secure-store'

import BadgerCard from "./BadgerCard"

function BadgerChatMessage(props) {

    const [userToken, setUserToken] = useState("")
    const dt = new Date(props.created)

    const getUserToken = async () => {
        setUserToken(await SecureStore.getItemAsync("username"))
    }

    getUserToken()

    return <BadgerCard style={{ marginTop: 16, padding: 8, marginLeft: 8, marginRight: 8 }}>
        <Text style={{ fontSize: 28, fontWeight: 600 }}>{props.title}</Text>
        <Text style={{ fontSize: 12 }}>by {props.poster} | Posted on {dt.toLocaleDateString()} at {dt.toLocaleTimeString()}</Text>
        <Text></Text>
        <Text>{props.content}</Text>
        {
            props.poster === userToken ?
                <Button color="crimson" title="Delete" onPress={() => props.deleteMessage(props.id)}></Button>
                :
                ""
        }
    </BadgerCard>
}

export default BadgerChatMessage