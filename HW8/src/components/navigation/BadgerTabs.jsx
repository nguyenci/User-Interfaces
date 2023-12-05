import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import BadgerNewsScreen from '../screens/BadgerNewsScreen'
import BadgerPreferencesScreen from '../screens/BadgerPreferencesScreen.jsx'
import BadgerArticle from '../screens/BadgerArticle.jsx'

function BadgerTabs(props) {
    const Tab = createBottomTabNavigator()
    const Stack = createNativeStackNavigator()

    const NewsStack = () => {
        return <>
            <Stack.Navigator>
                <Stack.Screen name="News" component={BadgerNewsScreen} />
                <Stack.Screen name="Article" component={BadgerArticle} />
            </Stack.Navigator>
        </>
    }

    return <>
        <Tab.Navigator>
            <Tab.Screen name="Badger News" component={NewsStack} />
            <Tab.Screen name="Preferences" component={BadgerPreferencesScreen} />
        </Tab.Navigator>
    </>
}

export default BadgerTabs