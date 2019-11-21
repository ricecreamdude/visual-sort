import React from 'react'

import './bar.css';

function Bar(props){

  let styles = {
    bar: {
      height: props.height,
      borderLeft: `${props.barWidth}px solid black`,
      marginRight: `${props.barMargin}px`,
      float: 'left'
    }
  }

  return(
    <div style={styles.bar} className={props.status}></div>
  )
}


export default Bar;