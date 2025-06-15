import React from 'react'
import '../App.css';

const ScrollingText = () => {
  return (
    <div className='' id="scroller">
        <div id="scroller-in">
            <h4>Space Exploration .</h4>
            <h4>AI Research.</h4>
            <h4>Climate Solutions.</h4>
            <h4>Quantum Physics.</h4>
            <h4>Neuroscience Events.</h4>
        </div>
        <div id="scroller-in">
            <h4>Space Exploration.</h4>
            <h4>AI Research</h4>
            <h4>Climate Solutions</h4>
            <h4>Quantum Physics</h4>
            <h4>Neuroscience Events</h4>
        </div>
    </div>
  )
}

export default ScrollingText