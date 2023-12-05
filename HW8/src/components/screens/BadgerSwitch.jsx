import { Text, View, Switch, StyleSheet } from "react-native"
import { useState, useContext } from "react"

import BadgerPreferencesContext from "./BadgerPreferencesContext"

function BadgerSwitch(props) {

    const [checked, setChecked] = useState(true)
    const [prefs, setPrefs] = useContext(BadgerPreferencesContext)

    // Handle toggling of switch
    const toggleSwitch = () => {
        setChecked(previousState => !previousState)

        // If pref is already in prefs, remove it. Otherwise, add it.
        if (prefs.includes(props.pref)) {
            setPrefs(prefs.filter(pref => pref !== props.pref))
        } else {
            setPrefs([...prefs, props.pref])
        }
    }

    return <>
        <View style={styles.card}>
            <Text style={styles.pref}>{props.pref}</Text>
            <Switch value={checked} onValueChange={toggleSwitch}></Switch>
        </View>

    </>

}

const styles = StyleSheet.create({
    card: {
        padding: 16,
        paddingBottom: 10,
        elevation: 5,
        borderRadius: 25,
        backgroundColor: 'white',
        shadowOffset: {
            width: 4,
            height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1,
        alignItems: "center",
        marginTop: 15,
        marginHorizontal: 10,

    },
    pref: {
        fontSize: 18,
        marginBottom: 15,
        fontWeight: "bold"
    },
})

export default BadgerSwitch