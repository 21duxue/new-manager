import React, { Component , useState  } from 'react';
import { Table, Row, Col, Button, Input, DatePicker, Modal, Form, message} from 'antd';
import Icon from 'bee-icon';
import 'bee-icon/build/Icon.css';
import Upload from 'bee-upload';
import 'bee-upload/build/Upload.css';
import {getSidebarList, createLog, deleteLog, UpdateLog, getLog, getLogDetail} from './server';

const { Search } = Input;
const { RangePicker } = DatePicker;
const Dragger = Upload.Dragger;



  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 18 },
  };
  



class GrowLog extends Component {

  constructor(){
    super()
    this.state = {
      selectedRowKeys: [], 
      visible: false,
      imgUrl:'',
      title:'',
      articleUrl:'',
      data:[],
      isEdit:false
    };
  }
   

      onSelectChange = selectedRowKeys => {
        this.setState({ selectedRowKeys });
      };

      showModal = (isEdit,re) =>() => {
        if(isEdit){
          this.setState({Gid:re.id})
        }
        this.setState({
          visible: true,
          isEdit
        });
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
        this.handleDetail()
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
    
      handleOk = e => {
        this.setState({
          visible: false,
        });
      };

      handleCancel = e => {
        this.setState({
          visible: false,
          imgUrl:'',
          articleUrl:'', 
          title:''
        });
      };

      handleAll = () =>{
        let {isEdit,Gid}=this.state
        if(isEdit){

          this.handleUpdate(Gid)()
        }else{
          this.handleSubmit()
        }
      }

      handleSubmit = () => {
        let {imgUrl, articleUrl, title} = this.state
        if(imgUrl && articleUrl && title){
          let obj = {
            img:imgUrl,
            title:title,
            content:articleUrl
          }
          createLog(obj).then(res=>{
            let data = res.data
            if(data.error_code){
              message.warning(data.msg);
            }else{
              this.handleCancel()
              let newData = this.state.data
              newData.push(data.data)
              this.setState({
                data:newData
              })
            }
          })
        }else{
          message.warning('三项不可缺一');
        }
      }

      onChangeImg = (info)=> {
        if (info.file.status !== 'uploading') {
          let res = info.fileList[0].response
          this.setState({imgUrl:res.url})
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

      handleDetail = () =>{
        getLog(12).then(res=>{
          let data = res.data
          console.log(data)
        })
      }

      handleUpdate = (re) =>() =>{
        let {imgUrl, articleUrl, title} = this.state
        if(imgUrl && articleUrl && title){
          let obj = {
            img:imgUrl,
            title:title,
            content:articleUrl,
          }
          UpdateLog(re,obj).then(res=>{
            let data = res.data
            if(data.error_code){
              message.warning(data.msg);
            }else{
              this.handleCancel()
              this.getList()
            }
          })
        }else{
          message.warning('三项不可缺一');
        }
      }

      changeTitle = (e) => {
        this.setState({
          title:e.target.value
        })
      }

      onChangeAticle = (info)=> {
        if (info.file.status !== 'uploading') {
          let res = info.fileList[0].response
          this.setState({articleUrl:res.url})
        }
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
              title: '标题',
              dataIndex: 'title',
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
            title: '时间',
            dataIndex: 'time',
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
                    <a className="ant-dropdown-link" onClick={this.showModal(true,re)}>
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
                        日期范围：<RangePicker />
                        <Search placeholder="请输入日记名称" onSearch={this.onSearch} enterButton  style={{ width: 200,marginLeft:20 }}/>
                    </Col>
                    <Col span={24} style={{marginBottom:"15px"}}>
                      <Button type="primary" onClick={this.showModal(false)}>添加日记</Button>
                    </Col>
                </Row>
                <Table rowSelection={rowSelection} columns={columns} dataSource={data} />;
                <Modal
                title={isEdit?'编辑日记':'添加日记'}
                visible={this.state.visible}
                onCancel={this.handleCancel}
                width="700px"
                onOk = {this.handleAll}
                >
                   <Form  name="nest-messages" >
                    <Form.Item name={['user', 'title']} label="日记标题" rules={[{ required: true }]} {...formItemLayout}>
                        <Input value = {this.state.title} onChange={this.changeTitle}/>
                    </Form.Item>
                    <Form.Item name={['user', 'img']} label="添加图片"  {...formItemLayout}>
                    <Upload action='/api/v1/upload' onChange = {this.onChangeImg}>
                        <Button type="primary" shape="border">
                        <Icon type="uf-upload" /> 点击上传
                        </Button>
                    </Upload>
                    </Form.Item>

                    <Form.Item name={['user', 'content']} label="添加内容" {...formItemLayout}>
                        <div style={{ marginTop: 16, height: 180 }}>
                            <Dragger 
                            action='/api/v1/upload' 
                            name='file' 
                            multiple= 'true' 
                            showUploadList= 'false' 
                            onChange = {this.onChangeAticle}>
                            <p className="u-upload-drag-icon">
                                <Icon type="inbox" className="uf-upload" />
                            </p>
                            <p className="u-upload-text">把文件拖入指定区域，完成上传，同样支持点击上传。</p>
                            </Dragger>
                        </div>
                    </Form.Item>
                    </Form>
                </Modal>
            </div>
    )}

}

export default GrowLog;
