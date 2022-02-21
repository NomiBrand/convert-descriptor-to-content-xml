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
    let descriptorInputArray;
    try {
      descriptorInputArray = $.parseJSON('[' + descriptorInput + ']');
    } catch {
      alert('Pls insert valid descriptor item format');
    }
    const contentResult = descriptorInputArray.map((element, key) => (
      <div key={key}>
        {element.actionId ? 'outcomes.' + element.actionId + '.' + element.actionType + '="' + element.defaultValue + '"':
        'content.' + element.itemId + '.Text="' + element.defaultValue + '"'}
      </div>
    ));
    const contentResultForCopy = descriptorInputArray.map(
      element =>
        'content.' + element.itemId + '.Text="' + element.defaultValue + '"'
    );
    this.setState({ contentResult, contentResultForCopy: contentResultForCopy.join('\n') });
  }

  copyResult() {
    navigator.clipboard.writeText(this.state.contentResultForCopy);
  }

  render() {
    return (
      <div>
        <textarea
          placeholder='Insert your outcomes/content descriptor items here, Separated by a comma (without [])'
          onChange={e => {
            this.setState({ descriptorInput: e.target.value });
          }}
        />
        <button onClick={() => this.convert()}>Convert</button>
        <h1>Result:</h1>
        <button class="copy-btn" onClick={() => this.copyResult()}>Copy Result</button>
        <div className='result-block'>{this.state.contentResult}</div>
      </div>
    );
  }
}

export default App;
