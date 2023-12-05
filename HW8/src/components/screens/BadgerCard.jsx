import { Pressable, Text, View, StyleSheet, Image } from "react-native"

function BadgerCard(props) {

    return <>
        <Pressable onPress={props.handleArticleOpen} style={{ paddingTop: 15 }}>
            <View style={[styles.card]} >
                <Image style={{ width: 350, height: 200 }} source={{ uri: `https://raw.githubusercontent.com/CS571-F23/hw8-api-static-content/main/articles/${props.img}` }}></Image>
                <Text style={{ fontSize: 24, paddingTop: 10, fontWeight: 600 }}>{props.title}</Text>
            </View>
        </Pressable>
    </>
}

const styles = StyleSheet.create({
    card: {
        padding: 16,
        paddingBottom: 16,
        borderRadius: 25,
        backgroundColor: 'white',
        shadowOffset: {
            width: 4,
            height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1,
    }
})

export default BadgerCard