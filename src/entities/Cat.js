import { cat } from '../drawables/images';
import { Drawable } from './generic/Drawable';

export class Cat extends Drawable {
    constructor(triggerElement) {
        super(triggerElement,
            cat,
            false,
            ["#000000ff", "#282828ff", "#171717ff"],
            { x: 5, y: 0, width: 23, height: 22 });
    }
}
