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

acBtn.addEventListener("click", () => {
	result = '';
	num = '';
	numA = '';
	numB = '';
	operator = '';
	display.textContent = '';
});

numbers.forEach((btn) => {
	btn.addEventListener("click", () => {
		let singleNum = btn.textContent;
		num += singleNum;
		display.textContent = num;
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
	numB = + num;
	num = '';
	operate(numA, numB, operator);
}



function add(numA, numB) {
	result = numA + numB;
	display.textContent = result;
}
function subtract(numA, numB) {
	result = numA - numB;
	display.textContent = result;
}
function multiply(numA, numB) {
	result = numA * numB;
	display.textContent = result;
}
function divide(numA, numB) {
	result = numA / numB;
	display.textContent = result;
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
