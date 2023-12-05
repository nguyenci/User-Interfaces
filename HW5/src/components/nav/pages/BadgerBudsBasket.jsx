import { useContext, useEffect, useState } from "react"
import BasketBuddy from "../../BasketBuddy"
import BadgerBudsDataContext from '../../../contexts/BadgerBudsDataContext'
import { Container, Row, Col } from "react-bootstrap"

export default function BadgerBudsBasket(props) {

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
        setShownCats(availableCats.filter((cat) => savedCatIds.includes(cat.id)))

    }, [availableCats])

    const unselectCat = (newID) => {

        const savedCatIds = JSON.parse(sessionStorage.getItem('savedCatIds'))
        const updatedSavedCatIds = savedCatIds.filter((cat) => cat !== newID)
        sessionStorage.setItem('savedCatIds', JSON.stringify(updatedSavedCatIds))

        setShownCats(shownCats.filter((cat) => updatedSavedCatIds.includes(cat.id)))

    }

    const adoptKitty = (newID) => {
        
        const adoptedCatIds = JSON.parse(sessionStorage.getItem('adoptedCatIds'))
        adoptedCatIds.push(newID)
        sessionStorage.setItem('adoptedCatIds', JSON.stringify(adoptedCatIds))

        const savedCatIds = JSON.parse(sessionStorage.getItem('savedCatIds'))
        const updatedSavedCatIds = savedCatIds.filter((cat) => cat !== newID)
        sessionStorage.setItem('savedCatIds', JSON.stringify(updatedSavedCatIds))

        setShownCats(shownCats.filter((cat) => updatedSavedCatIds.includes(cat.id)))

    }



    return <div>
        <h1>Badger Buds Basket</h1>
        <p>These cute cats could be all yours!</p>
        {
            shownCats.length === 0 ? <p>You have no buds in your basket!</p> : ""
        }
        <Container fluid>
            <Row>
                {
                    shownCats.map((cat) => (
                        <Col xs={12} sm={6} md={4} lg={3} xl={2} key={cat.id} >
                            <BasketBuddy {...cat} onUnselect={unselectCat} onAdopt={adoptKitty} />
                        </Col>))
                }
            </Row>
        </Container>
    </div>
}