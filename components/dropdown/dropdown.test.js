import 'dom4';
import React from 'react';
import {findDOMNode} from 'react-dom';
import {renderIntoDocument, isCompositeComponentWithType, Simulate} from 'react-addons-test-utils';

import Dropdown from './dropdown';
import Popup from '../popup/popup';

describe('Dropdown', () => {
  let anchor;
  let popup;
  let renderComponent;

  beforeEach(() => {
    const anchorElement = (
      <span
        ref={el => {
          anchor = el;
        }}
      />
    );
    const popupElement = (
      <Popup
        ref={el => {
          popup = el;
        }}
      />
    );

    renderComponent = (props, children = popupElement) => renderIntoDocument(
      <Dropdown
        anchor={anchorElement}
        {...props}
      >
        {children}
      </Dropdown>
    );
  });

  it('should create component', () => {
    isCompositeComponentWithType(renderComponent(), Dropdown).should.be.true;
  });

  it('should wrap children with div', () => {
    findDOMNode(renderComponent()).should.match('div');
  });

  it('should use passed className', () => {
    findDOMNode(renderComponent({className: 'test-class'})).should.match('.test-class');
  });

  it('should not show popup by default', () => {
    renderComponent();
    popup.isVisible().should.be.false;
  });

  it('should show popup on anchor click', () => {
    renderComponent();
    Simulate.click(anchor);
    popup.isVisible().should.be.true;
  });

  it('should hide popup on second anchor click', () => {
    renderComponent();
    Simulate.click(anchor);
    Simulate.click(anchor);
    popup.isVisible().should.be.false;
  });

  it('should hide popup on outside click', done => {
    renderComponent();
    Simulate.click(anchor);
    setTimeout(() => {
      document.dispatchEvent(new Event('click'));
      popup.isVisible().should.be.false;
      done();
    }, 0);
  });

  it('should show popup when inited with initShown=true', () => {
    renderComponent({initShown: true});
    popup.isVisible().should.be.true;
  });
});