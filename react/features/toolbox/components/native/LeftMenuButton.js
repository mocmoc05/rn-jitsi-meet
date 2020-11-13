// @flow

import { ColorSchemeRegistry } from '../../../base/color-scheme';
import { hideDialog, isDialogOpen, openDialog } from '../../../base/dialog';
import { translate } from '../../../base/i18n';
import {
    IconCloseMenu,
    IconLeftMenu
} from '../../../base/icons';
import { connect } from '../../../base/redux';
import { AbstractButton, type AbstractButtonProps } from '../../../base/toolbox/components';

import LeftMenu_ from './LeftMenu';

/**
 * The type of the React {@code Component} props of {@link OverflowMenuButton}.
 */
type Props = AbstractButtonProps & {

    /**
     * The redux {@code dispatch} function.
     */
    dispatch: Function
};

let LeftMenuButton_
/**
 * An implementation of a button for showing the {@code OverflowMenu}.
 */
class LeftMenuButton extends AbstractButton<Props, *> {
    accessibilityLabel = 'toolbar.accessibilityLabel.moreActions';
    icon = IconLeftMenu;
    toggledIcon = IconCloseMenu;
    label = 'toolbar.moreActions';

    /**
     * Handles clicking / pressing this {@code OverflowMenuButton}.
     *
     * @protected
     * @returns {void}
     */
    _handleClick() {
        if (this.props._isOpen) {
            this.props.dispatch(hideDialog(LeftMenu_));
        }
        else {
            this.props.dispatch(openDialog(LeftMenu_));
        }
    }

    _isToggled() {
        return this.props._isOpen;
    }
}

function _mapStateToProps(state) {
    return {
        _styles: ColorSchemeRegistry.get(state, 'Toolbox'),
        _bottomSheetStyles: ColorSchemeRegistry.get(state, 'BottomSheet'),
        _isOpen: isDialogOpen(state, LeftMenu_)
    };
}

LeftMenuButton_ = translate(connect(_mapStateToProps)(LeftMenuButton));

export default LeftMenuButton_;
