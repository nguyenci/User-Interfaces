import { Text, View, ScrollView, StyleSheet } from "react-native"
import { useEffect, useState, useContext } from "react"
import { useNavigation } from "@react-navigation/native"

import BadgerCard from "./BadgerCard"
import BadgerPreferencesContext from "./BadgerPreferencesContext"

function BadgerNewsScreen(props) {

    const [cards, setCards] = useState([])
    const [shownCards, setShownCards] = useState([])
    const navigation = useNavigation()
    const [prefs, setPrefs] = useContext(BadgerPreferencesContext)

    useEffect(() => {
        fetch("https://cs571.org/api/f23/hw8/articles", {
            headers: {
                "X-CS571-ID": "bid_07a545e236232f2479bf4a9c7381458910719af02a0a82c649f5f8d580288ade"
            }
        })
            .then(res => res.json())
            .then(data => {
                setCards(data)
            })
    }, [])

    useEffect(() => {
        filterShownCards()
    }, [cards, prefs])

    // Filter cards every time preferences are updated or upon component load
    const filterShownCards = () => {
        if (prefs.length > 0) {
            setShownCards(cards.filter(card => card.tags.every(tag => prefs.includes(tag))))
        }
    }

    // Open article in new screen
    const openArticle = (id, title, img) => {
        navigation.navigate("Article", { id: id, title: title, image: img })
    }

    return <>
        <View>
            <Text style={styles.articleHdr}>Articles</Text>
            <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
                {prefs.length === 0 ? <><Text style={styles.noMatches}>There are no articles matching your preferences!</Text></>
                    : shownCards.map(card =>
                        <BadgerCard key={card.id} title={card.title} img={card.img}
                            handleArticleOpen={() => openArticle(card.fullArticleId, card.title, card.img)} />)
                }
            </ScrollView>
        </View>
    </>
}

const styles = StyleSheet.create({
    articleHdr: {
        fontSize: 30,
        textAlign: "center",
        marginTop: 15,
        fontWeight: 700
    },
    noMatches: {
        fontSize: 20,
        textAlign: "center",
        marginTop: 15,
        fontWeight: 700,
        marginHorizontal: 15,
    }
})

export default BadgerNewsScreen