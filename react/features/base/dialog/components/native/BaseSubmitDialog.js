// @flow

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { StyleType } from '../../../styles';

import BaseDialog, { type Props as BaseProps } from './BaseDialog';
import {
    brandedDialog as styles,
    brandedDialog
} from './styles';
import { Icon } from '../../../icons/components';
import { IconClose } from '../../../icons/svg';
import { CustomSubmitDialog } from './index';

type Props = BaseProps & {

    /**
     * The color-schemed stylesheet of the feature.
     */
    _dialogStyles: StyleType,

    t: Function
}

/**
 * Abstract dialog to submit something. E.g. a confirmation or a form.
 */
class BaseSubmitDialog<P: Props, S: *> extends BaseDialog<P, S> {
    /**
     * Returns the title key of the submit button.
     *
     * NOTE: Please do not change this, this should be consistent accross the
     * application. This method is here to be able to be overriden ONLY by the
     * {@code ConfirmDialog}.
     *
     * @returns {string}
     */
    _getSubmitButtonKey() {
        return this.props.okKey || 'dialog.Ok';
    }

    /**
     * Renders additional buttons, if any - may be overwritten by children.
     *
     * @returns {?ReactElement}
     */
    _renderAdditionalButtons() {
        return null;
    }

    /**
     * Implements {@code BaseDialog._renderContent}.
     *
     * @inheritdoc
     */
    _renderContent() {
        const { _dialogStyles, t } = this.props;
        const additionalButtons = this._renderAdditionalButtons();

        return (
            <View>
                <View style = { brandedDialog.mainWrapper }>
                    { this._renderSubmittable() }
                </View>
                <View style = { brandedDialog.buttonWrapper }>
                    { additionalButtons }
                    <TouchableOpacity
                        onPress = { this._onCancel }
                        style = { [
                            _dialogStyles.buttonCustom,
                            brandedDialog.buttonFarLeft
                        ] }
                    >
                        <Text style = { _dialogStyles.buttonLabelCustomRight }>
                            Cancel
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        disabled = { this.props.okDisabled }
                        onPress = { this._onSubmit }
                        style = { [
                            _dialogStyles.buttonCustom,
                            additionalButtons
                                ? null : brandedDialog.buttonFarLeft,
                            brandedDialog.buttonFarRight
                        ] }>

                        <Text style = { _dialogStyles.buttonLabelCustomLeft }>
                            {/*{ t(this._getSubmitButtonKey()) }*/}
                            Start recording
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    _onCancel: () => void;

    _onSubmit: () => boolean;

    _renderHTML: string => Object | string

    /**
     * Renders the actual content of the dialog defining what is about to be
     * submitted. E.g. a simple confirmation (text, properly wrapped) or a
     * complex form.
     *
     * @returns {Object}
     */
    _renderSubmittable: () => Object
}

export default BaseSubmitDialog;
