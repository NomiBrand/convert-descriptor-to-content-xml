import React, { Component } from 'react';
import $ from 'jquery';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      descriptorInput: '',
      contentResult: null,
      contentResultForCopy: '',
    };
  }

  convert() {
    const { descriptorInput } = this.state;
    const descriptorInputArray = $.parseJSON('[' + descriptorInput + ']');
    const contentResult = descriptorInputArray.map(element => (
      <div>
        {'content.' + element.itemId + '.Text="' + element.defaultValue + '"'}
      </div>
    ));
    const contentResultForCopy = descriptorInputArray.map(
      element =>
        'content.' + element.itemId + '.Text="' + element.defaultValue + '"'
    );
    this.setState({ contentResult, contentResultForCopy });
  }

  copyResult() {
    navigator.clipboard.writeText(this.state.contentResultForCopy);
  }

  render() {
    return (
      <div>
        <textarea
          placeholder='Insert your descriptor items here, Separated by a comma (without [])'
          onChange={e => {
            this.setState({ descriptorInput: e.target.value });
          }}
        />
        <button onClick={() => this.convert()}>Convert</button>
        <h1>Result:</h1>
        <button onClick={() => this.copyResult()}>Copy Result</button>
        <div className='result-block'>{this.state.contentResult}</div>
      </div>
    );
  }
}

export default App;
