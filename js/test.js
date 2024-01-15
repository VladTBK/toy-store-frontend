const maybeAuthPort = 5000;

const validateLogin = async (name, pass) => {
	const payload = {
		full_name: 'Jhon Doe',
		password: 'mypassword',
	};
	const url = `http://auth/login`;
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
validateLogin();
