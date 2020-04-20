import React from 'react';
import { Divider } from 'antd';
import { Toolbar } from 'gg-editor';
import ToolbarButton from './ToolbarButton';
import styles from './index.less';

const FlowToolbar = () => {
  return (
    <Toolbar className={styles.toolbar}>
      <ToolbarButton command="undo" text="后退" />
      <ToolbarButton command="redo" text="前进" />
      <Divider type="vertical" />
      <ToolbarButton command="copy" />
      <ToolbarButton command="paste" />
      <ToolbarButton command="delete" />
      <Divider type="vertical" />
      <ToolbarButton command="zoomIn" icon="zoom-in" text="放大" />
      <ToolbarButton command="zoomOut" icon="zoom-out" text="缩小" />
      <ToolbarButton command="autoZoom" icon="fit-map" text="Fit Map" />
      <ToolbarButton command="resetZoom" icon="actual-size" text="Actual Size" />
      <Divider type="vertical" />
      {/* <ToolbarButton command="toBack" icon="to-back" text="To Back" />
      <ToolbarButton command="toFront" icon="to-front" text="To Front" /> */}
      <Divider type="vertical" />
      {/* <ToolbarButton command="multiSelect" icon="multi-select" text="Multi Select" />
      <ToolbarButton command="addGroup" icon="group" text="Add Group" />
      <ToolbarButton command="unGroup" icon="ungroup" text="Ungroup" /> */}
    </Toolbar>
  );
};

export default FlowToolbar;
