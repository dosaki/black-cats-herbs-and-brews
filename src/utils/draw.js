import { hexToRgbA } from './colour.js';

// #c# = # number of pixels with colour # (0 is transparent)
const expandMatrix = (matrix, mirrorAll, colours) => {
    return matrix.map(row => {
        const newRow = [];
        let shouldMirrorRow = false;
        row.forEach(data => {
            if (data === "m") {
                shouldMirrorRow = true;
            }
            const [count, colourIndex] = data.split("c").map(Number);
            for (let i = 0; i < count; i++) {
                newRow.push(hexToRgbA(colours[colourIndex]));
            }
        });
        if (shouldMirrorRow || mirrorAll) {
            row.toReversed().forEach(data => {
                const [count, colourIndex] = data.split("c").map(Number);
                for (let i = 0; i < count; i++) {
                    newRow.push(hexToRgbA(colours[colourIndex]));
                }
            });
        }
        return newRow;
    });
};

export const getDimensions = (matrix, mirrorAll) => {
    const widths = matrix.map(r => {
        const w = r.map(d => {
            if (d === "m") {
                return 0;
            }
            return d.split("c").map(Number)[0];
        }).reduce((a, b) => a + b, 0);
        return r.includes("m") || mirrorAll ? w * 2 : w;
    });
    if (new Set(widths).size !== 1) {
        throw new Error("Inconsistent row widths");
    }
    return {
        width: widths[0],
        height: matrix.length
    };
};

export const makeImage = (ctx, matrix, mirrorAll, colours, crop) => {
    const expandedMatrix = expandMatrix(matrix, mirrorAll, ["#00000000", ...colours]);
    const width = expandedMatrix[0].length;
    const height = expandedMatrix.length;
    const imageData = new ImageData(width, height);
    expandedMatrix.forEach((row, y) => {
        row.forEach((colour, x) => {
            imageData.data.set(colour, (y * width + x) * 4);
        });
    });
    ctx.putImageData(imageData, -crop?.x || 0, -crop?.y || 0);
};
