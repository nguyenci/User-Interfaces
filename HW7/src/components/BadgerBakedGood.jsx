import { Text, View, Image, Button } from "react-native"

export default function BadgerBakedGood(props) {

    const addToBasket = () => {
        props.add(props.id)
    }

    const removeFromBasket = () => {
        props.remove(props.id)
    }

    return <View style={{ alignItems: "center" }}>
        <Image source={{ uri: props.imgSrc }} style={{ width: 200, height: 200 }} />
        <Text style={{ fontSize: 30, fontWeight: "bold" }}>{props.name}</Text>
        <Text style={{ fontSize: 20, fontWeight: "300"}}>${props.price.toFixed(2)}</Text>
        <Text>{"\n"}</Text>
        <Text style={{ fontSize: 20, fontWeight: "300"}}>{props.upperLimit === -1 ? "You can order unlimited units!" : `You can order up to ${props.upperLimit} units!`}</Text>
        <View style={{ flexDirection: "row" }}>
            <Button title="-" color="red" onPress={removeFromBasket} disabled={props.numGoods === 0} />
            <Text style={{ fontSize: 40 }}>{props.numGoods || 0}</Text>
            <Button title="+" onPress={addToBasket} disabled={props.upperLimit === props.numGoods} />
        </View>
    </View>
}
