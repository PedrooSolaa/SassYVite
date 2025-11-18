import "./styles/main.scss";


document.addEventListener("DOMContentLoaded", () => {
	const form = document.querySelector("form");
	if (!form) return;

	const fields = {
		nombre: form.querySelector('input[name="nombre"]'),
		apellidos: form.querySelector('input[name="apellidos"]'),
		telefono: form.querySelector('input[name="telefono"]'),
		email: form.querySelector('input[name="email"]')
	};

	const validateEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
	const validatePhone = (v) => /^[0-9+\s\-()]{6,20}$/.test(v);

	function showError(input, message) {
		if (!input) return;
		let err = input.parentElement.querySelector('.error');
		if (!err) {
			err = document.createElement('div');
			err.className = 'error';
			input.parentElement.appendChild(err);
		}
		err.textContent = message;
		input.classList.add('invalid');
	}

	function clearError(input) {
		if (!input) return;
		const err = input.parentElement.querySelector('.error');
		if (err) err.textContent = '';
		input.classList.remove('invalid');
	}

	form.addEventListener('submit', (e) => {
		e.preventDefault();
		let valid = true;

		Object.values(fields).forEach(f => f && clearError(f));

		if (!fields.nombre || !fields.nombre.value.trim()) {
			showError(fields.nombre, 'El nombre es obligatorio');
			valid = false;
		}

		if (!fields.apellidos || !fields.apellidos.value.trim()) {
			showError(fields.apellidos, 'Los apellidos son obligatorios');
			valid = false;
		}

		const phoneVal = fields.telefono ? fields.telefono.value.trim() : '';
		if (!phoneVal || !validatePhone(phoneVal)) {
			showError(fields.telefono, 'Teléfono inválido (solo números y símbolos + - () )');
			valid = false;
		}

		const emailVal = fields.email ? fields.email.value.trim() : '';
		if (!emailVal || !validateEmail(emailVal)) {
			showError(fields.email, 'Email inválido');
			valid = false;
		}

		if (valid) {
			
			form.submit();
		} else {
			const firstInvalid = form.querySelector('.invalid');
			if (firstInvalid) firstInvalid.focus();
		}
	});

	
	Object.values(fields).forEach(f => {
		if (!f) return;
		f.addEventListener('input', () => clearError(f));
	});
});
