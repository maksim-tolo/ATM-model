function Card() {
	this.youName = localStorage.getItem("youName");
	this.password = localStorage.getItem("password");
	this.balance = localStorage.getItem("balance");
	this.img = document.querySelector('.userCard');
	this.blocked = false;
	this.attempts = 3;
};

function Numpad() {
	this.numpadEnabled = false;
	this.numpadEnabledForCash = false;
	this.numpadKeys = document.querySelector('.numpad');
};

function Pages() {
	this.errPage = document.querySelector('.errPage');
	this.page1 = document.querySelector('.page1');
	this.page2 = document.querySelector('.page2');
	this.page3 = document.querySelector('.page3');
	this.page4 = document.querySelector('.page4');
	this.page5 = document.querySelector('.page5');
	this.page6 = document.querySelector('.page6');
	this.page7 = document.querySelector('.page7');
	this.page8 = document.querySelector('.page8');
	this.lastPage = document.querySelector('.lastPage');
};

var card = new Card;
var numpad = new Numpad;
var pages = new Pages;

var targetDrop = document.querySelector('.targetDrop');
var removeCard = document.querySelector('.removeCard');
var tmp = "";
var tmpCash = "";
var tmpCard = document.querySelector('.userCard2');
var back = document.querySelector('.back');
var money = document.querySelector('.money');
var check = document.querySelector('.checkItem');
var bpCheck = false;

function printLastPage() {
	document.querySelector('.third').style.animation = 'blink 2s linear infinite';
	document.querySelector('.third').style.webkitAnimation = 'blink 2s linear infinite';
	document.querySelector('.third').style.background = '#17e67e';
	tmpCard.style.display = 'block';
	pages.lastPage.style.display = 'block';
};

function outputCash() {
	if((+tmpCash)<(+card.balance)&&((+tmpCash)>=10000)) {
		card.balance-=tmpCash;
		localStorage.setItem("balance", card.balance);
		tmpCash="";
		numpad.numpadEnabledForCash=false;
		pages.page5.style.display = 'block';
		pages.page4.style.display = 'none';
		pages.page4.children[1].innerHTML = "";
	}
	else if ((+tmpCash)<10000) {
		tmpCash="";
		pages.page4.children[1].innerHTML = "";
		document.querySelector('.errSumm').innerHTML = 'Минимальная сумма для вывода 10 000';
	}
	else {
		tmpCash="";
		pages.page4.children[1].innerHTML = "";
		document.querySelector('.errSumm').innerHTML = 'Сумма для вывода превышает баланс карточки';
	}
};

function enter() {
	if (tmp===card.password) {
		card.attempts=3;
		numpad.numpadEnabled=false;
		pages.page3.style.display = 'block';
		pages.page2.style.display = 'none';
		pages.page2.children[1].innerHTML = "";
		tmp="";
	}
	else {
		card.attempts--;
		tmp="";
		pages.page2.children[1].innerHTML = "";
		if (card.attempts==2) document.querySelector('.errPass').innerHTML = 'Неверный пароль, осталось '+card.attempts+' попытки';
		if (card.attempts==1) document.querySelector('.errPass').innerHTML = 'Неверный пароль, осталось '+card.attempts+' попытка';
		if(card.attempts<=0) {
			card.blocked = true;
			pages.page2.children[1].innerHTML = "";
			pages.page2.style.display = 'none';
			pages.errPage.style.display = 'block';
			numpad.numpadEnabled = false;
		}
	}
};

targetDrop.addEventListener('drop', function() {
	targetDrop.style.background = '#6c6e63';
	targetDrop.style.opacity = '1';
	card.img.style.display = 'none';
	if (card.blocked) {
		pages.errPage.style.display = 'block';
	}
	else {
		pages.page2.style.display = 'block';
		numpad.numpadEnabled = true;
	}
	document.querySelector('.third').style.animation = 'none';
	document.querySelector('.third').style.webkitAnimation = 'none';
	document.querySelector('.third').style.background = '#a19c9c';
	pages.page1.style.display = 'none';
	
});

targetDrop.addEventListener('dragover', function (e) {
	e.preventDefault();
	targetDrop.style.background = '#127d49';
	targetDrop.style.opacity = '0.6';
});

targetDrop.addEventListener('dragleave', function() {
	targetDrop.style.background = '#6c6e63';
	targetDrop.style.opacity = '1';
});

numpad.numpadKeys.addEventListener('click', function (e) {
	if (!numpad.numpadEnabled) return;
	if(e.target.nodeName=="TD"&&e.target.innerHTML!="") {
		if(!isNaN(+e.target.innerHTML)) {
			if (pages.page2.children[1].innerHTML.length<4) {
				pages.page2.children[1].innerHTML += "*";
				tmp+=e.target.innerHTML;
			}
		}
		else {
			if (e.target.className=="key cancel") {
				pages.page2.children[1].innerHTML = "";
				tmp="";
				numpad.numpadEnabled=false;
				pages.page2.style.display = 'none';
				document.querySelector('.errPass').innerHTML = '';
				printLastPage();
			};
			if (e.target.className=="key clear") {
				pages.page2.children[1].innerHTML = "";
				tmp="";
			};
			if (e.target.className=="key enter") {
				enter();
			};
		}
	}
	if (e.target.className=="icon-close") {
		pages.page2.children[1].innerHTML = "";
		tmp="";
		numpad.numpadEnabled=false;
		pages.page2.style.display = 'none';
		document.querySelector('.errPass').innerHTML = '';
		printLastPage();
	};
	if (e.target.parentNode.className=="key clear") {
		pages.page2.children[1].innerHTML = "";
		tmp="";
	};
	if (e.target.className=="icon-radio-unchecked") {
		enter();
	};
});

removeCard.addEventListener('click', function() {
	printLastPage();
	pages.errPage.style.display = 'none';
});

tmpCard.addEventListener('click', function() {
	pages.page1.style.display = 'block';
	card.img.style.display = 'block';
	tmpCard.style.display = 'none';
	pages.lastPage.style.display = 'none';
});

pages.page3.addEventListener('click', function (e){
	if (e.target.innerHTML==="Извлечь карточку") {
		printLastPage();
		pages.page3.style.display = 'none';
		document.querySelector('.errPass').innerHTML = "";
	}
	if (e.target.innerHTML==="Выдача наличных") {
		pages.page4.style.display = 'block';
		pages.page3.style.display = 'none';
		numpad.numpadEnabledForCash = true;
	}
	if (e.target.innerHTML==="Остаток на счёте") {
		pages.page8.style.display = 'block';
		pages.page3.style.display = 'none';
	}
});

numpad.numpadKeys.addEventListener('click', function (e) {
	if (!numpad.numpadEnabledForCash) return;
	if(e.target.nodeName=="TD"&&e.target.innerHTML!="") {
		if(!isNaN(+e.target.innerHTML)) {
			if (pages.page4.children[1].innerHTML.length<15) {
				pages.page4.children[1].innerHTML += e.target.innerHTML;
				tmpCash+=e.target.innerHTML;
			}
		}
		else {
			if (e.target.className=="key cancel") {
				pages.page4.children[1].innerHTML = "";
				tmpCash="";
				numpad.numpadEnabledForCash=false;
				pages.page4.style.display = 'none';
				document.querySelector('.errSumm').innerHTML = '';
				pages.page4.style.display = 'none';
				pages.page3.style.display = 'block';
			};
			if (e.target.className=="key clear") {
				pages.page4.children[1].innerHTML = "";
				tmpCash="";
			};
			if (e.target.className=="key enter") {
				outputCash();
			};
		}
	}
	if (e.target.className=="icon-close") {
		pages.page4.children[1].innerHTML = "";
		tmpCash="";
		numpad.numpadEnabledForCash=false;
		pages.page4.style.display = 'none';
		document.querySelector('.errSumm').innerHTML = '';
		pages.page4.style.display = 'none';
		pages.page3.style.display = 'block';
	};
	if (e.target.parentNode.className=="key clear") {
		pages.page4.children[1].innerHTML = "";
		tmpCash="";
	};
	if (e.target.className=="icon-radio-unchecked") {
		outputCash();
	};
});

pages.page5.addEventListener('click', function (e) {
	if(e.target.innerHTML==='Нет') {
		pages.page5.style.display = 'none';
		pages.page6.style.display = 'block';
		pages.page6.innerHTML='Возьмите Ваши деньги';
		document.querySelector('.first').style.animation = 'blink 2s linear infinite';
		document.querySelector('.first').style.webkitAnimation = 'blink 2s linear infinite';
		document.querySelector('.first').style.background = '#17e67e';
		money.style.display = 'block';
		bpCheck = true;
	}
	if(e.target.innerHTML==='Да') {
		pages.page5.style.display = 'none';
		pages.page6.style.display = 'block';
		document.querySelector('.first').style.animation = 'blink 2s linear infinite';
		document.querySelector('.first').style.webkitAnimation = 'blink 2s linear infinite';
		document.querySelector('.first').style.background = '#17e67e';
		pages.page6.innerHTML = 'Возьмите Ваши деньги и чек';
		document.querySelector('.second').style.animation = 'blink 2s linear infinite';
		document.querySelector('.second').style.webkitAnimation = 'blink 2s linear infinite';
		document.querySelector('.second').style.background = '#17e67e';
		money.style.display = 'block';
		check.style.display = 'block';
	}
});

money.addEventListener('click', function() {
	money.style.display = 'none';
	document.querySelector('.first').style.animation = 'none';
	document.querySelector('.first').style.webkitAnimation = 'none';
	document.querySelector('.first').style.background = '#a19c9c';
	if(bpCheck) {
		bpCheck = false;
		pages.page7.style.display = 'block';
		pages.page6.style.display = 'none';
	}
	else bpCheck = true;
});

check.addEventListener('click', function() {
	check.style.display = 'none';
	document.querySelector('.second').style.animation = 'none';
	document.querySelector('.second').style.webkitAnimation = 'none';
	document.querySelector('.second').style.background = '#a19c9c';
	if(bpCheck) {
		bpCheck = false;
		pages.page7.style.display = 'block';
		pages.page6.style.display = 'none';
	}
	else bpCheck = true;
});

pages.page7.addEventListener('click', function (e) {
	if(e.target.innerHTML==='Нет') {
		pages.page7.style.display = 'none';
		pages.lastPage.style.display = 'block';
		document.querySelector('.third').style.animation = 'blink 2s linear infinite';
		document.querySelector('.third').style.webkitAnimation = 'blink 2s linear infinite';
		document.querySelector('.third').style.background = '#17e67e';
		tmpCard.style.display = 'block';
	}
	if(e.target.innerHTML==='Да') {
		pages.page7.style.display = 'none';
		pages.page2.style.display = 'block';
		numpad.numpadEnabled=true;
	}
});

pages.page8.addEventListener('click', function (e) {
	if(e.target.innerHTML==='На экран') {
		pages.page8.style.display = 'none';
		pages.page6.style.display = 'block';
		pages.page6.innerHTML = 'На Вашем счёте<p>'+card.balance+' руб.</p><div>На главную</div>';
	}
	if(e.target.innerHTML==='В чек') {
		pages.page8.style.display = 'none';
		pages.page6.style.display = 'block';
		pages.page6.innerHTML = 'Возьмите чек';
		document.querySelector('.second').style.animation = 'blink 2s linear infinite';
		document.querySelector('.second').style.webkitAnimation = 'blink 2s linear infinite';
		document.querySelector('.second').style.background = '#17e67e';
		bpCheck = true;
		check.style.display = 'block';
	}
});

pages.page6.addEventListener('click', function (e) {
	if(e.target.innerHTML==='На главную') {
		pages.page6.style.display = 'none';
		pages.page3.style.display = 'block';
	}
});