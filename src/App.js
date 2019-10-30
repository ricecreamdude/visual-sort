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



  //Found code for this here:
  //https://stackoverflow.com/questions/40328932/javascript-es6-promise-for-loop/40329190
  //Section 4

  //Create a recursive loop that console logs the value of each array element, one after another.
  scanArray = async () => {
    let bars = [...this.state.values];
    

    for (let i = 0; i < bars.length; i++){
      
      bars[i].status = 'active';
      this.setState({bars});

      await new Promise( (resolve) => {
        
        setTimeout( () => {
          resolve();
          bars[i].status = 'normal';  
          this.setState({bars});   
        },50);

        
      })
    }

    //Our next function needs to go into the state of the application and make sure only a single
    //'active' status exists during its scroll up
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
          <button onClick={this.scanArray}>Run Loop</button>
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
