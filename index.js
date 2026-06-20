let display = document.querySelector(".numdisplay");
let numbers = document.querySelectorAll(".numbers");
let operatorBtn = document.querySelectorAll(".operators");
let acBtn = document.querySelector("#allClear");
let equals = document.querySelector("#equals");

let numA = '';
let numB = '';
let operator;

acBtn.addEventListener("click", () => {
	numA = '';
	numB = '';
	operator = '';
	display.textContent = '';
});

operatorBtn.forEach((btn) => {
	btn.addEventListener("click", () => {
		operator = btn.textContent;
		display.textContent = operator;
	});
});

numbers.forEach((btn) => {
	btn.addEventListener("click", () => {
		let num = btn.textContent;
		numA += num;
		display.textContent = numA;
	});
});

numbers.forEach((btn) => {
	btn.addEventListener("click", () => {
		let num = btn.textContent;
		numB += num;
		display.textContent = numB;
	});
});






function add(numA, numB) {
	return numA + numB;
}
function subtract(numA, numB) {
	return numA - numB;
}
function multiply(numA, numB) {
	return numA * numB;
}
function divide(numA, numB) {
	return numA / numB;
}


function operate(numA, numB, operator) {
	switch (operator) {
		case "+":
			add();
			break;
		case "-":
			subtract();
			break;
		case "x":
			multiply(numA, numB);
			break;
		case "/":
			divide();
			break;
	}
}
