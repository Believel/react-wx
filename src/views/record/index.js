import React, { Component } from 'react'
import './index.scss';
import { Button , WhiteSpace, WingBlank, Modal} from 'antd-mobile';
import RecordProjectVideo from './video-record';

export default class Record extends Component {
  state = {
    record: ''
  }
  componentDidMount() {
    this.handleDrawCanvas();
    this.setState({
      record: RecordProjectVideo()
    })
  }
  handleDrawCanvas() {
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    let raf;
    let running = false;
    let ball = {
      x: 100,
      y: 100,
      vx: 5,
      vy: 1,
      radius: 25,
      color: 'blue',
      draw: function() {
        ctx.beginPath();
        // 绘制圆弧路径
        
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }
    function clear() {
      ctx.fillStyle = 'rgba(255,255,255,0.3)';
      ctx.fillRect(0,0,canvas.width,canvas.height);
    }
    // 添加速率
    function draw() {
      // 清除画布
      // ctx.clearRect(0, 0, canvas.width, canvas.height);
      clear()
      // 绘制
      ball.draw();
      ball.x += ball.vx;
      ball.y += ball.vy;
      // 边界
      if(ball.y + ball.vy > canvas.height || ball.y + ball.vy < 0) {
        ball.vy = - ball.vy;
      } 
      if(ball.x + ball.vx > canvas.width || ball.x + ball.vx < 0) {
        ball.vx = -ball.vx;
      }
      raf = window.requestAnimationFrame(draw);
    };
    canvas.addEventListener('mousemove', function(e) {
      if(!running) {
        clear();
        ball.x = e.clientX - 40;
        ball.y = e.clientY - 40;
        ball.draw();
      }
      
    })
    canvas.addEventListener('click', function(e) {
      if(!running) {
        raf = window.requestAnimationFrame(draw);
        running = true;
      }
    })
    canvas.addEventListener('mouseout', function(e) {
      window.cancelAnimationFrame(raf);
      running = false
    })
    ball.draw()
  }
  startRecord = () => {
    this.state.record.start()
  }
  endRecord = () => {
    this.state.record.stop();
  }
  render() {
    return (
      <div className="record-container">
        <canvas id="canvas" width="600" height="300"></canvas>
        <WingBlank>
          <Button onClick={this.startRecord}>开始录制视频</Button><WhiteSpace/>
          <Button onClick={this.endRecord}>结束录制视频</Button><WhiteSpace/>
        </WingBlank>
        <audio src=""></audio>
      </div>
    )
  }
}
