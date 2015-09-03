import React, { Component } from 'react';
import Triangle from './Triangle';
import {getSizes} from '../helpers/Metrics';

import Cell from './Cell';
import {
  CHILD_LEFT,
  CHILD_RIGHT,
  CHILD_BELOW,
  CHILD_ABOVE,
  NE,
  SW
} from '../constants/BlenderLayoutConstants';



export default class Pane extends Component {
  constructor(props, context) {
    super(props, context);
  }

  renderGroup() {
    const {pane, layout, sizes, actions} = this.props;
    const children = pane.childIds.map(id => layout.panes.get(id));
    const kids = child => {
      const {contentWidth, contentHeight} = sizes;
      let childSizes = getSizes({layout, pane: child}, contentWidth, contentHeight);
      return <Pane layout={layout} pane={child} key={child.id} sizes={childSizes} actions={actions} />;
    };
    return (
      <Cell layout={layout} pane={pane} sizes={sizes} actions={actions}>
        {children.map(kids)}
      </Cell>
    );
  }


  renderSingle() {
    const {pane, layout, sizes, actions} = this.props;

    return (
      <Cell layout={layout} pane={pane} sizes={sizes} actions={actions}>
        <div style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,200,0,0)',
          position: 'absolute',
          top: 0,
          display: layout.displayBlock ? 'block' : 'none'
        }}></div>
        <Triangle
          corner={SW}
          color='#444'
          size={40}
          sizes={sizes}
          layout={layout}
          pane={pane}
          actions={actions}
        />
        <Triangle
          corner={NE}
          color='#444'
          size={40}
          sizes={sizes}
          layout={layout}
          pane={pane}
          actions={actions}
        />
        <iframe src="index2.html" frameBorder={'0'} style={{
          width: '100%',
          height: '100%'
        }}>
        </iframe>
      </Cell>
    );
    //{pane.id} {pane.splitRatio} {sizes.contentWidth} {sizes.width}
  }


  render() {
    const {pane, sizes} = this.props;

    if (pane.childIds.size > 1) {
      return this.renderGroup();
    } else {
      return this.renderSingle();
    }
  }
}
