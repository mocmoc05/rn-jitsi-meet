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

    openSignLanguageList() {
        return (
            <View accessibilityRole = 'toolbar'
                  pointerEvents = 'box-none'
                  style = {{ position: 'absolute', bottom: 400, left: 70, padding: 10, backgroundColor: 'rgba(0, 0, 0, 0.4)' }}>
                <Text>Hello</Text>
            </View>
        );
    }

    _isToggled() {
        return this.props._isOpen;
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
