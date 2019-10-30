import React from 'react';
import './App.css';

import _ from 'underscore';

import Bar from './component/Bar/bar';

class App extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      values: [],
      length: 40
    }

  }

  componentDidMount(){
    //Load values with random values with this.state.length as upper bound;
    this.generateNewArray();

  }

  //Create a recursive loop that console logs the value of each array element, one after another.
  onClickHandler = async () => {
    let bars = [...this.state.values];
    for (let i = 0; i < bars.length; i++){
      await new Promise( (resolve) => {
        
        setTimeout( () => {
          resolve();
        },50);

        bars[i].status = 'active';  
        this.setState({bars});
        
      })
    }

    //Found code for this here:
    //https://stackoverflow.com/questions/40328932/javascript-es6-promise-for-loop/40329190
    //Section 4
  }

  /*
  * @param {int} length
  * Button Functionality - Create an array of values and update state according to
  * currently set length
  */
  generateNewArray = () => {

    let values = [];
    let length = this.state.length;
    for (var i = 0; i < length; i++) {
      let newBar = {
        value: i,
        status: 'normal'
      }
      values.push(newBar)
    };    

    this.setState({ values: _.shuffle(values) });

  }
  
  render(){

    let renderedGraph = this.state.values.map( bar => { 
      
      //Max height - min height / length of array for scaled values
      let multiplier = 450 / (this.state.length);
      
      // Add the minimum height to the chart and multiply bar value by
      // multiplier
      let heightValue = (multiplier * bar.value) + 50 

      return(
        <Bar 
          height={heightValue}
          value={bar.value}
          status={bar.status}
        />
    )})

    return (
      <div className="App">
        <header className="App-header">
          Visual Sort
          <button onClick={this.onClickHandler}>Run Loop</button>
          <button onClick={this.generateNewArray}>New Array</button>
        </header>
        <main id="contentWrapper">
          <div id="graphDiv">
            {renderedGraph}
          </div>
        </main>

      </div>
    );
  }
  
}

export default App;
