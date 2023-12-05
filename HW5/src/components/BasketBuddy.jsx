import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card, Button } from 'react-bootstrap'

const BasketBuddy = (props) => {
    const imageUrl = `https://raw.githubusercontent.com/CS571-F23/hw5-api-static-content/main/cats/${props.imgIds[0]}`

    const unselectCat = () => {
        alert(props.name + " has been removed from your basket!")
        props.onUnselect(props.id)
    }

    const adoptCat = () => {
        alert(`Thank you for adopting ${props.name}!`)
        props.onAdopt(props.id)
    }
    
    return (<Card> 
        <Card.Img variant="top" src={imageUrl} alt={`A picture of ${props.name}`} style={{ aspectRatio: "1 / 1" }} />
            <Card.Body><Card.Title><h4>{props.name}</h4></Card.Title></Card.Body>
            <Card.Footer>
                <Button onClick={unselectCat} variant="secondary"> Unselect </Button>
                <Button onClick={adoptCat} variant="success"> Adopt </Button>
            </Card.Footer>
    </Card>)
}

export default BasketBuddy