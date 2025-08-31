import { hexToRgbA } from './colour.js';

export const getDimensions = (matrix) => {
    return {
        width: matrix[0].length,
        height: matrix.length
    };
};

// 0 = transparent, 1 = colour1, 2 = colour2, etc...
export const makeImage = (ctx, matrix, colours, crop) => {
    const colouredMatrix = matrix.map(row => row.map(cell => hexToRgbA(["#00000000", ...colours][cell])));
    const width = colouredMatrix[0].length;
    const height = colouredMatrix.length;
    const imageData = new ImageData(width, height);
    colouredMatrix.forEach((row, y) => {
        row.forEach((colour, x) => {
            imageData.data.set(colour, (y * width + x) * 4);
        });
    });
    ctx.imageSmoothingEnabled = false;
    ctx.putImageData(imageData, -crop?.x || 0, -crop?.y || 0);
};

export const asCanvas = (matrix, colours, crop) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const { width, height } = getDimensions(matrix);
    canvas.width = width;
    canvas.height = height;
    makeImage(ctx, matrix, colours, crop);
    return canvas;
};

// export const asDataUrl = (matrix, colours, crop) => {
//     return asCanvas(matrix, colours, crop).toDataURL();
// };

export const resizeImage = (url, factor, callback) => {
    const sourceImage = new Image();

    sourceImage.onload = function () {
        // Create a canvas with the desired dimensions
        const canvas = document.createElement("canvas");
        canvas.width = sourceImage.width * factor;
        canvas.height = sourceImage.height * factor;
        // Scale and draw the source image to the canvas
        const ctx = canvas.getContext("2d");
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(sourceImage, 0, 0, canvas.width, canvas.height);

        // Convert the canvas to a data URL in PNG format
        callback(canvas.toDataURL());
    };

    sourceImage.src = url;
};
