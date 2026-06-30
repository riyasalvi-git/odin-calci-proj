let display = document.querySelector(".numdisplay");
let numbers = document.querySelectorAll(".numbers");
let operatorBtn = document.querySelectorAll(".operators");
let acBtn = document.querySelector("#allClear");
let equals = document.querySelector("#equals");

let result = '';
let num = '';
let numA = '';
let numB = '';
let operator;
let i = 0;

acBtn.addEventListener("click", () => {
	result = '';
	num = '';
	numA = '';
	numB = '';
	operator = '';
	display.textContent = '';
	i = 0
});

numbers.forEach((btn) => {
	btn.addEventListener("click", () => {
		++i;
		let singleNum = btn.textContent;
		num += singleNum;
		if (num.length > 10) {
			let displayStr = num.substring(0, 6);
			display.textContent = displayStr + "e" + '+' + i;
		}
		else {
			display.textContent = num;
		}
	});
});

operatorBtn.forEach((btn) => {
	btn.addEventListener("click", () => {
		if (numA != '' && num != '' && operator != '') {
			showResult();
			numA = result;
			operator = btn.textContent;
			display.textContent += operator;
		}
		else {
			operator = btn.textContent;
			display.textContent = operator;
			numA = + num;
			num = '';
		}
	});
});

equals.addEventListener("click", showResult);

function showResult() {
	let answer;
	numB = + num;
	num = '';
	operate(numA, numB, operator);
	if (result % 1 != 0) {
		if ((result).toString().length > 10) {
			let displayStr = result.substring(0, 6);
			answer = displayStr + "e" + '+' + i;
		}
		else {
			answer = (+ result).toFixed(2);
		}
	}
	else {
		answer = result;
	}
	display.textContent = answer;
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
