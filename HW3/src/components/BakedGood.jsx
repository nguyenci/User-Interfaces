import { useState } from "react"

import { Card } from "react-bootstrap" // API referenced: https://react-bootstrap.netlify.app/docs/components
import Button from "react-bootstrap/Button" // API referenced: https://react-bootstrap.netlify.app/docs/components

export default function BakedGood(props) {

    const [quantity, setQuantity] = useState(0);

    function decreaseQuantity() {
        if (quantity > 0) {
            setQuantity(quantity - 1);
        }
    }

    function increaseQuantity() {
        setQuantity(quantity + 1);
    }

    return <Card style={{ margin: "0.25rem" }}>
        { // Header for featured item's card
        props.featured ?
            <Card.Header style={{backgroundColor:"#d0f4fc", color: "#055160", border: "1px solid #9cecfc", borderRadius: "5px" }}>
                <b>FEATURED ITEM</b></Card.Header> : "" 
        }
        <Card.Body>
            <Card.Title style={{fontFamily: "trebuchet ms"}}><b>{props.name}</b></Card.Title>
            <p style={{fontFamily: "trebuchet ms"}}>{props.description}</p>
            <p style={{fontFamily: "trebuchet ms"}}>${props.price}</p>
            <div>
                <Button className="inline" onClick={decreaseQuantity} disabled={quantity <= 0} variant="dark">-</Button>
                <p className="inline">{quantity}</p>
                <Button className="inline" onClick={increaseQuantity} variant="success">+</Button>
            </div>
        </Card.Body>
    </Card>

}