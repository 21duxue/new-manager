import React, { Component , useState  } from 'react';
import { Table, Row, Col, Button, Input, message, Switch,} from 'antd';
import Icon from 'bee-icon';
import 'bee-icon/build/Icon.css';
import Upload from 'bee-upload';
import 'bee-upload/build/Upload.css';
import {getSidebarList, deleteLog, UpdateLog, getLogDetail} from './server';

const { Search } = Input;



  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 18 },
  };
  



class Article extends Component {

  constructor(){
    super()
    this.state = {
      selectedRowKeys: [], 
      visible: false,
      title:'',
      data:[],
      isCheck:false
    };
  }
   

      onSelectChange = selectedRowKeys => {
        this.setState({ selectedRowKeys });
      };

      onSearch = (v) =>{
        getLogDetail(v).then(res=>{
          let data = res.data
          if(data.code==200){
            this.setState({
              data:data.data
            })
          }
        })
      }



      componentDidMount(){
        this.getList()
      }

      getList = () =>{
        getSidebarList().then(res=>{
          let data = res.data 
          if(data.code == 200){
            this.setState({
              data:data.data
            })
          }
        })
      }


      handleDelete = (re) =>() =>{
        deleteLog(re.id).then(res=>{
          let data = res.data
          if(data.code==200){
            this.getList()
            message.success(data.msg);
          }else{
            message.warning(data.msg);
          }
        })
      }

      handleSwitch = (re,all) => () =>{
        UpdateLog(all.id,{disable:all.disable == 0 ? 1:0}).then(res=>{
            let data = res.data
            if(data.error_code){
              message.warning(data.msg);
            }else{
              this.getList()
            }
          })
      }

      onChangeSwitch = ( ) =>{
          this.setState({
              isCheck:!this.state.isCheck
          })
      }



    render() {
        const { selectedRowKeys, imgUrl, isEdit , data } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            hideDefaultSelections: true,
          };
          const columns = [
            {
              title: 'ID',
              dataIndex: 'id',
            },
            {
              title: '名称',
              dataIndex: 'name',
            },
            {
              title: '内容',
              dataIndex: 'content',
            },
            {
              title: '图片',
              dataIndex: 'img',
            },
            {
            title: '创建时间',
            dataIndex: 'createdAt',
            },
            {
                title: '是否禁用',
                dataIndex: 'disable',
                render:(rec)=>{
                    return (
                    <span>
                        <Switch  checked = {rec==0 ? false : true} />
                    </span>
                    )
                }
            },
            {
                title: '操作',
                key: 'action',
                sorter: true,
                render: (re,all) => (
                  <span>
                    <a style={{ marginRight: 16 }} onClick={this.handleDelete(re)}>删除</a>
                    <a style={{ marginRight: 16 }} onClick={this.handleSwitch(re,all)}>{all.disable==1 ? '禁用' : "启用"}</a>
                  </span>
                ),
              },
          ];
        return (
            <div>
                <Row >
                    <Col span={24} style={{marginBottom:"15px",textAlign:"center"}}>
                        <Search placeholder="请输入访客名称" onSearch={this.onSearch} enterButton  style={{ width: 200,marginLeft:20 }}/>
                    </Col>
                    <Col span={24} style={{marginBottom:"15px"}}>
                    </Col>
                </Row>
                <Table rowSelection={rowSelection} columns={columns} dataSource={data} />;
            </div>
    )}

}

export default Article;
