import React from 'react';
import './App.css';

import {shuffleArray} from './helpers'

import Bar from './component/Bar/bar';



class App extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      values: [],
      length: 20
    }

    this.generateNewArray = this.generateNewArray.bind(this);
    this.testClickHandler = this.testClickHandler.bind(this);

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


  testClickHandler() {
    this.generateNewArray(this.state.length);
  }



  render(){


    let graph = function(){

      this.state.values.map( value => {
        let h = value * 50;
        console.log('*********H: ',h)
        return (<Bar 
          height={h}
        />)
      })
    }
      // return (
      //   {this.state.values.map( value => {
      //     let h = value * 50;
      //     <Bar 
      //       height={h}
      //     />
      //   })}
      // )

    return (
      <div className="App">
        <header className="App-header">
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
            Learn React
        </header>
        <main
          className='graphArea'
        >

          {graph}
          {/* <Bar 
            height={100}
          />
          <Bar 
            height={100}
          /> */}
        </main>
      </div>
    );
  }
  
}

export default App;
