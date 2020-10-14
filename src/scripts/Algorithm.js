const MODE = {
    ORIGINAL: "original",
    GLASS: "glass"
}

/**
 * Applies the specified filter mode to the original ImageData and modifies it.
 * @param {*} filterMode 
 */
ImageData.prototype.filter = function (filterMode) {
    if (filterMode == MODE.GLASS)
        glassFilter(this);
}

ImageData.prototype.setPixel = function (look, editIndex, targetIndex) {
    for (var i = 0; i < 4; i++) {
        this.data[editIndex + i] = look[targetIndex + i];
    }
}

function glassFilter(orig) {
    var backup = Uint8ClampedArray.from(orig.data);
    var dist = 20;
    for (var i = 0; i < orig.width; i++) {
        for (var j = 0; j < orig.height; j++) {
            var ii = random(i - dist, i + dist);
            var jj = random(j - dist, j + dist);
            if (inRectangle(ii, jj, orig.width, orig.height))
                orig.setPixel(backup, vectorToIndex(i, j, orig.width), vectorToIndex(ii, jj, orig.width));
        }
    }
}

function inRectangle(x, y, width, height) {
    return x >= 0 && x < width && y >= 0 && y < height;
}

function random(lo, hi) {
    return lo + Math.trunc(Math.random() * (hi - lo));
}

function vectorToIndex(x, y, width) {
    return (x + y * width) * 4;
}