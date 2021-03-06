/**
 * @name Autofocus Ng
 * @category Legacy Angular Components
 * @description Sets focus to the element if the condition is true. Supports standard input elements as well as Select.
 * @example-file ./autofocus-ng.examples.html
 */
import angular from 'angular';

const angularModule = angular.module('Ring.autofocus', []);
const RING_SELECT_SELECTOR = '.ring-select';
const RING_SELECT_BUTTON_SELECTOR = `${RING_SELECT_SELECTOR} .ring-button`;
const RING_SELECT = 'rg-select';

angularModule.directive('rgAutofocus', function rgAutofocusDirective() {

  /**
   * Focuses on element itself if it has "focus" method.
   * Searches and focuses on select's button or input if element is rg-select
   * @param element
   */
  function focusOnElement(element) {
    if (!element) {
      return;
    }

    if (element.hasAttribute(RING_SELECT) || element.tagName.toLowerCase() === RING_SELECT) {
      focusOnElement(
        element.querySelector(RING_SELECT_BUTTON_SELECTOR) ||
        element.querySelector(RING_SELECT_SELECTOR)
      );
    }

    if (element.focus) {
      element.focus();
    }
  }

  return (scope, iElement, iAttrs) => {
    const element = iElement[0];
    scope.$watch(iAttrs.rgAutofocus, newValue => {
      if (newValue) {
        scope.$evalAsync(() => focusOnElement(element));
      }
    });
  };
});

export default angularModule.name;
