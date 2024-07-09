export function getRandomColorRGB() {
	return {
		r: Math.round(Math.random() * 255),
		g: Math.round(Math.random() * 255),
		b: Math.round(Math.random() * 255)
	};
}

export function getBrightness({ r, g, b }: { r: number; g: number; b: number }) {
	return Math.round((r * 299 + g * 587 + b * 114) / 1000);
}

export function getTextColorForBg(colorRGB: { r: number; g: number; b: number }) {
	const brightness = getBrightness(colorRGB);
	return brightness > 125 ? '#000000' : '#ffffff';
}
