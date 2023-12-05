import React, { useContext, useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import BadgerBudsDataContext from '../../../contexts/BadgerBudsDataContext'
import BadgerBudSummary from '../../../components/BadgerBudSummary'

export default function BadgerBudsAdoptable(props) {

    const availableCats = useContext(BadgerBudsDataContext)
    const [shownCats, setShownCats] = useState([])

    useEffect(() => {

        if (sessionStorage.getItem('savedCatIds') === null) {
            sessionStorage.setItem('savedCatIds', JSON.stringify([]))
        }
        if (sessionStorage.getItem('adoptedCatIds') === null) {
            sessionStorage.setItem('adoptedCatIds', JSON.stringify([]))
        }
        const savedCatIds = JSON.parse(sessionStorage.getItem('savedCatIds'))
        const adoptedCatIds = JSON.parse(sessionStorage.getItem('adoptedCatIds'))
        setShownCats(availableCats.filter((cat) => !savedCatIds.includes(cat.id)).filter(cat => !adoptedCatIds.includes(cat.id)))

    }, [availableCats])

    const removeCat = (id) => {

        const savedCatIds = JSON.parse(sessionStorage.getItem('savedCatIds'))
        savedCatIds.push(id)
        sessionStorage.setItem('savedCatIds', JSON.stringify(savedCatIds))
        setShownCats(availableCats.filter((cat) => !savedCatIds.includes(cat.id)))

    }

    return <div>
        <h1>Available Badger Buds</h1>
        <p>The following cats are looking for a loving home! Could you help?</p>
        {
            shownCats.length === 0 ? <p>No buds are available for adoption!</p> : ""
        }
        <h1>Available Cats</h1>
        <Container fluid>
            <Row>
                {shownCats.map((cat) => (
                        <Col xs={12} sm={6} md={4} lg={3} xl={2} key={cat.id} >
                            <BadgerBudSummary {...cat} onSave={removeCat} />
                        </Col>))}
            </Row>
        </Container>
    </div>
}