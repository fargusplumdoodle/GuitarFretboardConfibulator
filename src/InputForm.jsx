import React, { Component } from 'react';

function DisplayNote(input, nmn) {
        const numbers = {
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

        };
        //verifying input
        if (input < 0  || input > 11){
            return "error: invalid input, note must be between 0 and 11"
        }
        // will return the note based on users preference, SNM or NMN
        if (Number.isInteger(parseInt(input)) && nmn){
            // the input is a number and the user wants a number
            return input;

        } else if (Number.isInteger(parseInt(input)) && !nmn){
            // the input is a number but the user wants a letter
            return numbers[input];
        }
    }

const GenerateScale = (props) => {
        let scale = '';

        for (let i = 0; i < props.soff.length; i++){
            let x = 0;
            for (let y = 0; y < i + 1; y++){
                x += props.soff[y];
            }
           let note = (+props.base + x) % 12;
            scale += DisplayNote(note, props.nmn) + ' ';
        }
	
	return( scale.toString() );
};

class InputForm extends Component {

	constructor(props){
		super(props);
		this.handleNMNChange = this.handleNMNChange.bind(this);
		this.handleScaleChoice = this.handleScaleChoice.bind(this);
		this.handleRootChange = this.handleRootChange.bind(this);
		this.state = {
			root: 0,
			scale: 'Minor Pentatonic',
			scales: [],
			soff: [0, 3, 2, 2, 3, 2],
			nmn: false
		}
	}

	handleRootChange(event){
		event.preventDefault();
		this.setState({
			root: event.target.value
		});
	}

    handleNMNChange(event){
        event.preventDefault();
	console.log('Event: ' + event.target.value);
        this.setState({
            nmn: event.target.value
        });
    }

    handleScaleChoice (event){

        let soff = undefined
        for (let i = 0; i < this.state.scales.length; i++){
            if (this.state.scales[i].name === event.target.value){
                soff = this.state.scales[i].soff;
            }
        }

        this.setState({
            scale: event.target.value,
            soff: soff

        })
        console.log('soff:' + this.state.soff)
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

	render(){
		return (
		<div class='interface'>
		<form onSubmit={this.handleRootChange} class='mainForm'>
			<label class='rangeObject' >
				<input type='range'
					name='rootnoteinput'
					min='0' max='11'
					onChange={this.handleRootChange}
					value={this.state.root}
					
					/>
			&nbsp;Root note: {this.state.root}
			</label>
			<br/>
			<label class='rangeObject'>	
				<input type='checkbox'
					name='nmncheckbox'
					checked={this.state.nmn}
					value='UseNMN'
					onChange={this.handleNMNChange}/>
			&nbsp;NMN
			</label>
			<br/>
			    <label>
				<div class="dropdown">
				    <button class="dropbtn">Scale: {this.state.scale}</button>
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
		</form>
		<GenerateScale nmn={this.state.nmn} base={ this.state.root} soff={this.state.soff}/>
		</div>
		);

	}

}

export default InputForm;








