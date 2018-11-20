import React, { Component } from 'react';
import GenerateScaleOLD from './GenerateScaleOLD';


class InputForm extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRootChoice = this.handleRootChoice.bind(this);
        this.handleChangeNMN = this.handleChangeNMN.bind(this);
        this.handleScaleChoice = this.handleScaleChoice.bind(this);
        this.state = {
            root: "0",
            selectedScale: "Minor Pentatonic",
            useNMN: false,
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
            scales: [],
            renderScale: false,
            soff: [0, 3, 2, 2 ,3 ,2 ]

        }
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log('Settings:\nRootnote:' + this.state.root);
        console.log('Scale: ' + this.state.selectedScale);
        this.setState({
            renderScale: true

        })
    }

    handleRootChoice(event) {
        this.setState({
           root: event.target.value
        });
    }

    handleScaleChoice (event){

        let soff = undefined
        for (let i = 0; i < this.state.scales.length; i++){
            if (this.state.scales[i].name == event.target.value){
                soff = this.state.scales[i].soff;
            }
        }

        this.setState({
            selectedScale: event.target.value,
            soff: soff

        })
        console.log('soff:' + this.state.soff)
    }


    handleChangeNMN(event){
        event.preventDefault();
        this.setState({
           useNMN: event.target.value
        });
        console.log('target:' + event.target.value);
    }

    displayNote(input){
        // will return the note based on users preference, SNM or NMN
        if (Number.isInteger(parseInt(input)) && this.state.useNMN){
            // the input is a number and the user wants a number
            //verifying input
            if (input < 0  || input > 11){
                return "error: invalid input, note must be between 0 and 11"
            }
            return input;

        } else if (Number.isInteger(parseInt(input)) && !this.state.useNMN){
            // the input is a number but the user wants a letter
            if (input < 0  || input > 11){
                return "error: invalid input, note must be between 0 and 11"
            }
            // the input is a number and the user wants a number
            return this.state.numbers[input];
        }
    }

    handleHTTPErrors(response) {
        if (!response.ok) throw Error(response.status + ': ' + response.statusText);
        return response;
    }

    componentDidMount() {
        fetch('http://localhost:3004/scales')
            .then(response=> this.handleHTTPErrors(response))
            .then(response=> response.json())
            .then(result=> {
                this.setState({
                    scales: result
                });
            })
            .catch(error=> {
                console.log('Fetch API Error: ' + error);
            });
    }

    render () {

            return (
                <div className={'mainForm'}>
                <form onSubmit={this.handleSubmit}>
                    <label className="rangeObject">
                        <input type="range" name="RootNoteInput"
                               min="0" max="11"
                               value={this.state.root}
                               onChange={this.handleRootChoice}/>
                        &nbsp;Root Note: {this.displayNote(this.state.root)}
                    </label>
                    <br/>
                    <label>
                        <div class="dropdown">
                            <button class="dropbtn">Scale: {this.state.selectedScale}</button>
                            <div class="dropdown-content">
                                {this.state.scales.map(scale =>
                                    <label key={scale.id}>
                                        <input key={scale.id} type='radio'  name='scale' value={scale.name}
                                               onChange={this.handleScaleChoice}/>
                                        &nbsp;&nbsp;{scale.name}
                                    </label>
                                )}
                            </div>
                        </div>
                        <br/>
                        <br/>
                    </label>
                    <label>
                        <input type="checkbox" value={this.state.useNMN}
                               onChange={this.handleChangeNMN}/>
                        &nbsp;Use NMN
                    </label>
                    <br/>
                    <input type="submit" value="Generate" className='button'/>
                </form>
                <GenerateScaleOLD root={this.state.root}
                                  scale={this.state.selectedScale}
                                  nmn={this.state.useNMN}
                                  soff={this.state.soff}/>
                </div>
            );
    }
}

export default InputForm;