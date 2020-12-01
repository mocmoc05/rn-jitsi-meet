// @flow

import { ColorSchemeRegistry } from '../../../base/color-scheme';
import { hideDialog, isDialogOpen, openDialog } from '../../../base/dialog';
import { translate } from '../../../base/i18n';
import { IconRaisedHand } from '../../../base/icons';
import { connect } from '../../../base/redux';
import { AbstractButton, type AbstractButtonProps } from '../../../base/toolbox/components';

import SignLanguage_ from './SignLanguage';
import { Text, View } from 'react-native';
import React from "react";

/**
 * The type of the React {@code Component} props of {@link OverflowMenuButton}.
 */
type Props = AbstractButtonProps & {

    /**
     * The redux {@code dispatch} function.
     */
    dispatch: Function
};

let SignLanguageButton_
/**
 * An implementation of a button for showing the {@code OverflowMenu}.
 */
class SignLanguageButton extends AbstractButton<Props, *> {
    accessibilityLabel = 'toolbar.accessibilityLabel.moreActions';
    icon = IconRaisedHand;
    toggledIcon = IconRaisedHand;
    label = 'toolbar.raiseYourHand';
    /**
     * Handles clicking / pressing this {@code OverflowMenuButton}.
     *
     * @protected
     * @returns {void}
     */
    _handleClick() {
        // if (this.props._isOpen) {
        //     this.props.dispatch(hideDialog(SignLanguage_));
        // } else {
        //     this.props.dispatch(openDialog(SignLanguage_));
        // }
        this.props.onSignLanguageClick();
    }

    _isToggled() {
        return this.props._isOpen;
    }

    _getIcon() {
        return (
            this.props.icon ? this.props.icon : this.toggledIcon
        ) || this.icon;
    }

    _onClick() {
        this._handleClick();
    }
}

function _mapStateToProps(state) {
    return {
        _styles: ColorSchemeRegistry.get(state, 'Toolbox'),
        _bottomSheetStyles: ColorSchemeRegistry.get(state, 'BottomSheet'),
        _isOpen: isDialogOpen(state, SignLanguage_)
    };
}

SignLanguageButton_ = translate(connect(_mapStateToProps)(SignLanguageButton));

export default SignLanguageButton_;
