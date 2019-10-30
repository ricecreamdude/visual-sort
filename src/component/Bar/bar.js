import React from 'react'

import './bar.css';

function Bar(props){

  let styles = {
    bar: {
      height: props.height,
      borderLeft: '10px solid black',
      marginRight:'10px',
      float: 'left'
    }
  }

  return(
    <div style={styles.bar} className={props.status}></div>
  )
}


export default Bar;