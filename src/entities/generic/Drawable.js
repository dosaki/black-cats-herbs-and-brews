import { makeImage } from '../../utils/draw';

export class Drawable {
    constructor(canvas, imageMatrix, colours, crop) {
        this.canvas = canvas;
        this.background = colours[1] || "#000";
        this.imageMatrix = imageMatrix;
        this.colours = colours;
        this.crop = crop;
    }


    draw() {
        if (this.imageMatrix){
            // let {width, height} = this.crop ? {
            //     width: this.crop.width,
            //     height: this.crop.height
            // } : getDimensions(this.imageMatrix);
            this.canvas.width = this.crop ? this.crop.width : this.imageMatrix[0].length;
            this.canvas.height = this.crop ? this.crop.height : this.imageMatrix.length;
            this.canvas.style.width = `${this.canvas.width*10}px`;
            this.canvas.style.height = `${this.canvas.height*10}px`;

            let ctx = this.canvas.getContext("2d");
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            makeImage(ctx, this.imageMatrix, this.colours, this.crop);
        }
    }
}