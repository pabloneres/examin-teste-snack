/**
 * Convert RGB to HEX
 * rgbToHex(0, 51, 255)
 *
 * @param r
 * @param g
 * @param b
 *
 * @returns {string}
 */
const rgbToHex = (r, g, b) => "#" + [r, g, b].map(x => {
	const hex = x.toString(16);
	return hex.length === 1 ? "0" + hex : hex;
}).join("");

/**
 * Convert Hex to RGB
 * hexToRgb("#0033ff")
 *
 * @param hex
 *
 * @returns {number[]}
 */
const hexToRgb = hex =>
	hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
		, (m, r, g, b) => "#" + r + r + g + g + b + b)
	.substring(1).match(/.{2}/g)
	.map(x => parseInt(x, 16));

/**
 * LightenDarken color
 * https://css-tricks.com/snippets/javascript/lighten-darken-color/
 *
 * @param col
 * @param amt
 *
 * @returns {string}
 */
function lightenDarkenColor(col, amt) {
	let usePound = false;

	if( col[0] === "#" )
	{
		col      = col.slice(1);
		usePound = true;
	}

	let num = parseInt(col, 16);

	let r = (num >> 16) + amt;

	if( r > 255 ) r = 255;
	else if( r < 0 ) r = 0;

	let b = ((num >> 8) & 0x00FF) + amt;

	if( b > 255 ) b = 255;
	else if( b < 0 ) b = 0;

	let g = (num & 0x0000FF) + amt;

	if( g > 255 ) g = 255;
	else if( g < 0 ) g = 0;

	return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
}

export {
	rgbToHex,
	hexToRgb,
	lightenDarkenColor,
};
