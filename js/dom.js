"use strict";
// Виборка елементів для взаємодії
const inputEl = document.querySelector(".js-input");
const listEl = document.querySelector(".js-output__field");
const wrapperEL = document.querySelector(".js-wrapper");
const checkboxEl = document.querySelector(".js-checkbox");

// Виборка кнопок для взаємодії
const btnAdd = document.querySelector("[data-add]");
const btnSortByName = document.querySelector('[data-action="sort-by-name"]');
const btnSortByValue = document.querySelector('[data-action="sort-by-value"]');
const btnDelete = document.querySelector('[data-action="delete"]');
const btnMagic = document.querySelector('[data-action="magic"]');

// Оголошення слухачів

btnDelete.addEventListener("click", deleteElement);
btnAdd.addEventListener("click", onClickAdd);
btnSortByName.addEventListener("click", onClickSortByName);
btnSortByValue.addEventListener("click", onClickSortByValue);
btnMagic.addEventListener("click", onCreateFence);

document.addEventListener("keydown", onPressEnter);
document.addEventListener("keydown", onPressDelete);

// масив, що зберігає об'єкти введених пар
const objectsArray = [];

// Сет функцій

function onClickAdd() {
	const validedUserInputArr = validatorAlphanumeric(inputEl.value);

	if (!validedUserInputArr) {
		return;
	}

	const newObjectElement = createObjectElement(validedUserInputArr);
	objectsArray.push(newObjectElement);

	const createhtmlElement = createMarkupEl.bind(newObjectElement);

	listEl.insertAdjacentHTML("beforeend", createhtmlElement());
	inputEl.value = "";
}

function validatorAlphanumeric(userValue) {
	if (!userValue.includes("=")) {
		inputEl.value = "";
		return alert("Enter value in format <name> = <value>");
	}
	const userInputArr = userValue.split("=");
	userInputArr[0] = userInputArr[0].trim();
	userInputArr[1] = userInputArr[1].trim();

	if (!/^[а-яА-Яa-zA-Z0-9]+$/.test(userInputArr[1]) || !/^[а-яА-Яa-zA-Z0-9]+$/.test(userInputArr[0])) {
		inputEl.value = "";
		return alert("Enter value in format <name> = <value>");
	}
	return userInputArr;
}

function createObjectElement(array) {
	const inputObject = {};

	inputObject.name = array[0];
	inputObject.value = array[1];
	return inputObject;
}

function createMarkupEl() {
	const htmlString = `<label class="label"><input class="checkbox js-checkbox" type="checkbox" /><span class="span">${this.name}=${this.value}</span></label>`;
	return htmlString;
}

function onClickSortByName() {
	const newArrSortByName = sortByName(objectsArray);
	outputSortedValues(newArrSortByName);
}

function onClickSortByValue() {
	const newArrSortByName = sortByValue(objectsArray);
	outputSortedValues(newArrSortByName);
}

function sortByName(objectsArray) {
	const inAlphabeticalOrderArr = [...objectsArray].sort((firstName, secondName) =>
		firstName.name.localeCompare(secondName.name),
	);
	return inAlphabeticalOrderArr;
}

function sortByValue(objectsArray) {
	const inAlphabeticalOrderArr = [...objectsArray].sort((firstName, secondName) =>
		firstName.value.localeCompare(secondName.value),
	);
	return inAlphabeticalOrderArr;
}

function outputSortedValues(sortedArr) {
	listEl.innerHTML = "";
	const createMarkupSortArr = sortedArr
		.map(
			({ name, value }) =>
				`<label class="label"><input class="checkbox" type="checkbox" /><span class="span">${name}=${value}</span></label>`,
		)
		.join("");

	listEl.insertAdjacentHTML("beforeend", createMarkupSortArr);
}

function deleteElement() {
	const outputInputList = document.querySelectorAll('[type="checkbox"]');
	for (let i = 0; i < outputInputList.length; i++) {
		if (outputInputList[i].checked === true) {
			outputInputList[i].parentNode.remove();
			// *************** видаляємо відмічений елемент з масиву
			const checkedElem = outputInputList[i].parentNode.textContent;
			const indexElOfDelete = findCheckedElInArray(checkedElem);
			objectsArray.splice(indexElOfDelete, 1);
		}
	}
}

function findCheckedElInArray(string) {
	const splitedStringArr = string.split("=");
	const findIndex = objectsArray.findIndex(
		({ name, value }) => name === splitedStringArr[0] && value === splitedStringArr[1],
	);
	if (!~findIndex) {
		return "немає елемента";
	}
	return findIndex;
}

function onPressEnter(event) {
	if (event.key === "Enter" && inputEl.value) {
		onClickAdd();
	}
}

function onPressDelete(event) {
	if (event.key === "Delete") {
		deleteElement();
	}
}

// Show magic

function onCreateFence() {
	wrapperEL.innerHTML = "";
	const createMarkupBoxes = objectsArray
		.map(
			({ name, value }) =>
				`<div class="box js-box" style="height: ${
					(name + value).length * 10
				}px; width: 20px; background-color: ${getRandomHexColor()}">
					<p class="box__title">${name + "=" + value}</p>
				</div>`,
		)
		.join("");

	wrapperEL.insertAdjacentHTML("beforeend", createMarkupBoxes);
}

function getRandomHexColor() {
	return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
