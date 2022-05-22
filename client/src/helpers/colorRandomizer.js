var rgbToHex = function (rgb) {
    var hex = Number(rgb).toString(16);
    if (hex.length < 2) {
        hex = "0" + hex;
    }
    return hex;
};

export const colorRandomizer = () => {
    // interested into a more intense, dark colors
    // first rgb, than hex
    var rangeBottom = 110
    var rangeTop = 210
    var r = Math.floor(Math.random() * (rangeTop - rangeBottom) + rangeBottom)
    var g = Math.floor(Math.random() * (rangeTop - rangeBottom) + rangeBottom)
    var b = Math.floor(Math.random() * (rangeTop - rangeBottom) + rangeBottom)

    return `#${rgbToHex(r)}${rgbToHex(g)}${rgbToHex(b)}`
}