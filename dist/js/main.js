class TypeWriter {
	constructor(txtElem, words, wait = 3000) {
		this.txtElem = txtElem;
		this.words = words;
		this.txt = '';
		this.wordIndex = 0;
		this.wait = parseInt(wait, 10);
		this.type();
		this.isDeleting = false;
	}

	type() {
		const currentIndex = this.wordIndex % this.words.length;
		const fullTxt = this.words[currentIndex];

		if (this.isDeleting) {
			// remove
			this.txt = fullTxt.substring(0, this.txt.length - 1);
		} else {
			// add
			this.txt = fullTxt.substring(0, this.txt.length + 1);
		}

		this.txtElem.innerHTML = `<span class="txt">${this.txt}</span>`;

		let typeSpeed = 300;

		if (this.isDeleting) {
			typeSpeed /= 2;
		}

		if (!this.isDeleting && this.txt === fullTxt) {
			typeSpeed = this.wait;

			this.isDeleting = true;
		} else if (this.isDeleting && this.txt === '') {
			this.isDeleting = false;

			this.wordIndex++;

			typeSpeed = 500;
		}

		setTimeout(() => this.type(), typeSpeed);
	}
}

window.onload = init;

function init() {
	const txtElem = document.querySelector('.text-type');
	const words = JSON.parse(txtElem.getAttribute('data-words'));
	const wait = txtElem.getAttribute('data-wait');

	new TypeWriter(txtElem, words, wait);
}
