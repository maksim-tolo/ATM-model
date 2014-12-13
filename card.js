var submit = document.querySelector('.submit');
var names = document.querySelector('.name');
var passwords = document.querySelector('.password');
var balance = document.querySelector('.balance');

function create() {
	if (names.value=="") alert('Введите имя владельца карточки!');
		else if (isNaN(+passwords.value)) alert('Пароль должен быть числом!');
			else if (passwords.value.length!=4) alert('Пароль должен состоять из 4 цифр!');
				else if (isNaN(+balance.value)||balance.value=="") alert('Ваш баланс должен быть числом!');
					else {
						localStorage.setItem("youName", names.value);
						localStorage.setItem("password", passwords.value);
						localStorage.setItem("balance", balance.value);
						document.location.href = "atm.html";
					}
};

submit.addEventListener('click', create);

balance.addEventListener('keypress', function (e) {
	if (e.keyCode === 13&&names.value!=""&&passwords.value!=""&&balance.value!="") create();
});