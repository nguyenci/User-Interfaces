import { useEffect, useState } from "react"
import BakedGood from "./BakedGood";
import { Col, Container, Row } from "react-bootstrap";

import Alert from 'react-bootstrap/Alert' // API referenced: https://react-bootstrap.netlify.app/docs/components

export default function BadgerBakery() {

    const [bakedGoods, setBakedGoods] = useState([]);
    const [featuredItem, setFeaturedItem] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://cs571.org/api/f23/hw3/all-baked-goods", {
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setBakedGoods(data);

                data.forEach(bakedGood => {  // Set featured item
                    if (bakedGood.featured) {
                        setFeaturedItem(bakedGood);
                        setLoading(false);
                    }
                })

            })
    }, [])

    return <div>
        <h1 style={{ fontFamily: "georgia" }}><b>Badger Bakery</b></h1>
        <p style={{ fontFamily: "trebuchet ms" }}><em>Welcome to our small-town bakery located in Madison, WI!</em></p>
        { // Display featured item
            loading ? <p>Loading...</p> :
            <Alert variant="info">Today's featured item is <b>{featuredItem.name}</b> for <b>${featuredItem.price}</b>!</Alert>
        }
        <Container>
            <Row>
                {
                    bakedGoods.map(bakedGood => {
                        return <Col key={bakedGood.name} xs={12} md={6} lg={4} xl={3}>
                            <BakedGood
                                name={bakedGood.name}
                                description={bakedGood.description}
                                price={bakedGood.price}
                                featured={bakedGood.featured}
                            />
                        </Col>
                    })
                }
            </Row>
        </Container>
    </div>
}