let display = document.querySelector(".numdisplay");
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
let i = 0;

acBtn.addEventListener("click", () => {
	result = '';
	answer = '';
	num = '';
	numA = '';
	numB = '';
	operator = '';
	display.textContent = '';
	i = 0
});

body.addEventListener("keydown", (e) => {
	numbers.forEach((btn) => {
		if (e.key === btn.textContent) {
			display.textContent = e.key;
		}
	});
	operatorBtn.forEach((btn) => {
		if (e.key === btn.textContent) {
			display.textContent = e.key;
		}
		else if (e.key === '*') {
			display.textContent = "x";
		}
	});
	if (e.key === "Backspace") {
		del();
	}
	else if (e.key === "Enter") {
		showResult();
	}
});

numbers.forEach((btn) => {
	btn.addEventListener("click", numpad());
});

function numpad() {
	++i;
	let singleNum = btn.textContent;
	num += singleNum;
	if (answer && display.textContent == answer) {  //start new calculation after clicking on num when answer is displayed
		i = 1
		numA = '';
		numB = '';
		operator = '';
		display.textContent = num;
	}
	else {
		if (num.length > 10) {   //stop overflowing the display for big nums but make sure to store it correctly
			let displayStr = num.substring(0, 6);
			display.textContent = displayStr + "e" + '+' + i;
		}
		else {
			display.textContent = num;
		}
	}
	if (num.includes('.')) {     // no double decimal
		point.disabled = true;
		display.textContent = num;
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

function operatorfunct() {
	if (numA && num == '' && operator) {
		return;
	}
	else {
		if (numA && num && operator) {
			showResult();
			numA = answer;
			operator = btn.textContent;
			display.textContent = operator;
		}
		else {
			operator = btn.textContent;
			display.textContent = operator;
			if (numA) {
				return;
			}
			else {
				numA = + num;
				num = '';
			}
		}
	}
}

equals.addEventListener("click", showResult);

function showResult() {
	numB = + num;
	num = '';
	if (operator && numB == 0) {
		answer = 'Bad Math!';
	}
	else {
		operate(numA, numB, operator);
		if (result % 1 != 0) {
			let toString = result.toString();
			if (toString.length > 10) {
				let displayStr = toString.substring(0, 6);
				answer = displayStr + "e" + '+' + i;
			}
			else {
				answer = (+ result).toFixed(2);
			}
		}
		else {
			answer = result;
		}
	}
	display.textContent = answer.toString();
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

function add(numA, numB) {
	result = numA + numB;
}
function subtract(numA, numB) {
	result = numA - numB;
}
function multiply(numA, numB) {
	result = numA * numB;
}
function divide(numA, numB) {
	result = numA / numB;
}


function operate(numA, numB, operator) {
	switch (operator) {
		case "+":
			add(numA, numB);
			break;
		case "-":
			subtract(numA, numB);
			break;
		case "x":
			multiply(numA, numB);
			break;
		case "/":
			divide(numA, numB);
			break;
	}
}
