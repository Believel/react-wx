import React, { Component } from 'react'
import './index.scss'
export default class Rate extends Component {
  constructor(props) {
    super(props);
    this.rateConatiner = React.createRef();
  }
  state = {
    tempValue: this.props.value
  }
  componentDidMount() {
    this.mousePressed = false;
  }
  handleStart = (e) => {
    e.stopPropagation();
    if (!this.props.disabled) {
      if (e.type.indexOf('mouse')> -1) {
        this.mousePressed = true;
        document.addEventListener('mouseup', this.handleEnd);
        document.addEventListener('mousemove', this.handleMove);
        
      }
      const rect = this.rateConatiner.current.getBoundingClientRect();
      this.left = rect.left;
      this.containerWidth = rect.width;
    }
    
  }
  handleMove = (e) => {
    e.stopPropagation();
    if (!this.props.disabled && (e.type.indexOf('mouse') === -1 || this.mousePressed)) {
      this.computeTempValue(e.type.indexOf('mouse')=== -1? e.touches[0]: e)
    }
  }
  handleEnd = (e) => {
    e.stopPropagation();
    if (!this.props.disabled && (e.type.indexOf('mouse') === -1 || this.mousePressed)) {
      if (e.type.indexOf('mouse') > -1) {
        this.mousePressed = false
        document.removeEventListener('mouseup', this.handleEnd)
        document.removeEventListener('mousemove', this.handleMove)
      }
      this.computeTempValue(e.type.indexOf('mouse') > -1 ? e : e.changedTouches[0]);
      this.props.input(this.tempValue)
    }
  }
  computeTempValue = (touch) => {
    let leftAmount = Math.ceil((touch.clientX - this.left) / this.containerWidth * this.props.max)
    if (leftAmount > 0 && leftAmount <= this.props.max) {
      this.tempValue = leftAmount
    } else if (leftAmount <= 0) {
      this.tempValue = 0
    } else {
      this.tempValue = this.props.max
    }
  }
  render() {
    const {disabled, max, value} = this.props;
    return (
      <div className="rate-wrapper">
        <ul className="rate" 
          onTouchStart={this.handleStart}
          onTouchMove={this.handleMove}
          onTouchEnd={this.handleEnd}
          onMouseDown={this.handleStart}
          onMouseMove={this.handleMove}
          onMouseUp={this.handleEnd}
          ref={this.rateConatiner}
        >
          {
            Array.from(Array(max), (item, i)=>{
              return(
                <li className={i + 1 <= value? 'rate-item rate-item-active': 'rate-item'} key={i}>
                  <div className="rate-item-def"></div>
                </li>
              )
            })  
          }
        </ul>
       { disabled ? null : <p className="rate-text">非常不满意</p>} 
      </div>
    )
  }
}