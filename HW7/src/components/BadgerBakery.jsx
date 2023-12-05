import { Text, View, Button, Alert } from "react-native"
import BadgerBakedGood from "./BadgerBakedGood"
import { useState, useEffect } from "react"

export default function BadgerBakery() {

    const [bakedGoods, setBakedGoods] = useState({})
    const [shownIndex, setShownIndex] = useState(0)
    const [basket, setBasket] = useState({})
    const [dollarTotal, setDollarTotal] = useState(0)
    const [numTotal, setNumTotal] = useState(0)

    useEffect(() => {
        fetch("https://cs571.org/api/f23/hw7/goods", {
            headers: {
                "X-CS571-ID": "bid_07a545e236232f2479bf4a9c7381458910719af02a0a82c649f5f8d580288ade",
            }
        }).then(res => res.json())
            .then(data => setBakedGoods(data))
    }, [])

    const handleNext = () => { // show the next baked good
        setShownIndex(oldIndex => oldIndex + 1)
    }

    const handlePrev = () => { // show the prev baked good
        setShownIndex(oldIndex => oldIndex - 1)
    }

    const addToBasket = (id) => { // add baked good to basket

        const currGood = bakedGoods[id] // get the baked good to be added

        setBasket((prevBasket) => { // update the basket
            const newBasket = { ...prevBasket }
            if (newBasket[id] || newBasket[id] === 0) {
                newBasket[id] = 1
            } else {
                newBasket[id]++
            }
            return newBasket
        })

        setNumTotal(oldTotal => oldTotal + 1) // update the total number of baked goods in basket
        setDollarTotal(oldTotal => oldTotal + currGood.price) // update order total

    }

    const removeFromBasket = (id) => { // remove baked good from basket

        const currGood = bakedGoods[id]

        setBasket((prevBasket) => {
            const newBasket = { ...prevBasket }
            if (newBasket[id] !== undefined && newBasket[id] > 0) {
                newBasket[id]--
            }
            return newBasket
        })

        setNumTotal(oldTotal => oldTotal - 1)
        setDollarTotal(oldTotal => oldTotal - currGood.price)

    }

    const placeOrder = () => {
        Alert.alert(`Order Confirmed! ${"\n"} Your order contains ${numTotal} items and costs $${dollarTotal}!`)

        // reset the basket, order total, and go back to the first baked good
        setDollarTotal(0)
        setShownIndex(0)
        setNumTotal(0)
        setBasket({})

    }

    return <View style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 30, fontWeight: 700 }}>Welcome to Badger Bakery!</Text>
        <Text>{"\n"}</Text>
        <View>
            <View style={{ flexDirection: "row" }}>
                <Button title="PREV" color="black" onPress={handlePrev} disabled={shownIndex === 0} />
                <Button title="NEXT" onPress={handleNext} disabled={shownIndex === Object.keys(bakedGoods).length - 1} />
            </View>
        </View>
        {Object.keys(bakedGoods).map((id, index) => {
            if (index === shownIndex) {
                const bakedGood1 = bakedGoods[id]
                return <BadgerBakedGood key={id}
                    id={id} bakedGood={bakedGood1} name={bakedGood1.name} price={bakedGood1.price} imgSrc={bakedGood1.imgSrc}
                    upperLimit={bakedGood1.upperLimit} numGoods={basket[id] || 0} add={addToBasket} remove={removeFromBasket}
                />
            }
        })}
        <Text>{"\n"}</Text>
        <Text style={{ fontSize: 30, fontWeight: 500 }}>Order Total: ${dollarTotal.toFixed(2)}</Text> {/* show $ total to the hundredth's place */}
        <Text>{"\n"}</Text>
        <Button title="PLACE ORDER" onPress={placeOrder} disabled={dollarTotal === 0} />
    </View>
}
