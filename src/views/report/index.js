import React, { Component } from 'react';
import Box from 'components/Box/index';
import Rate from 'components/Rate/index';
import {Loading} from 'components/HOC/Loading';

import './index.scss';
import logo from '@/assets/imgs/logo.svg';
import avatar from '@/assets/imgs/avatar.jpg';
class Report extends Component {
  state = {
    value: 2
  }
  handleInput = (value) => {
    this.setState({
      value
    })
  }
  render() {
    return (
      <div className="report">
        <div className="content">
          <div className="header-container">
            <div className="company-name">
              <i></i>
              <p>极客晨星少儿编程</p>
            </div>
            <div className="title">学习报告</div>
            <div className="date">2019年11月22日</div>
          </div>
          <div className="person-info">
            <Box>
              <div className="introduction-container">
                <div className="introduction">
                  <img src={avatar} alt="" className="avatar"/>
                  <div className="con">
                    <div className="name">韦小宝</div>
                    <p><span className="one">初中一年级</span><span className="two">Jane老师</span></p>
                  </div>
                </div>
              </div>
              <div className="classroom">
                <div className="feedback-title">
                  课堂反馈
                </div>
                <div className="feedback">
                  <div className="title">
                    课堂表现
                  </div>
                  <Rate value={this.state.value} disabled={true} max={5} ></Rate>
                </div>
                <div className="feedback">
                  <div className="title">
                    作业情况
                  </div>
                  <Rate value={5} disabled={true} max={5}></Rate>
                </div>
                <div className="feedback">
                  <div className="title">
                    知识掌握
                  </div>
                  <Rate value={5} disabled={true} max={5}></Rate>
                </div>
                <div className="feedback">
                  <div className="title">
                    练习反馈
                  </div>
                  <Rate value={5} disabled={true} max={5}></Rate>
                </div>
              </div>
            </Box>
          </div>
          <div className="rate-btn">
            <Box>
              <div className="rate-content">
                <img src={logo} alt="" className="msg-icon"/>
                <p>对授课老师和班主任进行评分</p>
                <img src={logo} alt="" className="img-right"/>
              </div>
            </Box>
          </div>
          <div className="detail-report">
            <p className="tip">以下为详细报告</p>
            <Box></Box>
          </div>
        </div>
        <div className="btn">晒出宝贝本次的成绩</div>
      </div>
    )
  }
}


export default class Wraper extends React.Component {
  render() {
    let Loa = Loading(Report);
    return <Loa isLoading={false} />
  }
}
