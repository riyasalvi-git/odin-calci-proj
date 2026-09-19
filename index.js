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

//keyboard support by clicking anywhere on the webpage
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

//onscreen buttons support with mouse click
acBtn.addEventListener("click", allClear);

numbers.forEach((btn) => {
	btn.addEventListener("click", numpad);
});

operatorBtn.forEach((btn) => {
	btn.addEventListener("click", operatorfunct);
});

equals.addEventListener("click", showResult);

backspace.addEventListener("click", del);

//functions declaration
function allClear() {
	result = '';
	answer = '';
	num = '';
	numA = '';
	numB = '';
	operator = '';
	display.textContent = '';
}

function numpad(e) {
	let singleNum;
	if (e.type === "click") {
		singleNum = this.textContent;
	}
	else if (e.type === "keydown") {
		singleNum = e.key;
	}
	num += singleNum;
	//start new calculation after clicking on num when answer is displayed
	if (answer && display.textContent == answer) {
		numA = '';
		numB = '';
		operator = '';
		display.textContent = num;
	}
	//stop overflowing the display for big nums and store it correctly
	else if (num.length > 21) {
		display.textContent = "infinite";
		let finite = num.slice(0, 21);
		num = finite;
	}
	else {
		display.textContent = num;
	}
	//no double decimal
	if (num.includes('.')) {
		point.disabled = true;
		point.style.background = 'white';
		point.style.color = 'black';

	}
	else {
		point.disabled = false;
	}
}

function operatorfunct(e) {
	//no double operators
	if (numA && num == '' && operator) {
		return;
	}
	//start new calculation after clicking on an operator when answer is displayed
	else if (answer && display.textContent == answer) {
		numA = answer;
		if (e.type === "click") {
			operator = this.textContent;
		}
		else if (e.type === "keydown") {
			operator = e.key;
		}
		display.textContent = operator;
	}
	//complete the previous operation and then continue	
	else if (numA && num && operator) {
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
	//default
	else {
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

function showResult() {
	numB = + num;
	num = '';
	//prevent crashing when dividing by 0
	if (operator === "/" && numB == 0) {
		answer = 'Bad Math!';
	}
	else {
		operate(numA, numB, operator);
		//keep decimals to two
		if (result % 1 != 0) {
			answer = (+ result).toFixed(2);
		}
		else {
			answer = result;
		}
	}
	let toStr = answer.toString();
	//prevent overflowing display
	if (toStr.length > 21) {
		display.textContent = "infinite";
	}
	else {
		display.textContent = answer;
		numA = '';
		operator = '';
		numB = '';
	}
}

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

