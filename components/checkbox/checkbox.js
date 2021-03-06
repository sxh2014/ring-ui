import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {CheckIcon} from '../icon';

import './checkbox.scss';

/**
 * @name Checkbox
 * @category Components
 * @constructor
 * @extends {ReactComponent}
 * @example-file ./checkbox.examples.html
 */
export default class Checkbox extends PureComponent {

  static propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    className: PropTypes.string,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    onChange: PropTypes.func
  };

  state = {
    checked: this.props.checked,
    disabled: this.props.disabled
  };

  componentWillReceiveProps({checked, disabled}) {
    if (checked !== undefined) {
      this.setState({checked});
    }

    if (disabled !== undefined) {
      this.setState({disabled});
    }
  }

  inputChange = e => {
    const newValue = e.target.checked;

    this.setState({
      checked: newValue
    }, () => {
      if (this.props.onChange) {
        this.props.onChange(newValue);
      }
    });
  };

  inputRef = el => {
    this.input = el;
  };

  render() {
    const {label, ...restProps} = this.props;
    const {checked, disabled} = this.state;

    const classes = classNames(
      'ring-checkbox__input',
      this.props.className
    );

    return (
      <label
        className="ring-checkbox"
        data-test="ring-checkbox"
      >
        <span className="ring-checkbox__input-wrapper">
          <input
            {...restProps}
            ref={this.inputRef}
            disabled={disabled}
            onChange={this.inputChange}
            type="checkbox"
            className={classes}
            checked={Boolean(checked)}
          />
          <span className="ring-checkbox__icon">
            {checked &&
            (
              <CheckIcon
                className="ring-checkbox__icon__image"
                color="black"
                size={CheckIcon.Size.Size18}
              />
            )}
          </span>
        </span>
        <span className="ring-checkbox__label">{label}</span>
      </label>
    );
  }
}
