import { useEffect, useState, useRef } from "react"
import { useRoute } from '@react-navigation/native'
import { Text, View, ScrollView, Image, StyleSheet, Animated, Linking, Pressable } from "react-native"

// https://stackoverflow.com/questions/70621070/how-do-i-pass-props-to-next-screen-using-navigate
function BadgerArticle(props) {

    const route = useRoute()
    const { id, title, image } = route.params
    const [article, setArticle] = useState(null)
    const [loading, setLoading] = useState(true)
    const fadeInAnim = useRef(new Animated.Value(0)).current

    useEffect(() => {
        fetch(`https://cs571.org/api/f23/hw8/article?id=${id}`, {
            headers: {
                "X-CS571-ID": "bid_07a545e236232f2479bf4a9c7381458910719af02a0a82c649f5f8d580288ade"
            }
        })
            .then(res => res.json())
            .then(data => setArticle(data))
            .then(() => {
                Animated.timing(fadeInAnim, {
                    toValue: 1,
                    duration: 5000,
                    useNativeDriver: true,
                }).start()
                setLoading(false)
            })

    }, [])

    return <>

        {loading ?
            <View style={styles.container}>
                <Image style={styles.image} source={{ uri: `https://raw.githubusercontent.com/CS571-F23/hw8-api-static-content/main/articles/${image}` }} ></Image>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.loadingContainer}>Loading...</Text>
            </View>
            :
            <ScrollView style={styles.container}>
                <Image style={styles.image} source={{ uri: `https://raw.githubusercontent.com/CS571-F23/hw8-api-static-content/main/articles/${image}` }} ></Image>
                <Text style={styles.title}>{title}</Text>
                <Pressable>
                    <Text style={styles.link} onPress={() => Linking.openURL(article.url)}>
                        Read full article here.
                    </Text>
                </Pressable>
                <Animated.Text style={[styles.author, { opacity: fadeInAnim }]}>{article.author} on {article.posted}</Animated.Text>
                {loading ? <Text>Loading...</Text> : <Animated.Text style={[styles.body, { opacity: fadeInAnim }]}>{article.body}</Animated.Text>}

            </ScrollView>
        }
    </>
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        paddingTop: 15,
    },
    link: {
        color: "blue",
        paddingTop: 15,
        paddingBottom: 15,
    },
    image: {
        width: 360,
        height: 200,

    },
    loadingContainer: {
        fontSize: 18,
        fontStyle: "italic",
        marginTop: 15,
    },
    author: {
        fontSize: 18,
        fontWeight: 300,
        fontStyle: "italic",
    },
    body: {
        marginTop: 15,
        fontSize: 18,
    },
})


export default BadgerArticle