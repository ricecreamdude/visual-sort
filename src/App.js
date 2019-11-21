import React from 'react';
import './App.css';

//UI Layout comes from https://codepen.io/pen/?&editable=true&editors=001;
import _ from 'underscore';

import BarConstructor from './component/Bar/barConstructor'

import Bar from './component/Bar/bar';
import AppSider from './component/Sider/sider'

import { Layout } from "antd";

const { Content } = Layout;

class App extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      values: [],
      length: 20,
      barWidth: 20,
      barMargin: 10,
      scanning: false,
      collapsed: false,
    }

  }

  //BAR 'OBJECT'{value, status}

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

    //Allow for interrupting sort with new array button:
    this.setState({scanning: false});

    for (var i = 0; i < length; i++)  values.push( new BarConstructor(i) )
     
    this.setState({ values: _.shuffle(values) });

  }
  //Found code for this here:
  //https://stackoverflow.com/questions/40328932/javascript-es6-promise-for-loop/40329190
  //Section 4

  //Create a recursive loop that console logs the value of each array element, one after another.
  sortArray = async () => {
    
    //Prevent multiple scans from occuring
    if(this.state.scanning) return; 
    this.setState({scanning: true});
    
    let bars = [...this.state.values];
    let len = bars.length;
    let sorted = false;

    while(!sorted){

      //Sorted flag
      sorted = true;

      //Iterate through each bar stored in state
      for (let i = 0; i < len -1; i++){

        //Begin operations on array value


        bars[i].setActive();
        this.setState({bars});

        //Or could our operations happen inside the promise?
        await new Promise( (resolve) => {
          
          //All of our code actions should happen in setTimeout
          setTimeout( () => {
            
            //Bubble Sort Algorithm
            if (bars[i].value > bars[i+1].value){
              let temp = bars[i].value
              
              bars[i].status = 'swapping';
              bars[i + 1].status = 'swapping';

              bars[i].value = bars[i + 1].value;
              bars[i + 1].value = temp;

              sorted = false;

              this.setState({bars})
              resolve();

            }

            bars[i].setNormal();

            this.setState({bars});   

            if (i === len){
              len = len - 1;
              console.log('LENGTH', len);
            }
  

            resolve();
          },2);


        })


      }


    }
    
    this.setState({scanning: false})

  }

  //Our next function needs to go into the state of the application and make sure only a single
  //'active' status exists during its scroll up

  // bubbleSort = () => {

  //   let sorted = false;
  //   let values = [...this.state.values]

  //   while (!sorted) {
  //     sorted = true;
  //     for(var i=0; i < values.length - 1; i++) {
  //       if(values[i].value > values[i+1].value) {
  //         let temp = values[i].value;

  //         values[i].value = values[i+1].value;
  //         values[i+1].value = temp;
          
  //         sorted = false;
          
  //         this.setState({values:values})
  //       }

  //     }
  //   }

  // }


  /*  Pass to sider in order to update length
      Value of slider on sider.js is passed to this function automatically   
  */
  handleSliderChange = (length) => {
    this.setState({length}) 

    this.calculateBarWidth();

    this.generateNewArray();
  
  }

  calculateBarWidth = () => {

    let barWidth,
        barMargin;

    let minViewWidth = 600; // actual min width is 650px but we are giving the app a buffer

    let maxBarWidth = 40;  // Anything larger than this looks strange
    let minBarWidth = 5;   // Anything smaller is hard to see

    let testWidth  = minViewWidth / this.state.length / 2 

    if (testWidth > maxBarWidth) testWidth = 40; 
    if (testWidth < minBarWidth) testWidth = 5;

    barWidth = testWidth;

    barMargin = Math.max(barWidth * 0.25, 5);
    if (barMargin < 5) barMargin = 5;


    this.setState({barWidth, barMargin})

  }

  calculateBarMargin = () => {



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
          barWidth={this.state.barWidth}
          barMargin={this.state.barMargin}
        />
    )})

    return (
      <Layout className="App">

        <AppSider 
          generateNewArray={this.generateNewArray}
          sortArray={this.sortArray}
          handleSliderChange={this.handleSliderChange}
          chartLength={this.state.length}
        />
      
        <Layout>
          <Content>
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
          </Content>
        </Layout>
      </Layout>
      
    );
  }
  
}

export default App;


//TO DO:

//Improve granularity of color highlighting algorithm
//Improve runtime of bubble sort by reducing size of array to be inspected each pass
