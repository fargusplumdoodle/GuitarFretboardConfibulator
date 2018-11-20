import React, { Component } from 'react';

class GenerateScale extends Component {
    constructor(props){
        super(props);
        this.state = {
            numbers: {
                0: "A",
                1: "A#",
                2: "B",
                3: "C",
                4: "C#",
                5: "D",
                6: "D#",
                7: "E",
                8: "F",
                9: "F#",
                10: "G",
                11: "G#"

            },
            nmn: this.props.nmn
        }
    }


    displayNote(input){
        // will return the note based on users preference, SNM or NMN
        if (Number.isInteger(parseInt(input)) && this.state.nmn){
            // the input is a number and the user wants a number
            //verifying input
            if (input < 0  || input > 11){
                return "error: invalid input, note must be between 0 and 11"
            }
            return input;

        } else if (Number.isInteger(parseInt(input)) && !this.state.nmn){
            // the input is a number but the user wants a letter
            if (input < 0  || input > 11){
                return "error: invalid input, note must be between 0 and 11"
            }
            // the input is a number and the user wants a number
            return this.state.numbers[input];
        }
    }

    generateScale(){
        let base = this.props.root;
        let scale = '';
        for (let i = 0; i < this.props.soff.length; i++){
            let x = 0;
            for (let y = 0; y < i + 1; y++){
                x += this.props.soff[y];
            }
           let note = (+base + x) % 12;
            scale += this.displayNote(note) + ' '
        }
        console.log('SCALE: ' + scale)
        return scale;
    }

    render () {
        return (
            <div>
            <h4>Scale: {this.displayNote(this.props.root)} {this.props.scale} </h4>
            <h2>{this.generateScale()}</h2>
            </div>

        );
    }
}

export default GenerateScale;