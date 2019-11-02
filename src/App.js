import React from 'react';
import './App.css';


//UI Layout comes from https://codepen.io/pen/?&editable=true&editors=001;
import _ from 'underscore';

import Bar from './component/Bar/bar';

import { Layout, Button, Menu, Icon } from "antd";

const { SubMenu } = Menu;
const { Header, Footer, Content, Sider } = Layout;



class App extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      values: [],
      length: 20,
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
    
    //Prevent multiple scans from occuring
    if(this.state.scanning){
      return
    }
 
    this.setState({scanning: true});
    
    let bars = [...this.state.values];
    let sorted = false;

    while(!sorted){

      //Sorted flag
      sorted = true;

      //Iterate through each bar stored in state
      for (let i = 0; i < bars.length -1; i++){

        //Begin operations on array value
        bars[i].status = 'active';
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

            //Default, no actions taken algorithm
            bars[i].status = 'normal';
            bars[i + 1].status = 'normal';

            this.setState({bars});   
            resolve();
            
  
          },10);
  
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


  onCollapse = collapsed => {
    this.setState( {collapsed} );
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
      <Layout className="App">
        <Sider style={{height: '100vh'}} collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}> 
          
          <div className="sidebarTitle"></div>
          
          <Menu theme="dark" defaultSelectedKeys={['1']} mode='inline'>
            <Menu.Item key="1">
              <Icon type="pie-chart" />
              <span>Bubble Sort</span>
            </Menu.Item>

            <Button
              onClick={this.scanArray}
            > 
              <Icon type="play-circle" />
            Run Loop</Button>

            <Button
                  onClick={this.generateNewArray}
                > 
                <Icon type="bar-chart" />
                New Array
                </Button>

          </Menu>
        </Sider>
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
