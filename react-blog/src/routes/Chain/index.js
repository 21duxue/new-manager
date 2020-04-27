import React, { Component , useState  } from 'react';
import { Table, Row, Col, Button, Input, DatePicker, Modal, Form, message, Select,} from 'antd';
import {getSidebarList, createLog, deleteLog, UpdateLog, getLogDetail} from './server';

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
      title:""
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

      handleCancel = e => {
        this.setState({
          visible: false,
          title:''
        });
      };

      handleAll = () =>{
        this.handleSubmit()
      }

      handleSubmit = () => {
        let { title} = this.state
        if( title){
          let obj = {
            name:title,
            linkData:''
          }
          createLog(obj).then(res=>{
            let data = res.data
            if(data.error_code){
              message.warning(data.msg);
            }else{
              this.handleCancel()
              console.log(data)

              this.props.history.push('/chain-flow/'+data.data[0].id)
            }
          })
        }else{
          message.warning('必须填写名称！！！');
        }
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

      handleOpen = () => ()=>{
        this.setState({visible:true})
      }

      goEdit = (id)=>() =>{
        console.log(this.props.history)
        this.props.history.push('/chain-flow/'+id)
      }

      changeTitle = (e) => {
        this.setState({
          title:e.target.value
        })
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
                    <a className="ant-dropdown-link" style={{ marginRight: 16 }} onClick={this.goEdit(re.id)} >
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
                      <Button type="primary" onClick={this.handleOpen()}>添加思维导图</Button>
                        <Search placeholder="请输入文章名称" onSearch={this.onSearch} enterButton  style={{ width: 200,marginLeft:20 }}/>
                    </Col>
                </Row>
                <Table rowSelection={rowSelection} columns={columns} dataSource={data} />;
                <Modal
                title='创建思维导图'
                visible={this.state.visible}
                onCancel={this.handleCancel}
                width="700px"
                onOk = {this.handleAll}
                >
                   <Form  name="nest-messages" >
                    <Form.Item name={['user', 'title']} label="名称" rules={[{ required: true }]} {...formItemLayout}>
                        <Input value = {this.state.title} onChange={this.changeTitle}/>
                    </Form.Item>
                    </Form>
                </Modal>
            </div>
    )}

}

export default Article;
