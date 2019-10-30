import React from 'react';
import './App.css';

import {shuffleArray} from './helpers'

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
    this.generateNewArray(this.state.length);

  }

  /*
  * @param {int} length
  * Button Functionality - Create an array of values and update state according to
  * currently set length
  */
  generateNewArray(length){

    let values = [];

    for (var i = 0; i < length; i++){
      values.push(i);
    }    

    this.setState({
      values: shuffleArray(values)
    });

  }

  render(){

    let renderedGraph = this.state.values.map( barValue => { 
      
      //Max height - min height / length of array for scaled values
      let multiplier = 450 / (this.state.length);
      
      // Add the minimum height to the chart and multiply bar value by
      // multiplier
      let heightValue = (multiplier * barValue) + 50 

      return(
        <Bar 
          height={heightValue}
          value={barValue}
        />
    )})

    return (
      <div className="App">
        <header className="App-header">
          Visual Sort
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
