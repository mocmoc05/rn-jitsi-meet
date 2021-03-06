// @flow

import React, { PureComponent } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Collapsible from 'react-native-collapsible';

import { ColorSchemeRegistry } from '../../../base/color-scheme';
import { BottomSheet, hideDialog, isDialogOpen } from '../../../base/dialog';
import { IconDragHandle } from '../../../base/icons';
import { connect } from '../../../base/redux';
import { StyleType } from '../../../base/styles';
import { InviteButton } from '../../../invite';
import { AudioRouteButton } from '../../../mobile/audio-mode';
import { shouldDisplayTileView, TileViewButton } from '../../../video-layout';

import AudioOnlyButton from './AudioOnlyButton';
import ToggleCameraButton from './ToggleCameraButton';
import styles from './styles';
import KickUserButton from './KickUserButton';
import SwitchModButton from './SwitchModButton';
import {
    getLocalParticipant,
    getParticipantDisplayName
} from '../../../base/participants';
import MuteButton from './MuteButton';
import PrivateChat from './PrivateChat';

/**
 * The type of the React {@code Component} props of {@link OverflowMenu}.
 */
type Props = {

    /**
     * The color-schemed stylesheet of the dialog feature.
     */
    _bottomSheetStyles: StyleType,

    /**
     * True if the overflow menu is currently visible, false otherwise.
     */
    _isOpen: boolean,

    /**
     * Whether the recoding button should be enabled or not.
     */
    _recordingEnabled: boolean,

    /**
     * Used for hiding the dialog when the selection was completed.
     */
    dispatch: Function
};

type State = {

    /**
     * True if the bottom scheet is scrolled to the top.
     */
    scrolledToTop: boolean,

    /**
     * True if the 'more' button set needas to be rendered.
     */
    showMore: boolean
}

/**
 * The exported React {@code Component}. We need it to execute
 * {@link hideDialog}.
 *
 * XXX It does not break our coding style rule to not utilize globals for state,
 * because it is merely another name for {@code export}'s {@code default}.
 */
let OverflowMenu_; // eslint-disable-line prefer-const

/**
 * Implements a React {@code Component} with some extra actions in addition to
 * those in the toolbar.
 */
class OverflowMenu extends PureComponent<Props, State> {
    /**
     * Initializes a new {@code OverflowMenu} instance.
     *
     * @inheritdoc
     */
    constructor(props: Props) {
        super(props);

        this.state = {
            scrolledToTop: true,
            showMore: false
        };

        // Bind event handlers so they are only bound once per instance.
        this._onCancel = this._onCancel.bind(this);
        this._onSwipe = this._onSwipe.bind(this);
        this._onToggleMenu = this._onToggleMenu.bind(this);
        this._renderMenuExpandToggle = this._renderMenuExpandToggle.bind(this);
    }

    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */
    render() {
        const { _bottomSheetStyles, _participantId, localParticipantId, _tileViewEnabled, _participantName } = this.props;
        const { showMore } = this.state;

        const buttonProps = {
            afterClick: this._onCancel,
            showLabel: true,
            styles: _bottomSheetStyles.buttons
        };

        const moreOptionsButtonProps = {
            ...buttonProps,
            afterClick: this._onToggleMenu,
            visible: !showMore
        };

        if ( _participantId !== localParticipantId && _tileViewEnabled) {
            return (
                <BottomSheet
                    participantName = { _participantName }
                    onCancel = { this._onCancel }
                    onSwipe = { this._onSwipe }
                    renderHeader = { this._renderMenuExpandToggle }>
                    <MuteButton { ...buttonProps } />
                    <KickUserButton { ...buttonProps } />
                    <SwitchModButton { ...buttonProps } />
                    <PrivateChat { ...buttonProps } />
                    <TileViewButton { ...buttonProps } />
                </BottomSheet>
            )
        } else if ( _participantId !== localParticipantId && !_tileViewEnabled) {
            return (
                <BottomSheet
                    onCancel = { this._onCancel }
                    onSwipe = { this._onSwipe }
                    renderHeader = { this._renderMenuExpandToggle }>
                    <KickUserButton { ...buttonProps } />
                    <SwitchModButton { ...buttonProps } />
                    <PrivateChat { ...buttonProps } />
                </BottomSheet>
            )
        }

        return (
            <BottomSheet
                onCancel = { this._onCancel }
                onSwipe = { this._onSwipe }
                renderHeader = { this._renderMenuExpandToggle }>
                <TileViewButton { ...buttonProps } />
                <InviteButton { ...buttonProps } />
                <AudioOnlyButton { ...buttonProps } />
                <AudioRouteButton { ...buttonProps } />
                <Collapsible collapsed = { !showMore }>
                    <ToggleCameraButton { ...buttonProps } />
                </Collapsible>
            </BottomSheet>
        );
    }

    _renderMenuExpandToggle: () => React$Element<any>;

    /**
     * Function to render the menu toggle in the bottom sheet header area.
     *
     * @returns {React$Element}
     */
    _renderMenuExpandToggle() {
        return (
            <View
                style = { [
                    this.props._bottomSheetStyles.sheet,
                    styles.expandMenuContainer
                ] }>
                <TouchableOpacity onPress = { this._onToggleMenu }>
                    { /* $FlowFixMeProps */ }
                    <IconDragHandle style = { this.props._bottomSheetStyles.expandIcon } />
                </TouchableOpacity>
            </View>
        );
    }

    _onCancel: () => boolean;

    /**
     * Hides this {@code OverflowMenu}.
     *
     * @private
     * @returns {boolean}
     */
    _onCancel() {
        if (this.props._isOpen) {
            this.props.dispatch(hideDialog(OverflowMenu_));

            return true;
        }

        return false;
    }

    _onSwipe: string => void;

    /**
     * Callback to be invoked when swipe gesture is detected on the menu. Returns true
     * if the swipe gesture is handled by the menu, false otherwise.
     *
     * @param {string} direction - Direction of 'up' or 'down'.
     * @returns {boolean}
     */
    _onSwipe(direction) {
        const { showMore } = this.state;

        switch (direction) {
        case 'up':
            !showMore && this.setState({
                showMore: true
            });

            return !showMore;
        case 'down':
            showMore && this.setState({
                showMore: false
            });

            return showMore;
        }
    }

    _onToggleMenu: () => void;

    /**
     * Callback to be invoked when the expand menu button is pressed.
     *
     * @returns {void}
     */
    _onToggleMenu() {
        this.setState({
            showMore: !this.state.showMore
        });
    }
}

/**
 * Function that maps parts of Redux state tree into component props.
 *
 * @param {Object} state - Redux state.
 * @private
 * @returns {Props}
 */
function _mapStateToProps(state) {
    const participantId = state['features/large-video'].participantId;
    const localParticipant = getLocalParticipant(state);

    return {
        _bottomSheetStyles: ColorSchemeRegistry.get(state, 'BottomSheet'),
        _isOpen: isDialogOpen(state, OverflowMenu_),
        _participantId: participantId,
        localParticipantId: localParticipant.id,
        _tileViewEnabled: shouldDisplayTileView(state),
        _participantName:
            getParticipantDisplayName(state, participantId)
    };
}

OverflowMenu_ = connect(_mapStateToProps)(OverflowMenu);

export default OverflowMenu_;
