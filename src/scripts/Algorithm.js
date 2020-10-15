const MODE = {
    ORIGINAL: "original",
    FLIP: "flip",
    GLASS: "glass",
    POSTERIZE: "posterize"
}

/**
 * Applies the specified filter mode to the original ImageData and modifies it.
 * @param {*} filterMode 
 */
ImageData.prototype.filter = function (filterMode) {
    if (filterMode == MODE.FLIP) {
        flipFilter(this, document.getElementById("flip-axis").value);
    }
    if (filterMode == MODE.GLASS) {
        glassFilter(this, parseInt(document.getElementById("glass-thickness").value));
    }
    if (filterMode == MODE.POSTERIZE) {
        posterizeFilter(this, parseInt(document.getElementById("posterize-depth").value));
    }
}

/**
 * Sets the given pixel to the given ImageData.data's specified pixel.
 * @param {Uint8ClampedArray} look 
 * @param {number} editIndex 
 * @param {number} targetIndex 
 */
ImageData.prototype.setPixel = function (look, editIndex, targetIndex) {
    for (var i = 0; i < 4; i++) {
        this.data[editIndex + i] = look[targetIndex + i];
    }
}

/**
 * Applies the flip filter to the given ImageData using the given axis.
 * @param {ImageData} orig 
 * @param {string} axis 
 */
function flipFilter(orig, axis) {
    var backup = Uint8ClampedArray.from(orig.data);
    for (var i = 0; i < orig.width; i++) {
        for (var j = 0; j < orig.height; j++) {
            var ii = axis == "vertical" || axis == "both" ? orig.width - i : i;
            var jj = axis == "horizontal" || axis == "both" ? orig.height - j : j;
            orig.setPixel(backup, vectorToIndex(i, j, orig.width), vectorToIndex(ii, jj, orig.width));
        }
    }
}

/**
 * Applies the glass filter to the given ImageData using the given distance value.
 * @param {ImageData} orig 
 * @param {number} dist 
 */
function glassFilter(orig, dist) {
    var backup = Uint8ClampedArray.from(orig.data);
    for (var i = 0; i < orig.width; i++) {
        for (var j = 0; j < orig.height; j++) {
            var ii = random(i - dist, i + dist);
            var jj = random(j - dist, j + dist);
            if (inRectangle(ii, jj, orig.width, orig.height))
                orig.setPixel(backup, vectorToIndex(i, j, orig.width), vectorToIndex(ii, jj, orig.width));
        }
    }
}

/**
 * Applies the posterize filter to the given ImageData using the given mod value.
 * @param {ImageData} orig 
 * @param {number} mod 
 */
function posterizeFilter(orig, mod) {
    var backup = Uint8ClampedArray.from(orig.data);
    for (var i = 0; i < backup.length; i++) {
        if (i % 4 != 3)
            orig.data[i] = Math.trunc(backup[i] / mod) * mod;
    }
}

/**
 * Returns whether the given point is in the rectangle.
 * @param {number} x 
 * @param {number} y 
 * @param {number} width 
 * @param {number} height 
 */
function inRectangle(x, y, width, height) {
    return x >= 0 && x < width && y >= 0 && y < height;
}

/**
 * Returns a random integer in the given range.
 * @param {number} lo 
 * @param {number} hi 
 */
function random(lo, hi) {
    return lo + Math.trunc(Math.random() * (hi - lo));
}

/**
 * Returns the corresponding index value of the given point in the flattened array using its width.
 * @param {number} x 
 * @param {number} y 
 * @param {number} width 
 */
function vectorToIndex(x, y, width) {
    return (x + y * width) * 4;
}