import { Button, StyleSheet, Text, TextInput, View } from "react-native"
import { useState } from "react"

function BadgerLoginScreen(props) {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    return <View style={styles.container}>
        <Text style={{ fontSize: 36 }}>BadgerChat Login</Text>
        <TextInput placeholder="Username" value={username} onChangeText={(e) => setUsername(e)} style={styles.input} />
        <TextInput placeholder="Password" secureTextEntry={true} value={password} onChangeText={(e) => setPassword(e)} style={styles.input} />
        <Button color="crimson" title="Login" onPress={() => props.handleLogin(username, password)} />
        <View style={{ height: 25 }} />
        <Text style={{ fontSize: 12 }}>New here?</Text>
        <View style={styles.buttons}>
            <Button color="grey" title="Signup" onPress={() => props.setIsRegistering(true)} />
            <Button color="grey" title="Continue as Guest" onPress={() => props.handleGuest()} />
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
    input: {
        height: 40,
        width: 200,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    buttons: {
        flexDirection: "row",
        justifyContent: 'center',
    },
})

export default BadgerLoginScreen