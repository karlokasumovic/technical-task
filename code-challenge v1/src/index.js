const { getColor } = require('./apiMock');

const { Green, Blue, Red, White, Black } = require('./classes');

async function getColors(green, blue, red, white, black, order, callback) {
	const colors = [];
	if (green === 'true') {
		green = new Green();
		colors[order.indexOf(green.name)] = getColor(green.name);
	}
	if (blue === 'true') {
		blue = new Blue()
		colors[order.indexOf(blue.name)] = getColor(blue.name);
	}
	if (red === 'true') {
		red = new Red();
		colors[order.indexOf(red.name)] = getColor(red.name);
	}
	if (white === 'true') {
		white = new White();
		colors[order.indexOf(white.name)] = getColor(white.name);
	}
	if (black === 'true') {
		black = new Black();
		colors[order.indexOf(black.name)] = getColor(black.name);
	}
	callback(colors);
	return colors;
}

async function getOneColor(color, callback) {
	const colors = await getColor(color.name);
	callback(colors)
	return colors;
}

function colors() {
	if (process.argv[2] === "async") {
		let green = process.argv[3];
		let blue = process.argv[4];
		let red = process.argv[5];
		let white = process.argv[6];
		let black = process.argv[7];
		const colorOrder = process.argv[8]
		getColors(green, blue, red, white, black, JSON.parse(JSON.stringify(colorOrder)), async function (colors) {
			colors = await Promise.all(colors)
			var hexColors = []
			colors.forEach(color => color ? hexColors.push(color.HEX) : null)
			console.log(hexColors);
			var rgbColors = []
			colors.forEach(color => color ? rgbColors.push(color.RGB) : null)
			console.log(rgbColors);
		});
	}
	if (process.argv[2] === "sync") {
		let color = process.argv[3];
		if (color === "green") {
			color = new Green()
			getOneColor(color, async function (colors) {
				console.log(colors);
			})
		}
		if (color === "blue") {
			color = new Blue()
			getOneColor(color, async function (colors) {
				console.log(colors);
			})
		}
		if (color === "red") {
			color = new Red()
			getOneColor(color, async function (colors) {
				console.log(colors);
			})
		}
		if (color === "white") {
			color = new White()
			getOneColor(color, async function (colors) {
				console.log(colors);
			})
		}
		if (color === "black") {
			color = new Black()
			getOneColor(color, async function (colors) {
				console.log(colors);
			})
		}
	}
}

colors()

/*
To run application:
node ~/code-challenge/src/index.js async true false true true true '["green","blue", "red","white","black"]'
or 
node ~/code-challenge/src/index.js sync green
*/
