function ImageElement(image){
	var imgElem = document.createElement("img");
	imgElem.src = image;

	return imgElem;
}

module.exports = ImageElement;