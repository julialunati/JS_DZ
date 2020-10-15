"use strict";

class Hamburger {

	data = { price: 0, calories: 0 }

	burgers = {
		small: { price: 50, calories: 20 },
		large: { price: 100, calories: 40 },
		cheese: { price: 10, calories: 20 },
		salad: { price: 20, calories: 5 },
		potato: { price: 15, calories: 10 },
		spice: { price: 15, calories: 0 },
		mayo: { price: 20, calories: 5 },
	}

	calc(size) {
		this.data.price += hamburger.burgers[size].price;
		this.data.calories += hamburger.burgers[size].calories;

		var checkedBoxes = document.querySelectorAll('input[name=add]:checked');
		for (var i = 0; i < checkedBoxes.length; i++) {
			var add = checkedBoxes[i].id;
			this.data.price += hamburger.burgers[add].price;
			this.data.calories += hamburger.burgers[add].calories;
		}

		document.getElementById('price').innerHTML = this.data.price;
		document.getElementById('calories').innerHTML = this.data.calories;
	}

	resetData() {
		this.data.price = null;
		this.data.calories = null;
	}
}

const hamburger = new Hamburger();

document.getElementById('form').addEventListener('submit', function (event) {
	hamburger.resetData();
	hamburger.calc(document.querySelector('input[name="size"]:checked').value);
	event.preventDefault();
});

