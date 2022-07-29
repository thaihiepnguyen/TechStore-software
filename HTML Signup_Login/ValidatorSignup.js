var form = document.getElementById('form');
var username = document.getElementById('username');
var email = document.getElementById('email');
var password = document.getElementById('password');
var password2 = document.getElementById('password2');
console.log(password)
if(form){
    form.addEventListener("submit", function(e) {

        e.preventDefault();
        
        checkInputs();
    });
}
function checkInputs() {
	// trim to remove the whitespaces
	const usernameValue = username.value.trim();
    
    const emailValue = email.value.trim();
    
	
	const passwordValue = password.value.trim();
    
    const password2Value = password2.value.trim();
    
	if(usernameValue === '') {
		setErrorFor(username, 'Username cannot be blank');
	} else {
		setSuccessFor(username);
	}
	
    if(emailValue === '') {
		setErrorFor(email, 'Email cannot be blank');
	} else if (!isEmail(emailValue)) {
		setErrorFor(email, 'Not a valid email');
	} else {
		setSuccessFor(email);
	}
    
	
	
	if(passwordValue === '') {
		setErrorFor(password, 'Password cannot be blank');
	} else {
		setSuccessFor(password);
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













