var form = document.getElementById('form');
var usernamer = document.getElementById('username')
var emailr = document.getElementById('email')
var passwordr = document.getElementById('password')
var password2 = document.getElementById('password2')
const user = require("./../routes/user.routes")
if(form){
	form.addEventListener("submit", registerUser) 
}

async function registerUser(event) {
	event.preventDefault();
	checkInputs();

	const username = usernamer.value;
	const email = emailr.value;
	const password = passwordr.value;

	const result = await fetch('/api/register', {
		method: 'POST',
		header: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			username,
			email,
			password
		})
	}).then((result) => result.json())

	console.log(result)
};


function checkInputs() {
	// trim to remove the whitespaces
	const usernameValue = usernamer.value.trim();
    const emailValue = emailr.value.trim();
	const passwordValue = passwordr.value.trim();
    const password2Value = password2.value.trim();
	
	if(usernameValue === '') {
		setErrorFor(usernamer, 'Username cannot be blank');
	} else {
		setSuccessFor(usernamer);
	}
	
    if(emailValue === '') {
		setErrorFor(emailr, 'Email cannot be blank');
	} else if (!isEmail(emailValue)) {
		setErrorFor(emailr, 'Not a valid email');
	} else {
		setSuccessFor(emailr);
	}
    
	
	
	if(passwordValue === '') {
		setErrorFor(passwordr, 'Password cannot be blank');
	} else {
		setSuccessFor(passwordr);
	}
	
	if(password2Value === '') {
		setErrorFor(password2, 'Confirm password cannot be blank');
	} else if(passwordValue !== password2Value) {
		setErrorFor(password2, 'Passwords does not match');
	} else{
		setSuccessFor(password2);
	}
}

function setErrorFor(input, message) {
	const formControl = input.parentElement;
	const small = formControl.querySelector('small');
	formControl.className = 'form-control error';
	small.innerText = message;
}

function setSuccessFor(input) {
	const formControl = input.parentElement;
	formControl.className = 'form-control success';
}
	
function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}













