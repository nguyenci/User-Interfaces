import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card, Button, Carousel } from 'react-bootstrap'

const BadgerBudSummary = (props) => {
    const [showDetails, setShowDetails] = useState(false)

    const toggleDetails = () => {
        setShowDetails(!showDetails)
    }

    const printAge = (age) => {
        if (age < 12) {
            return `${age} month(s) old`
        } else if (age < 24) {
            return `${Math.floor(age / 12)} year(s) and {age % 12} month(s) old`
        } else {
            return `${Math.floor(age / 12)} year(s) old`
        }
    }

    const saveCat = () => {
        alert(props.name + " has been added to your basket!")
        props.onSave(props.id)
    }

    return (
        <Card style={{ marginRight: "20px", marginBottom: "40px" }}>
            <Carousel>
                {props.imgIds.map((imgId, index) => (
                    <Carousel.Item key={index}>
                        <img style={{ aspectRatio: "1 / 1" }}
                            className="d-block w-100 h-50 object-fit-cover"
                            src={`https://raw.githubusercontent.com/CS571-F23/hw5-api-static-content/main/cats/${imgId}`}
                            alt={`A picture of ${props.name}}`}
                        />
                    </Carousel.Item>
                ))}
            </Carousel>
            <Card.Body><Card.Title><h4>{props.name}</h4></Card.Title></Card.Body>
            <Card.Footer>
                {showDetails ? (
                    <div>
                        <p>Gender: {props.gender}</p>
                        <p>Breed: {props.breed}</p>
                        <p>Age: {printAge(props.age)}</p>
                        {props.description ? <p>Description: {props.description}</p> : ""}
                        <Button className="inline" onClick={toggleDetails}> Show Less </Button>
                    </div>
                ) : (
                    <Button className="inline" onClick={toggleDetails}> Show More </Button>
                )}
                <Button variant="secondary" onClick={saveCat}> Save </Button>
            </Card.Footer>
        </Card>
    )
}

export default BadgerBudSummary