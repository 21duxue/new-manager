import React from 'react'
import CustomMenu from "../CustomMenu/index";

const menus = [
  {
    title: '首页',
    icon: 'home',
    key: '/home'
  },
  {
    title: '文章模块',
    icon: 'book',
    key: '/article',
  },
  {
    title: '成长模块',
    icon: 'eye',
    key: '/grow',
  },
  {
    title: '留言板模块',
    icon: 'laptop',
    key: '/message',
  },
  {
    title: '学习模块',
    icon: 'edit',
    key: '/chain',
  },
  // {
  //   title: '基本组件',
  //   icon: 'laptop',
  //   key: '/home/general',
  //   subs: [
  //     {key: '/home/general/button', title: '按钮', icon: '',},
  //     {key: '/home/general/icon', title: '图标', icon: '',},
  //   ]
  // },
  // {
  //   title: '输入组件',
  //   icon: 'edit',
  //   key: '/home/entry',
  //   subs: [
  //     {
  //       key: '/home/entry/form',
  //       title: '表单',
  //       icon: '',
  //       subs: [
  //         {key: '/home/entry/form/basic-form', title: '基础表单', icon: ''},
  //         {key: '/home/entry/form/step-form', title: '分步表单', icon: ''}
  //       ]
  //     },
  //     {key: '/home/entry/upload', title: '上传', icon: ''},
  //   ]
  // },
  {
    title: '其它',
    icon: 'bulb',
    key: '/home/other',
    subs:[
      {key: '/home/other/animation', title: '动画', icon: '',},
      {key: '/home/other/gallery', title: '画廊', icon: '',},
      {key:'/home/other/draft',title:'富文本',icon:''},
      {key:'/home/other/chart',title:'图表',icon:''},
      {key:'/home/other/loading',title:'加载动画',icon:''},
      {key:'/home/other/404',title:'404',icon:''},
      {key:'/home/other/springText',title:'弹性文字',icon:''},
    ]
  },
  {
    title: '关于',
    icon: 'info-circle-o',
    key: '/home/about'
  }
]


class SiderNav extends React.Component {
  render() {

    return (
      <div style={{height: '100vh',overflowY:'scroll'}}>
        <div style={styles.logo}>
        </div>
        <CustomMenu menus={menus}/>
      </div>
    )
  }
}

const styles = {
  logo: {
    height: '32px',
    margin: '16px',
    backgroundImage:"url('http://localhost:3001/upload/logo/logo3.png')",
    backgroundSize: "160px 32px"
  }
}

export default SiderNav