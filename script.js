document.addEventListener("DOMContentLoaded",() => {
	const pb = new ProgressBar(".pb");
});

class ProgressBar {
	constructor(el) {
		this.value = 0;
		this.loop = true;
		this.el = document.querySelector(el);
		this.wrapEl = document.querySelector(".pb__wrap");
		this.valueEl = document.querySelector(".pb__value");

		setTimeout(this.run.bind(this),500);
	}
	inc(amount) {
		this.value += amount;

		if (this.value > 1)
			this.value = 1;
		// update the CSS variable
		if (this.el)
			this.el.style.setProperty("--value",this.value);
		// wrapper
		if (this.wrapEl) {
			// add the class if more than halfway off the edge
			let wrapCL = this.wrapEl.classList,
				fallingClass = "pb__wrap--falling";

			if (this.value > 0.5 && !wrapCL.contains(fallingClass))
				wrapCL.add(fallingClass);
		}
		// update the percentage value
		if (this.valueEl) {
			let displayValue = +(this.value * 100).toFixed(2);
			this.valueEl.textContent = `${displayValue}%`;
		}
	}
	reset() {
		this.value = 0;
		// reset the CSS variable, skip transitions
		if (this.el) {
			this.el.style.setProperty("--value",this.value);
			this.el.classList.add("pb--resetting");
		}
		// remove the “falling” class
		if (this.wrapEl)
			this.wrapEl.classList.remove("pb__wrap--falling");
		// percentage value
		if (this.valueEl)
			this.valueEl.textContent = `${this.value}%`;
	}
	run() {
		let incAmount = 0.01,
			interval = 0.025 * 1e3;

		if (this.value < 1) {
			this.el.classList.remove("pb--resetting");
			this.inc(incAmount);
			setTimeout(this.run.bind(this),interval);

		} else if (this.loop) {
			setTimeout(this.reset.bind(this),1000);
			setTimeout(this.run.bind(this),1500);
		}
	}
}