import React from 'react';

import { Layout, Button, Menu, Icon, Slider } from "antd";

const { Sider } = Layout;

//Using the convention app to denote that this imported sider is not part
//of Ant D

class AppSider extends React.Component{

  render(){
    return(
      <Sider style={{height: '100vh'}} > 
            
        <div className="sidebarTitle"></div>
        
        <Menu theme="dark" defaultSelectedKeys={['1']} mode='inline'>
          <Menu.Item key="1">
            <Icon type="pie-chart" />
            <span>Bubble Sort</span>
          </Menu.Item>
          <div>
            
            <Slider 
              max={50} 
              defaultValue={this.props.chartLength}
              onChange={this.props.handleSliderChange}  
            />
          </div>

          <Button onClick={this.props.sortArray}> 
            <Icon type="play-circle" />
            Run Loop
          </Button>
          <Button onClick={this.props.generateNewArray}> 
            <Icon type="bar-chart" />
            New Array
          </Button>

        </Menu>
      </Sider>
    )
  }

}

export default AppSider