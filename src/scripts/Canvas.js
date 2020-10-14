function Canvas2D() {
    this.canvas = document.getElementById("main-canvas");
    this.context = this.canvas.getContext('2d');
    this.originalImage = null;
}

Canvas2D.prototype.init = function () {
    this.originalImage = loadImage();
}

Canvas2D.prototype.drawImage = function () {
    if (this.originalImage != null) {
        this.context.drawImage(this.originalImage, 0, 0, this.originalImage.width, this.originalImage.height, 0, 0, this.canvas.width, this.canvas.height);
        var imageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
        var filter = document.getElementById("filter-select");
        imageData.filter(filter.options[filter.selectedIndex].value);
        this.context.putImageData(imageData, 0, 0);
    }
}

function loadImage() {
    var image = new Image();
    image.onerror = function () {
        alert("Image could not be loaded.");
    }
    image.onload = function () {
        image.crossOrigin = "Anonymous";
        Canvas.drawImage(image);
    }
    image.src = `./src/assets/images/sample-image.jpg`
    return image;
}

let Canvas = new Canvas2D();