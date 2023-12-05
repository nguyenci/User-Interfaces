import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native"
import { useState } from "react"

function BadgerRegisterScreen(props) {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")

    const signup = () => {
        if (username === "") {
            Alert.alert("You must provide a username")
            return
        } else if (password === "" || repeatPassword === "") {
            Alert.alert("Make sure both password fields are non-empty")
            return
        } else if (password !== repeatPassword) {
            Alert.alert("Passwords do not match")
            return
        }

        props.handleSignup(username, password)
    }

    return <View style={styles.container}>
        <Text style={{ fontSize: 36 }}>Join BadgerChat!</Text>
        <TextInput style={styles.input} placeholder="Username" value={username} onChangeText={(e) => setUsername(e)} />
        <TextInput style={styles.input} placeholder="Password" secureTextEntry={true} value={password} onChangeText={(e) => setPassword(e)} />
        <TextInput style={styles.input} placeholder="Confirm Password" secureTextEntry={true} value={repeatPassword} onChangeText={(e) => setRepeatPassword(e)} />
        <View style={styles.buttons}>
            <Button color="crimson" title="Signup" onPress={signup} />
            <Button color="grey" title="Nevermind" onPress={() => props.setIsRegistering(false)} />
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

export default BadgerRegisterScreen