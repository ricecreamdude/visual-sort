import React from 'react';
import logo from './logo.svg';
import './App.css';

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

  generateNewArray(length){

    let values = [];

    for (var i = 0; i < length; i++){
      values.push(i);
    }    

    this.setState({
      values: values 
    });
    // console.log('VALUES', values);
    // console.log('STATE VALUES:', this.state.values);

  }

  testClickHandler() {
    this.generateNewArray(this.state.length);
  }



  render(){

    return (
      <div className="App">
        <header className="App-header">
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <main>
          <p>
            <button onClick={this.testClickHandler}>HI CLICK ME</button>
          </p>


        </main>
      </div>
    );
  }
  
}

export default App;
