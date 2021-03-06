import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {sortableHandle} from 'react-sortable-hoc';

import {DragIcon, CollapseIcon, ExpandIcon} from '../icon';

import focusSensorHOC from '../global/focus-sensor-hoc';
import Checkbox from '../checkbox/checkbox';

import Cell from './cell';
import style from './table.css';

const DragHandle = sortableHandle(({alwaysShowDragHandle}) => {
  const classes = classNames(style.dragHandle, {
    [style.visibleDragHandle]: alwaysShowDragHandle
  });

  return (
    <div className={classes}>
      <DragIcon
        className={style.clear}
        size={DragIcon.Size.Size14}
      />
    </div>
  );
});

class Row extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    item: PropTypes.object.isRequired,
    columns: PropTypes.array.isRequired,
    selectable: PropTypes.bool,
    showFocus: PropTypes.bool,
    draggable: PropTypes.bool,
    alwaysShowDragHandle: PropTypes.bool,
    selected: PropTypes.bool,
    onHover: PropTypes.func,
    onSelect: PropTypes.func,
    onFocusRestore: PropTypes.func,
    level: PropTypes.number,
    collapsible: PropTypes.bool,
    collapsed: PropTypes.bool,
    onCollapse: PropTypes.func,
    onExpand: PropTypes.func
  };

  static defaultProps = {
    selectable: true,
    showFocus: false,
    draggable: false,
    alwaysShowDragHandle: false,
    selected: false,
    onHover: () => {},
    onSelect: () => {},
    onFocusRestore: () => {},
    level: 0,
    collapsible: false,
    collapsed: false,
    onCollapse: () => {},
    onExpand: () => {}
  };

  onMouseEnter = () => {
    const {item, onHover} = this.props;
    onHover(item);
  };

  onClick = e => {
    if (e.shiftKey) {
      this.toggleSelection();
    }
  };

  onCheckboxFocus = () => {
    this.props.onFocusRestore();
  };

  onCheckboxChange = () => {
    this.toggleSelection();
  };

  toggleSelection() {
    const {selectable, selected, onSelect} = this.props;
    if (selectable) {
      onSelect(!selected);
    }
  }

  rowRef = el => {
    this.row = el;
  };

  render() {
    const {
      item, columns, selectable, selected,
      showFocus, draggable, alwaysShowDragHandle, level,
      collapsible, collapsed, onCollapse, onExpand
    } = this.props;

    const classes = classNames(this.props.className, {
      [style.row]: true,
      [style.rowFocused]: showFocus,
      [style.rowSelected]: selected
    });

    const testAttrs = {
      'data-test-focused': showFocus || undefined,
      'data-test-selected': selected || undefined
    };

    const metaColumnClasses = classNames(style.metaColumn, {
      [style.metaColumnSpaced]: selectable
    });

    const SUBITEM_OFFSET = 30;
    const gap = level * SUBITEM_OFFSET;
    const metaColumnStyle = {
      paddingLeft: `${gap}px`
    };

    const metaColumn = (
      <div className={metaColumnClasses} style={metaColumnStyle}>
        {draggable &&
          <DragHandle alwaysShowDragHandle={alwaysShowDragHandle}/>
        }

        {selectable &&
          (
            <Checkbox
              className={showFocus ? 'ring-checkbox_focus' : ''}
              checked={selected}
              onFocus={this.onCheckboxFocus}
              onChange={this.onCheckboxChange}
              tabIndex="-1"
            />
          )
        }

        {collapsible && collapsed &&
          (
            <ExpandIcon
              size={ExpandIcon.Size.Size14}
              onClick={onExpand}
              style={{top: '-3px'}}
            />
          )
        }

        {collapsible && !collapsed &&
          (
            <CollapseIcon
              size={CollapseIcon.Size.Size14}
              onClick={onCollapse}
              style={{top: '-3px'}}
            />
          )
        }
      </div>
    );

    const cells = columns.map((column, index) => {
      const getValue = column.getValue || (() => item[column.id]);
      const value = getValue(item, column);
      const cellClasses = classNames({[style.cellRight]: column.rightAlign}, column.className);

      return (
        <Cell key={column.id} className={cellClasses}>
          {index === 0 && (draggable || selectable) && metaColumn}
          {value}
        </Cell>
      );
    });

    return (
      <tr
        ref={this.rowRef}
        className={classes}
        tabIndex="0"
        onMouseMove={this.onMouseEnter}
        onClick={this.onClick}
        data-test="ring-table-row"
        {...testAttrs}
      >{cells}</tr>
    );
  }
}

export default focusSensorHOC(Row);
