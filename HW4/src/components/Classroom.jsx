import { useEffect, useState } from "react";
import Student from "./Student";

import { Button, Container, Form, Row, Col, Pagination } from "react-bootstrap";

const Classroom = () => {

    const [students, setStudents] = useState([])
    const [shownStudents, setShownStudents] = useState([])

    /**
     * Fetches the students from the API and sets the students and shown students.
     */
    useEffect(() => {
        fetch("https://cs571.org/api/f23/hw4/students", {
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                setStudents(data)
                setShownStudents(data)
            })
    }, [])

    const [nameQuery, setNameQuery] = useState('')
    const [majorQuery, setMajorQuery] = useState('')
    const [interestsQuery, setInterestsQuery] = useState('')

    /**
     * Updates the shown students based on the search queries.
     */
    useEffect(() => {
        const trimmedNameQuery = nameQuery.trim().toLowerCase()
        const trimmedMajorQuery = majorQuery.trim().toLowerCase()
        const trimmedInterestsQuery = interestsQuery.trim().toLowerCase()

        const filtered = students
            .filter((stud) => (stud.name.first + ' ' + stud.name.last).toLowerCase().includes(trimmedNameQuery))
            .filter((stud) => stud.major.toLowerCase().includes(trimmedMajorQuery))
            .filter((stud) => stud.interests.some(interest => interest.toLowerCase().includes(trimmedInterestsQuery)))

        setShownStudents(filtered);
        setActivePage(1)

    }, [nameQuery, majorQuery, interestsQuery])


    /**
     * Resets the search queries and updates the shown students and active page.
     * @function
     * @name resetSearch
     * @returns {void}
     */
    const resetSearch = () => {
        setNameQuery('')
        setMajorQuery('')
        setInterestsQuery('')

        setShownStudents(students)
        setActivePage(1)
    }

    const [activePage, setActivePage] = useState(1);

    /**
     * Builds the paginator for the shown students.
     * @returns The paginator.
     */
    const buildPaginator = () => {
        let pages = []
        const num_pages = Math.ceil(shownStudents.length / 24)

        pages.push(
            <Pagination.Prev key={0} disabled={activePage === 1 || shownStudents.length === 0} 
                onClick={() => setActivePage(page => page - 1)}>
                Prev
            </Pagination.Prev>
        )

        for (let i = 1; i <= num_pages; i++) {
            pages.push(
                <Pagination.Item key={i} active={activePage === i} onClick={() => setActivePage(i)}>
                    {i}
                </Pagination.Item>
            )
        }

        pages.push(
            <Pagination.Next key={num_pages + 1} disabled={activePage === num_pages || shownStudents.length === 0} onClick={() => setActivePage(page => page + 1)}>
                Next
            </Pagination.Next>
        )

        return pages;
    }

    return <div>
        <h1>Badger Book - Fall 2023</h1>
        <p>Search for students below!</p>
        <hr />
        <Form>
            <Form.Label htmlFor="searchName">Name</Form.Label>
            <Form.Control id="searchName" value={nameQuery} onChange={(input) => setNameQuery(input.target.value)} />
            <Form.Label htmlFor="searchMajor">Major</Form.Label>
            <Form.Control id="searchMajor" value={majorQuery} onChange={(input) => setMajorQuery(input.target.value)} />
            <Form.Label htmlFor="searchInterest">Interest</Form.Label>
            <Form.Control id="searchInterest" value={interestsQuery} onChange={(input) => setInterestsQuery(input.target.value)} />
            <br />
            <Button variant="neutral" onClick={resetSearch}>Reset Search</Button>
            <p>There are {shownStudents.length} student(s) matching your search</p>
        </Form>

        <Container fluid>
            <Row>
                { // Slice the shown students based on the active page and map them to Student components.
                    shownStudents.slice(24 * (activePage - 1), 24 * activePage)
                        .map(stud =>
                            <Col key={stud.id} xs={12} sm={6} md={4} lg={3} xl={2}>
                                < Student {...stud} />
                            </Col>)
                }
            </Row>
        </Container>

        <br />

        <Pagination> {buildPaginator()} </Pagination>

    </div>

}

export default Classroom;