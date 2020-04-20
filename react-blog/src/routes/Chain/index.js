import React, { Component , useState  } from 'react';
import { Table, Row, Col, Button, Input, DatePicker, Modal, Form, message, Select,} from 'antd';
import {getSidebarList, createLog, deleteLog, UpdateLog, getLog, getLogDetail} from './server';

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
      data:[],
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

      goEdit = (id)=>() =>{
        console.log(this.props.history)
        this.props.history.push('/chain-flow/'+id)
      }

    render() {
        const { selectedRowKeys , data } = this.state;
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
              title: '标题',
              dataIndex: 'name',
            },
            {
            title: '创建时间',
            dataIndex: 'createdAt',
            },
            {
                title: '操作',
                key: 'action',
                sorter: true,
                filters: [],
                onFilter: () => {},
                render: (re) => (
                  <span>
                    <a style={{ marginRight: 16 }} onClick={this.handleDelete(re)}>删除</a>
                    <a className="ant-dropdown-link" onClick={this.goEdit(re.id)} >
                      编辑
                    </a>
                  </span>
                ),
              },
          ];
        return (
            <div>
                <Row >
                    <Col span={24} style={{marginBottom:"15px",textAlign:"center"}}>
                        <Search placeholder="请输入文章名称" onSearch={this.onSearch} enterButton  style={{ width: 200,marginLeft:20 }}/>
                    </Col>
                </Row>
                <Table rowSelection={rowSelection} columns={columns} dataSource={data} />;
                
            </div>
    )}

}

export default Article;
