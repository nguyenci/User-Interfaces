
/**
 * Given an array of students, generates HTML for all students
 * using {@link buildStudentHtml}.
 * 
 * @param {*} studs array of students
 * @returns html containing all students
 */
function buildStudentsHtml(studs) {
	return studs.map(stud => buildStudentHtml(stud)).join("\n");
}

/**
 * Given a student object, generates HTML. Use innerHtml to insert this
 * into the DOM, we will talk about security considerations soon!
 * 
 * @param {*} stud 
 * @returns 
 */
function buildStudentHtml(stud) {
	let html = `<div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">`; // Step 7

	html += `<h2>${stud.name.first} ${stud.name.last}</h2>`;

	// Step 4
	html += `<h6><strong>${stud.major}</strong></h6><br>`
	html += `<p>${stud.name.first} is taking ${stud.numCredits} credits and is from 
		${stud.fromWisconsin ? 'Wisconsin' : 'not from Wisconsin'}.</p>`

	let interestList = "" // Create unordered list of interests
	for (const interest of stud.interests) {
		interestList += `<li> ${interest} </li>`
	}
	html += `They have ${stud.interests.length} interests including... <ul>${interestList}</ul>`
	
	html += `</div>`
	return html;
}

function handleSearch(e) {
	e.preventDefault();

	// Step 5

	// Get search values
	const nameQuery = document.getElementById('search-name').value.trim().toLowerCase();
	const majorQuery = document.getElementById('search-major').value.trim().toLowerCase();
	const interestsQuery = document.getElementById('search-interest').value.trim().toLowerCase();

	// Filter array of students based on queries
	const filteredStudents = 
		studentData.filter(student => (student.name.first + ' ' + student.name.last).toLowerCase().includes(nameQuery))
		.filter(student => student.major.toLowerCase().includes(majorQuery))
		.filter(student => student.interests.some(interest => interest.toLowerCase().includes(interestsQuery)))
	
	// console.log(filteredStudents)
	document.getElementById("students").innerHTML = buildStudentsHtml(filteredStudents)
	document.getElementById("num-results").innerText = filteredStudents.length // Step 6

}

let studentData = []

fetch("https://cs571.org/api/f23/hw2/students", {
	headers: {
		"X-CS571-ID": CS571.getBadgerId()
	}
})
	.then(res => {
		if (res.status === 200 || res.status === 304) {
			return res.json()
		} else {
			throw new Error();
		}
	})
	.then(data => {
		// console.log(data) // Step 1
		studentData = data // Assign data to a global variable

		// Step 2
		document.getElementById("num-results").innerText = data.length

		// Step 3
		document.getElementById("students").innerHTML = buildStudentsHtml(data)
		document.getElementById("students").className = "row" // Step 7

	})

document.getElementById("search-btn").addEventListener("click", handleSearch);

