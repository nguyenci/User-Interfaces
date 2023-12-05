const Student = (props) => {
    return <div>
        
        <h2 style={{ margin: "0" }}>{props.name.first} {props.name.last}</h2>
        <p style={{ margin: "0" }}><b>{props.major}</b></p>
        <p style={{ margin: "0" }}>{props.numCredits} Credits</p>
        <p style={{ margin: "0" }}>{props.fromWisconsin ? "From Wisconson" : "Not from Wisconsin"}</p>
        <p style={{ margin: "0" }}>{props.interests.length} Interests</p>
        
        <ul>
            {props.interests.map((interest, i) => (
                <li key={i}>{interest}</li>
            ))}
        </ul>

    </div>
}

export default Student;