import React, {Component} from 'react';

class TestApp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			var: 5
		}
	}

	render () {
		return <p>{this.state.var}</p>;
	}
}

export default TestApp;
