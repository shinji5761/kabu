import { Technical } from './technical';

export class Emvelopes extends Technical {
    constructor() {
        super( 'emvelopes', 'Emvelopes' );
        this.params.push(
            { 'type' : 'term', 'label' : '期間', 'value' : 20 }
        );
    }
}

