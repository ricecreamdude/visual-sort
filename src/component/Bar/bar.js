import React from 'react'

function Bar(props){

  let styles = {
    bar: {
      height: props.height,
      borderLeft: '5px solid black',
      marginRight:'10px',
      float: 'left'

    }
  }

  return(
    <div style={styles.bar}></div>
  )
}


export default Bar;