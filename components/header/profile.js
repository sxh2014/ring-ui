import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Avatar, {Size} from '../avatar/avatar';
import Button from '../button/button';
import Dropdown from '../dropdown/dropdown';
import PopupMenu from '../popup-menu/popup-menu';

import styles from './header.css';

const rgItemType = PopupMenu.ListProps.Type.LINK;

export default class Profile extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    closeOnSelect: PropTypes.bool,
    hasUpdates: PropTypes.bool,
    loading: PropTypes.bool,
    onLogin: PropTypes.func,
    onLogout: PropTypes.func,
    onSwitchUser: PropTypes.func,
    profileUrl: PropTypes.string,
    renderPopupItems: PropTypes.func,
    translations: PropTypes.shape({
      profile: PropTypes.string,
      login: PropTypes.string,
      logout: PropTypes.string,
      applyChangedUser: PropTypes.string,
      switchUser: PropTypes.string
    }),
    user: PropTypes.shape({
      guest: PropTypes.bool,
      profile: PropTypes.object
    }),
    showLogIn: PropTypes.bool,
    showLogOut: PropTypes.bool,
    showSwitchUser: PropTypes.bool,
    showApplyChangedUser: PropTypes.bool,
    onRevertPostponement: PropTypes.func
  };

  static defaultProps = {
    closeOnSelect: true,
    renderPopupItems: items => items,
    translations: {}
  };

  render() {
    const {
      className,
      closeOnSelect,
      hasUpdates,
      loading,
      user,
      profileUrl,
      onLogin,
      onLogout,
      onSwitchUser,
      renderPopupItems,
      onRevertPostponement,
      showApplyChangedUser,
      showLogIn,
      showLogOut,
      showSwitchUser,
      translations,
      ...props
    } = this.props;

    if (!user) {
      return (
        <div
          {...props}
          className={classNames(styles.profileEmpty, className)}
        >
          <Avatar size={Size.Size24}/>
        </div>
      );
    }

    if (user.guest) {
      return (
        <Button
          blue
          className={classNames(styles.loginButton, className)}
          data-test="ring-header-login-button"
          disabled={loading}
          loader={loading}
          onClick={onLogin}
        >
          {translations.login || 'Log in...'}
        </Button>
      );
    }

    const anchorClassName = classNames({
      [styles.hasUpdates]: hasUpdates
    });

    const anchor = (
      <span className={anchorClassName}>
        <Avatar
          url={user.profile && user.profile.avatar && user.profile.avatar.url}
          size={Size.Size24}
        />
      </span>
    );

    const items = [
      showApplyChangedUser && {
        rgItemType,
        label: translations.applyChangedUser || 'Apply changed user',
        className: styles.profileMenuItem,
        onClick: onRevertPostponement
      },
      showLogIn && {
        rgItemType,
        label: translations.login || 'Log in',
        className: styles.profileMenuItem,
        onClick: onRevertPostponement
      },
      {
        rgItemType,
        label: translations.profile || 'Profile',
        className: styles.profileMenuItem,
        target: '_self', // Full page reload in Angular
        href: profileUrl
      },
      showSwitchUser && {
        rgItemType,
        label: translations.switchUser || 'Switch user',
        className: styles.profileMenuItem,
        onClick: onSwitchUser
      },
      showLogOut && {
        rgItemType,
        label: translations.logout || 'Log out',
        className: styles.profileMenuItem,
        onClick: onLogout
      }
    ].filter(it => !!it);

    return (
      <Dropdown
        {...props}
        title={user.name}
        anchor={anchor}
        className={classNames(styles.profile, className)}
      >
        <PopupMenu
          closeOnSelect={closeOnSelect}
          data={renderPopupItems(items)}
        />
      </Dropdown>
    );
  }
}
