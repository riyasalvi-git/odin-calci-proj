let display = document.querySelector(".screen");
let body = document.querySelector("body");
let numbers = document.querySelectorAll(".numbers");
let operatorBtn = document.querySelectorAll(".operators");
let acBtn = document.querySelector("#allClear");
let equals = document.querySelector("#equals");
let point = document.querySelector("#point");
let backspace = document.querySelector("#backspace");

let result = '';
let answer = '';
let num = '';
let numA = '';
let numB = '';
let operator = '';

acBtn.addEventListener("click", allClear);

function allClear() {
	result = '';
	answer = '';
	num = '';
	numA = '';
	numB = '';
	operator = '';
	display.textContent = '';
}

body.addEventListener("keydown", (e) => {
	numbers.forEach((btn) => {
		if (e.key === btn.textContent) {
			numpad(e);
		}
	});
	operatorBtn.forEach((btn) => {
		if (e.key === btn.textContent) {
			operatorfunct(e);
		}
	});
	if (e.key === "Backspace") {
		del();
	}
	else if (e.key === "Enter" || e.key === "=") {
		showResult();
	}
	else if (e.key === "Escape") {
		allClear();
	}
});

numbers.forEach((btn) => {
	btn.addEventListener("click", numpad);
});

function numpad(e) {
	let singleNum;
	if (e.type === "click") {
		singleNum = this.textContent;
	}
	else if (e.type === "keydown") {
		singleNum = e.key;
	}
	num += singleNum;
	if (answer && display.textContent == answer) {  //start new calculation after clicking on num when answer is displayed
		numA = '';
		numB = '';
		operator = '';
		display.textContent = num;
	}
	//stop overflowing the display for big nums but store it correctly
	else if (num.length > 21) {
		display.textContent = "infinite";
		let finite = num.slice(0, 21);
		num = finite;
	}
	else {
		display.textContent = num;
	}
	if (num.includes('.')) {     // no double decimal
		point.disabled = true;
		point.style.background = 'white';
		point.style.color = 'black';

	}
	else {
		point.disabled = false;
	}
}

operatorBtn.forEach((btn) => {
	btn.addEventListener("click", operatorfunct);
});

function operatorfunct(e) {
	if (numA && num == '' && operator) { //no double operators
		return;
	}
	else if (answer && display.textContent == answer) {  //start new calculation after clicking on an operator when answer is displayed
		numA = answer;
		if (e.type === "click") {
			operator = this.textContent;
		}
		else if (e.type === "keydown") {
			operator = e.key;
		}
		display.textContent = operator;
	}
	else {
		if (numA && num && operator) { //complete the previous opearation and then continue
			showResult();
			numA = answer;
			if (e.type === "click") {
				operator = this.textContent;
			}
			else if (e.type === "keydown") {
				operator = e.key;
			}
			display.textContent = operator;
		}
		else { //normal
			if (e.type === "click") {
				operator = this.textContent;
			}
			else if (e.type === "keydown") {
				operator = e.key;
			}
			display.textContent = operator;
			numA = + num;
			num = '';
		}
	}
}

equals.addEventListener("click", showResult);

function showResult() {
	numB = + num;
	num = '';
	if (operator === "/" && numB == 0) {
		answer = 'Bad Math!';
	}
	else {
		operate(numA, numB, operator);
		if (result % 1 != 0) {
			let toString = result.toString();
			if (toString.length > 11) {
				let displayStr = toString.substring(0, 7);
				display.textContent = displayStr + "e" + '+' + i;
			}
			else {
				answer = (+ result).toFixed(2);
			}
		}
		else {
			answer = result;
		}
	}
	let toStr = answer.toString();
	if (toStr.length > 11 && toStr.length < 21) {
		let displayStr = toStr.substring(0, 7);
		display.textContent = displayStr + "e" + '+' + i;
	}
	else if (toStr.length > 21) {
		display.textContent = "infinite";
	}
	else {
		display.textContent = answer.toString();
	}
}

backspace.addEventListener("click", del);

function del() {
	switch (display.textContent) {
		case num: {
			let n = num.length - 1;
			num = num.slice(0, n);
			display.textContent = num;
			break;
		}
		case operator: {
			operator = "";
			display.textContent = operator;
			break;
		}
		default: {
			num = answer;
			let str = num.toString();
			let n = str.length - 1;
			num = str.slice(0, n);
			display.textContent = num;
			break;
		}
	}
}

function operate(numA, numB, operator) {
	switch (operator) {
		case "+":
			result = numA + numB;
			break;
		case "-":
			result = numA - numB;
			break;
		case "*":
			result = numA * numB;
			break;
		case "/":
			result = numA / numB;
			break;
	}
}
