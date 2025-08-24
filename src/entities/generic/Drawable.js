import { getDimensions, makeImage } from '../../utils/draw';

export class Drawable {
    constructor(canvas, imageMatrix, mirrorImage, colours, crop) {
        this.canvas = canvas;
        this.background = colours[1] || "#000";
        this.imageMatrix = imageMatrix;
        this.mirrorImage = mirrorImage;
        this.colours = colours;
        this.crop = crop;
    }


    draw() {
        if (this.imageMatrix){
            const {width, height} = this.crop ? {
                width: this.crop.width,
                height: this.crop.height
            } : getDimensions(this.imageMatrix, this.mirrorImage);
            this.canvas.width = width;
            this.canvas.height = height;
            this.canvas.style.width = `${width*10}px`;
            this.canvas.style.height = `${height*10}px`;

            const ctx = this.canvas.getContext("2d");
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            makeImage(ctx, this.imageMatrix, this.mirrorImage, this.colours, this.crop);
        }
    }
}