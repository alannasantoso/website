function getCharacterBounds(imageData) {
	const { data, width, height } = imageData;
	let minX = width;
	let minY = height;
	let maxX = -1;
	let maxY = -1;

	for (let y = 0; y < height; y += 1) {
		for (let x = 0; x < width; x += 1) {
			const alpha = data[(y * width + x) * 4 + 3];
			if (alpha === 0) continue;

			minX = Math.min(minX, x);
			minY = Math.min(minY, y);
			maxX = Math.max(maxX, x);
			maxY = Math.max(maxY, y);
		}
	}

	if (maxX === -1) return null;

	return {
		x: minX,
		y: minY,
		width: maxX - minX + 1,
		height: maxY - minY + 1,
	};
}

function downloadCanvas(canvas, filename) {
	canvas.toBlob((blob) => {
		if (!blob) return;

		const link = document.createElement('a');
		const url = URL.createObjectURL(blob);
		link.download = filename;
		link.href = url;
		link.style.display = 'none';

		document.body.appendChild(link);
		link.click();
		link.remove();

		window.setTimeout(() => URL.revokeObjectURL(url), 1000);
	}, 'image/png');
}

function get2DCanvas(source) {
	const canvas = document.createElement('canvas');
	canvas.width = source.width;
	canvas.height = source.height;

	const context = canvas.getContext('2d');
	context.imageSmoothingEnabled = false;
	context.drawImage(source, 0, 0);

	return canvas;
}

function getWebGLCanvas(source) {
	const gl = source.getContext('webgl2') || source.getContext('webgl') || source.getContext('experimental-webgl');
	if (!gl) return null;

	const width = source.width;
	const height = source.height;
	const pixels = new Uint8Array(width * height * 4);
	gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, pixels);

	const flipped = new Uint8ClampedArray(width * height * 4);
	const rowSize = width * 4;
	for (let y = 0; y < height; y += 1) {
		const sourceStart = (height - y - 1) * rowSize;
		const targetStart = y * rowSize;
		flipped.set(pixels.subarray(sourceStart, sourceStart + rowSize), targetStart);
	}

	const canvas = document.createElement('canvas');
	canvas.width = width;
	canvas.height = height;

	const context = canvas.getContext('2d');
	context.putImageData(new ImageData(flipped, width, height), 0, 0);

	return canvas;
}

function getExportSourceCanvas(source) {
	const canvas2D = get2DCanvas(source);
	const imageData2D = canvas2D.getContext('2d').getImageData(0, 0, canvas2D.width, canvas2D.height);
	if (getCharacterBounds(imageData2D)) return canvas2D;

	return getWebGLCanvas(source) || canvas2D;
}

function exportCharacter() {
	const source = document.querySelector('.viewer-canvas canvas');
	if (!source) return;

	const exportSourceCanvas = getExportSourceCanvas(source);
	const exportSourceContext = exportSourceCanvas.getContext('2d');

	const imageData = exportSourceContext.getImageData(0, 0, exportSourceCanvas.width, exportSourceCanvas.height);
	const bounds = getCharacterBounds(imageData);

	if (!bounds) {
		downloadCanvas(exportSourceCanvas, 'stardew-character.png');
		return;
	}

	const padding = 2;
	const cropX = Math.max(0, bounds.x - padding);
	const cropY = Math.max(0, bounds.y - padding);
	const cropWidth = Math.min(exportSourceCanvas.width - cropX, bounds.width + padding * 2);
	const cropHeight = Math.min(exportSourceCanvas.height - cropY, bounds.height + padding * 2);

	const exportCanvas = document.createElement('canvas');
	exportCanvas.width = cropWidth;
	exportCanvas.height = cropHeight;

	const exportContext = exportCanvas.getContext('2d');
	exportContext.imageSmoothingEnabled = false;
	exportContext.drawImage(
		exportSourceCanvas,
		cropX,
		cropY,
		cropWidth,
		cropHeight,
		0,
		0,
		cropWidth,
		cropHeight,
	);

	downloadCanvas(exportCanvas, 'stardew-character.png');
}

function addExportButton() {
	const viewerBox = document.querySelector('.viewer-box');
	if (!viewerBox || viewerBox.querySelector('.export-character-button')) return;

	const button = document.createElement('button');
	button.type = 'button';
	button.className = 'export-character-button';
	button.textContent = 'Export PNG';
	button.addEventListener('click', exportCharacter);

	viewerBox.appendChild(button);
}

const observer = new MutationObserver(addExportButton);
observer.observe(document.body, { childList: true, subtree: true });
addExportButton();
