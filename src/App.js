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

    this.onClickHandler = this.onClickHandler.bind(this);

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

  // onClickHandler(){
  //   let values = this.state.values;
  //   //use setTimeout to iterate through each array value and apply class value
  //   //of active

  //   for( let i = 0; i < values.length; i ++){
  //     const promise = new Promise((resolve, err) => {
  //       const timeout = Math.random() * 100;
  //       setTimeout( () => {
  //         console.log('INDEX', i);
  //       }, 100 * timeout)
  //     });
  //   }
  //     doSetTimeout(values[i]);
      
  //     setTimeout( () => {
  //       console.log('VALUES', values[i])      
  //     }, 100)
    

  //   function doSetTimeout(val){
  //     setTimeout( function() {
  //       console.log('VALUES: ', val);
  //     }, 5000)
  //   }

  // }


  generateNewArray(length){

    let values = [];

    for (var i = 0; i < length; i++) values.push(i);    

    this.setState({ values: shuffleArray(values) });

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
          <button onClick={this.onClickHandler}>Run Loop</button>
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
