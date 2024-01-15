///// Variables

const mySubmitButton = document.querySelector('.submit-button');
const mySignIn = document.querySelector('.sign-in');
const mySignUp = document.querySelector('.sign-up');
const myFormSwitch = document.querySelector('.form-switch');
const myIcon = document.querySelector('.icon');
const myWrongPassAlert = document.querySelector('#wrong_pass_alert');
myWrongPassAlert.style.color = 'red';

let currForm = 'login';
const authPort = 5000;

const loginForm = `<form class="form-switch">
<div class="email">
	<input
		type="text"
		id="email"
		name="email"
		placeholder="Mail"
		required
	/>
</div>
<div class="pass">
	<input
		type="text"
		id="password"
		name="password"
		placeholder="Parolă"
		required
	/>
</div>
<span id="wrong_pass_alert"></span>
<div>
	<button class=" cursor submit submit-button" type="submit">
		Log in
	</button>
</div>
</form>`;
const registerForm = `<form class="form-switch">
<div class="full-name">
	<input
		type="text"
		id="full-name"
		name="name"
		placeholder="Nume Complet"
		required
	/>
</div>
<div class="address">
	<input
		type="text"
		id="address"
		name="name"
		placeholder="Adresă"
		required
	/>
</div>
<div class="email">
	<input
		type="text"
		id="email"
		name="email"
		placeholder="Mail"
		required
	/>
</div>
<div class="pass">
	<input
		type="text"
		id="password"
		name="password"
		placeholder="Parolă"
		required
	/>
	<input
		type="text"
		id="confirm-password"
		name="confirm-password"
		placeholder="Confirmă Parola"
		required
	/>
</div>
<span id="wrong_pass_alert"></span>
<div>
	<button class="cursor submit submit-button" type="submit">
		Înregistrează
	</button>
</div>
</form>`;
const iconForm = `<div class=" icon">
<img
	src="/src/imgs/vroomvrom.jpeg"
	id="icon"
	alt="User Icon"
/>
</div>`;

///// Functions
const switchActive = (activ, inactiv) => {
	if (!activ.classList.contains('active')) {
		activ.classList.remove('inactive');
		activ.classList.remove('underlineHover');
		activ.classList.add('active');
		inactiv.classList.remove('active');
		inactiv.classList.add('inactive');
		inactiv.classList.add('underlineHover');
	}
};
const validateEmail = (email) => {
	return email.match(
		/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	);
};
const validatePassword = (password) => {
	errors = [];
	if (password.length < 8) {
		errors.push('Your password must be at least 8 characters');
	}
	if (password.search(/[a-z]/i) < 0) {
		errors.push('Your password must contain at least one letter.');
	}
	if (password.search(/[0-9]/) < 0) {
		errors.push('Your password must contain at least one digit');
	}
	if (errors.length > 0) {
		return errors;
	}
	return true;
};

const validateLogin = async (name, pass) => {
	const payload = {
		full_name: name,
		password: pass,
	};
	const url = `http://localhost:5000/login`;
	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(payload),
		});
		console.log(response.status);
		if (response.status === 200) {
			return true;
		}
		const output = await response.json();
		return false;
	} catch (err) {
		console.log(err);
	}
};

// validateLogin('Jhon Doe', 'mypassword');

///// Events
const mainEvents = () => {
	mySignIn.addEventListener('click', () => {
		switchActive(mySignIn, mySignUp);
		myFormSwitch.innerHTML = loginForm;
		myIcon.innerHTML = iconForm;
		currForm = 'login';
	});
	mySignUp.addEventListener('click', () => {
		switchActive(mySignUp, mySignIn);
		myFormSwitch.innerHTML = registerForm;
		myIcon.innerHTML = '';
		currForm = 'register';
	});
	myFormSwitch.addEventListener('submit', async (e) => {
		e.preventDefault();

		switch (currForm) {
			case 'login':
				const emailLog = myFormSwitch.querySelector('#numecomplet');
				const passwordLog = myFormSwitch.querySelector('#password');
				const myWrongPassAlertLog =
					document.querySelector('#wrong_pass_alert');
				const loginRes = validateLogin('Jhon Doe', 'mypassword');

				// if (
				// 	!databaseMail(emailLog.value) ||
				// 	!databasePass(passwordLog.value)
				// ) {
				// 	myWrongPassAlertLog.innerHTML = 'Email/password prost 💀';
				// 	myWrongPassAlertLog.style.color = 'red';
				// } else {
				// 	window.location.href = '/dist/html/carouselpage.html';
				// }
				break;
			case 'register':
				const fullnameReg = myFormSwitch.querySelector('#full-name');
				const emailReg = myFormSwitch.querySelector('#email');
				const passwordReg = myFormSwitch.querySelector('#password');
				const confpasswordReg =
					myFormSwitch.querySelector('#confirm-password');
				const myWrongPassAlertReg =
					document.querySelector('#wrong_pass_alert');
				myWrongPassAlertReg.style.color = 'red';

				const myValidMail = validateEmail(emailReg.value);
				const myValidPass = validatePassword(passwordReg.value);
				if (!myValidMail) {
					myWrongPassAlertReg.innerHTML =
						'Please insert a valid email';
					break;
				}
				if (myValidPass.length > 0) {
					let passErors = '';
					for (let i = 0; i < myValidPass.length; i++) {
						passErors += myValidPass[i] + '\n';
					}
					passErors = passErors.split('\n').join('<br>');
					myWrongPassAlertReg.innerHTML = passErors;
					break;
				}
				if (!(confpasswordReg.value === passwordReg.value)) {
					myWrongPassAlertReg.innerHTML = "Passwords don't match";
					break;
				}
				myWrongPassAlertReg.innerHTML = '';
				break;
		}
	});
};
mainEvents();
