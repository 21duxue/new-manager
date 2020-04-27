import React, { Component } from 'react';
import { Row, Col, message } from 'antd';
import GGEditor, { Flow } from 'gg-editor';
import EditorMinimap from '../../../components/EditorMinimap';
import { FlowContextMenu } from '../../../components/EditorContextMenu';
import { FlowToolbar } from '../../../components/EditorToolbar';
import { FlowItemPanel } from '../../../components/EditorItemPanel';
import { FlowDetailPanel } from '../../../components/EditorDetailPanel';
import styles from './index.less';
import {getSidebarList, createLog, deleteLog, UpdateLog, getLog, getLogDetail} from '../server';

const data = {
    nodes: [
      {
        type: "node",
        size: "72*72",
        shape: "flow-circle",
        color: "#FA8C16",
        label: "Start",
        x: 465.0124816894531,
        y: 106,
        id: "a07f3b2c"
      },
      {
        type: "node",
        size: "80*48",
        shape: "flow-circle",
        color: "#FA8C16",
        label: "Start",
        x: 292.0124816894531,
        y: -27.400001525878906,
        id: "d3890ff5"
      },
    ],
    edges: [
    ],
  };

class FlowDemo extends Component {
    constructor(){
        super();
        this.state = {
            linkData: {
                nodes: [],
                edges: []
              },
        }
    }

    componentDidMount(){
        let location = this.props.history.location
        let id = location.pathname.split("w/")[1]
        let {linkData}=this.state
        this.getDetail(id)
    }

    getDetail = (id) =>{
        getLogDetail(id).then(res=>{
            let data = res.data
            if(data.code == 200&&data.data.length>0){
                let {linkData}=data.data[0]
                this.setState({
                    linkData:JSON.parse(linkData)
                })
            }
        })
    }

    UpdateChain = (id,linkData) =>{
        UpdateLog(id,linkData).then(res=>{
            let data = res.data
            if(data.code == 200){
                message.success(data.msg)
            }
        })
    }

    onAfterChange=(data)=>{
        let {action} = data
        if (action == "changeData")
        return 
        let {item}=data
        let {itemMap}=item
        let {_nodes, _edges}=itemMap
        if(itemMap){
            let nodes = _nodes.map((item,index)=>{
                return item.model
            })
            let edges = _edges.map((item,index)=>{
                return item.model
            })
            let linkData = {
                nodes,
                edges
            }
            this.UpdateChain(this.props.history.location.pathname.split("w/")[1],{linkData:JSON.stringify(linkData)})
        }
    }
    render() {
        let {linkData}=this.state
        return (
            <div>
                <GGEditor className={styles.editor} className='editor'>
                    <Row type="flex" className={styles.editorHd}>
                        <Col span={24}>
                        <FlowToolbar />
                        </Col>
                    </Row>
                    <Row type="flex" className={styles.editorBd}>
                        <Col span={4} className={styles.editorSidebar}>
                        <FlowItemPanel />
                        </Col>
                        <Col span={16} className={styles.editorContent}>
                        <Flow className={styles.flow}
                        data= {this.state.linkData} 
                        onAfterChange={this.onAfterChange}
                        />
                        </Col>
                        <Col span={4} className={styles.editorSidebar}>
                        <FlowDetailPanel />
                        <EditorMinimap />
                        </Col>
                    </Row>
                    <FlowContextMenu />
                </GGEditor>
            </div>
        );
    }
}

export default FlowDemo;
