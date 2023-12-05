import { useEffect, useState } from 'react'
import { Alert } from "react-native"
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import * as SecureStore from 'expo-secure-store'

import BadgerChatroomScreen from './screens/BadgerChatroomScreen'
import BadgerRegisterScreen from './screens/BadgerRegisterScreen'
import BadgerLoginScreen from './screens/BadgerLoginScreen'
import BadgerLogoutScreen from './screens/BadgerLogoutScreen'
import BadgerLandingScreen from './screens/BadgerLandingScreen'

const ChatDrawer = createDrawerNavigator()

async function save(key, value) {
  await SecureStore.setItemAsync(key, value)
}

export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isRegistering, setIsRegistering] = useState(false)
  const [isGuest, setIsGuest] = useState(false)
  const [chatrooms, setChatrooms] = useState([])

  useEffect(() => {
    fetch("https://cs571.org/api/f23/hw9/chatrooms", {
      method: "GET",
      headers: {
        "X-CS571-ID": "bid_07a545e236232f2479bf4a9c7381458910719af02a0a82c649f5f8d580288ade",
      }
    }).then(res => res.json()).then(json => {
      setChatrooms(json)
    })
  }, [])

  function handleLogin(username, password) {
    fetch("https://cs571.org/api/f23/hw9/login", {
      method: "POST",
      headers: {
        "X-CS571-ID": "bid_07a545e236232f2479bf4a9c7381458910719af02a0a82c649f5f8d580288ade",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    }).then(res => res.json()).then(json => {
      if (json.msg === "Successfully authenticated.") {
        save("token", json.token)
        save("username", username)
        setIsLoggedIn(true)
      }
      Alert.alert(json.msg)
    })
  }

  function handleSignup(username, password) {

    fetch("https://cs571.org/api/f23/hw9/register", {
      method: "POST",
      headers: {
        "X-CS571-ID": "bid_07a545e236232f2479bf4a9c7381458910719af02a0a82c649f5f8d580288ade",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    }).then(res => res.json())
      .then(json => {
        if (json.msg === "Successfully authenticated.") {
          save("token", json.token)
          save("username", username)
          setIsLoggedIn(true)
        }
        Alert.alert(json.msg)
      })
  }

  const handleGuest = () => {
    setIsLoggedIn(true)
    setIsGuest(true)
  }

  const handleLogout = async () => {
    if (isGuest) {
      setIsGuest(false)
    } else {
      setIsLoggedIn(false)
      setIsRegistering(false)
      await SecureStore.deleteItemAsync("token")
      await SecureStore.deleteItemAsync("username")
      Alert.alert("Logged out successfully")
    }
  }

  if (isLoggedIn) {
    return (
      <NavigationContainer>
        <ChatDrawer.Navigator>
          <ChatDrawer.Screen name="Landing" component={BadgerLandingScreen} />
          {
            chatrooms.map(chatroom => {
              return <ChatDrawer.Screen key={chatroom} name={chatroom}>
                {(props) => <BadgerChatroomScreen name={chatroom} />}
              </ChatDrawer.Screen>
            })
          }
          {isGuest ?
            <ChatDrawer.Screen name="Signup">
              {(props) => <BadgerRegisterScreen handleSignup={handleSignup} setIsRegistering={setIsRegistering} />}
            </ChatDrawer.Screen>
            :
            <ChatDrawer.Screen name="Logout">
              {(props) => <BadgerLogoutScreen handleLogout={handleLogout} />}
            </ChatDrawer.Screen>
          }
        </ChatDrawer.Navigator>
      </NavigationContainer>
    )
  } else if (isRegistering) {
    return <BadgerRegisterScreen handleSignup={handleSignup} setIsRegistering={setIsRegistering} />
  } else {
    return <BadgerLoginScreen handleLogin={handleLogin} setIsRegistering={setIsRegistering} handleGuest={handleGuest} />
  }
}