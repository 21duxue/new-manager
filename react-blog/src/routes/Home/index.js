import React from 'react'
import { Card, Col, Row } from 'antd';
import './style.css'

import SpringText from '../Other/SpringText/index'

import {getArticleList, getMessageList , getGrowList} from './server'


class Home extends React.Component {
  constructor(){
    super()
    this.state={
      GrowLength:0,
      ArticleLength:0,
      MessageLength:0
    }
  }
  componentDidMount(){
    getGrowList().then(res=>{
      let data = res.data
      console.log(data)
      this.setState({
        GrowLength:data.count
      })
    })
    getArticleList().then(res=>{
      let data = res.data
      console.log(data)
      this.setState({
        ArticleLength:data.count
      })
    })
    getMessageList().then(res=>{
      let data = res.data
      console.log(data)
      this.setState({
        MessageLength:data.count
      })
    })
  }
  render() {
    let {MessageLength, GrowLength, ArticleLength}=this.state
    return (
      <div style={styles.bg} className='home'>
        <SpringText/>
        <div className="site-card-wrapper" style={{marginTop:400}}>
          <Row gutter={16}>
            <Col span={8}>
              <Card title="文章数" bordered={false}>
                {ArticleLength}
              </Card>
            </Col>
            <Col span={8}>
              <Card title="成长日记数" bordered={false}>
                {GrowLength}
              </Card>
            </Col>
            <Col span={8}>
              <Card title="留言数" bordered={false}>
                {MessageLength}
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

const styles = {
  bg:{
    position:'absolute',
    top:0,
    left:0,
    width:'100%',
    height:'400px'
  }
}

export default Home