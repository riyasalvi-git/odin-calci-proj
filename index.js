let display = document.querySelector(".numdisplay");
let numbers = document.querySelectorAll(".numbers");
let operatorBtn = document.querySelectorAll(".operators");
let acBtn = document.querySelector("#allClear");
let equals = document.querySelector("#equals");
let point = document.querySelector("#point");

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

numbers.forEach((btn) => {
	btn.addEventListener("click", () => {
		++i;
		let singleNum = btn.textContent;
		num += singleNum;
		if (answer && display.textContent == answer) {
			i = 1
			numA = '';
			numB = '';
			operator = '';
			display.textContent = num;
		}
		else {
			if (num.length > 10) {
				let displayStr = num.substring(0, 6);
				display.textContent = displayStr + "e" + '+' + i;
			}
			else {
				display.textContent = num;
			}
		}
		if (num.includes('.')) {
			point.disabled = true;
			display.textContent = num;
			point.style.background = 'white';
			point.style.color = 'black';

		}
		else {
			point.disabled = false;
		}
	});
});

operatorBtn.forEach((btn) => {
	btn.addEventListener("click", () => {
		if (numA && num == '' && operator) {
			return;
		}
		else {
			if (numA != '' && num != '' && operator != '') {
				showResult();
				numA = answer;
				operator = btn.textContent;
				display.textContent += operator;
			}
			else {
				operator = btn.textContent;
				display.textContent += operator;
				numA = + num;
				num = '';
			}
		}
	});
});

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
