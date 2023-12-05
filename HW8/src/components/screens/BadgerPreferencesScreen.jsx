import { View } from "react-native"
import { useState, useEffect, useContext } from "react"

import BadgerPreferencesContext from "./BadgerPreferencesContext"
import BadgerSwitch from "./BadgerSwitch"

function BadgerPreferencesScreen(props) {

    const [prefs, setPrefs] = useContext(BadgerPreferencesContext)
    const [shownPrefs, setShownPrefs] = useState([])
    const [articles, setArticles] = useState([])

    useEffect(() => {
        fetch("https://cs571.org/api/f23/hw8/articles", {
            headers: {
                "X-CS571-ID": "bid_07a545e236232f2479bf4a9c7381458910719af02a0a82c649f5f8d580288ade"
            }
        })
            .then(res => res.json())
            .then(data => {
                setArticles(data)
            })
    }, [])

    useEffect(() => {
        const tags = new Set() // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
        articles.forEach(article => {
            article.tags.forEach(tag => {
                tags.add(tag)
            })

            setPrefs(Array.from(tags))
            setShownPrefs(Array.from(tags))

        })
    }, [articles])

    return <>
        <View>
            {
                shownPrefs.map((pref, i) => {
                    return <BadgerSwitch key={i} pref={pref} />
                })
            }
        </View>
    </>
}

export default BadgerPreferencesScreen