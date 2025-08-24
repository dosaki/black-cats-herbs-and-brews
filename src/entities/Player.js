import { witch } from '../drawables/images';
import { pick } from '../utils/random';
import { Drawable } from './generic/Drawable';

export class Player extends Drawable {
    constructor(canvas, gold, inventory) {
        super(canvas,
            witch,
            true,
            ["#000000ff", "#929499ff", "#bdc2c0ff", "#d29558ff", "#615343ff", "#ffffffff", "#014a2dff", "#b46a47ff", "#922d2dff", "#19151cff"]
        );
        this.gold = gold;
        this._debt = [];
        this.inventory = inventory;
        this.chosenOption = null;
        this.previousLine = null;
    }

    get debt() {
        return this._debt.reduce((acc, d) => acc + d.current, 0);
    }

    addDebt(value) {
        this._debt.push({ current: value, original: value });
    }

    payDebt() {
        this._debt = this._debt.map(d => {
            const _payment = Math.ceil(d.original / 365);
            const payment = Math.min(d.current, _payment)
            this.gold -= payment;
            return {
                ...d,
                current: Math.max(0, Math.ceil(d.current - payment))
            };
        }).filter(d => d.current > 0);
    }

    get debtPortion() {
        return this._debt.reduce((a, b) => a + b, 0) / 365;
    }
}
