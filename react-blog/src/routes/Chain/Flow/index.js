import React, { Component } from 'react';
import { Row, Col } from 'antd';
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
        console.log(id)
    }

    UpdateChain = (id,linkData) =>{
        UpdateLog(id,linkData).then(res=>{
            let data = res.data
            console.log(data)
        })
    }

    onAfterChange=(data)=>{
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
            console.log(linkData)
            console.log(typeof(JSON.stringify(linkData)))
            this.setState({linkData})
            this.UpdateChain(this.props.history.location.pathname.split("w/")[1],{linkData:JSON.stringify(linkData)})
        }
    }
    render() {
        let {linkData}=this.state
        console.log(linkData)
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
                        data= {data} 
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
