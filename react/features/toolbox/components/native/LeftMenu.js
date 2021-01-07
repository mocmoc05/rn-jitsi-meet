// @flow

import React, { PureComponent } from 'react';
import { TouchableOpacity, View, Text, TouchableWithoutFeedback, TouchableHighlight } from 'react-native';
import Collapsible from 'react-native-collapsible';

import { ColorSchemeRegistry } from '../../../base/color-scheme';
import { BottomSheet, hideDialog, isDialogOpen } from '../../../base/dialog';
import {
    IconClap,
    IconConfuse, IconDislike,
    IconDragHandle, IconLike, IconLove,
    IconSignBackground,
    IconSmile, IconWow
} from '../../../base/icons';
import Icon from '../../../base/icons/components/Icon';
import { connect } from '../../../base/redux';
import { StyleType } from '../../../base/styles';
import { RecordButton } from '../../../recording';

import RaiseHandButton from './RaiseHandButton';
import ReportStatButton from './ReportStatButton';
import ShareScreenButton from './ShareScreenButton';
import SignLanguageButton from './SignLanguageButton';
import VoteButton from './VoteButton';
import VoteReportButton from './VoteReportButton';
import styles from './styles';
import {
    getLocalParticipant,
    participantUpdated
} from '../../../base/participants';

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
    showMore: boolean,

    showSignLanguageList: boolean,

    showSignLanguageReport: boolean,

    isPress: boolean,

    isPressed: boolean
}

/**
 * The exported React {@code Component}. We need it to execute
 * {@link hideDialog}.
 *
 * XXX It does not break our coding style rule to not utilize globals for state,
 * because it is merely another name for {@code export}'s {@code default}.
 */
let LeftMenu_; // eslint-disable-line prefer-const

/**
 * Implements a React {@code Component} with some extra actions in addition to
 * those in the toolbar.
 */
class LeftMenu extends PureComponent<Props, State> {
    /**
     * Initializes a new {@code OverflowMenu} instance.
     *
     * @inheritdoc
     */
    constructor(props: Props) {
        super(props);

        this.state = {
            scrolledToTop: true,
            showMore: false,
            showSignLanguageList: false,
            showSignLanguageReport: false,
            isPress: false,
            isPressed: false,
            // listIcon: [ IconSmile, IconConfuse, IconLike, IconDislike, IconLove, IconClap, IconWow ],
            listIcon: [
                { name: 'agreeRaiseHand', icon: IconSmile},
                { name: 'disagreeRaiseHand', icon: IconConfuse},
                { name: 'agree', icon: IconLike},
                { name: 'disagree', icon: IconDislike},
                { name: 'clapHands', icon: IconClap},
                { name: 'empathetic', icon: IconLove },
                { name: 'boring', icon: IconWow},
            ],
            iconId: null
        };

        // Bind event handlers so they are only bound once per instance.
        this._onCancel = this._onCancel.bind(this);
        this._onSwipe = this._onSwipe.bind(this);
        this._onToggleMenu = this._onToggleMenu.bind(this);
        this._renderMenuExpandToggle = this._renderMenuExpandToggle.bind(this);
        this._onSignLanguageClick = this._onSignLanguageClick.bind(this);
        // this._onSignReportClick = this._onSignReportClick.bind(this);
        this.onPressHandler = this.onPressHandler.bind(this);
    }

    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */
    render() {
        const { _styles, _bottomSheetStyles } = this.props;
        const { smallButtonStyles, buttonStylesBorderless } = _styles;
        const { showSignLanguageReport, showSignLanguageList, isPress, listIcon, iconId, isPressed } = this.state;
        const buttonProps = {
            afterClick: this._onCancel,
            showLabel: true,
            styles: _bottomSheetStyles.buttonsLeft,
            onSignLanguageClick: this._onSignLanguageClick,
            onSignReportClick: this._onSignReportClick,
            onCancel: this._onCancel
        };

        // const moreOptionsButtonProps = {
        //     ...buttonProps,
        //     afterClick: this._onToggleMenu,
        //     visible: !showMore
        // };

        const touchProps = {
            activeOpacity: 1,
            onHideUnderlay: () => this.setState({ isPress: false }),
            // onShowUnderlay: () => this.setState({ isPress: true }),
            onPress: () => {
                this.setState({ isPressed: !isPressed });
                console.log( isPressed );
            }
        };

        const iconList = listIcon.map((e, index) => (
            <TouchableHighlight
                { ...touchProps }
                key = { index }
                onShowUnderlay = { () => {
                    this.setState({ isPress: true });
                    this.onPressHandler(e);
                } } >
                <View style={{ justifyContent: 'center', alignItems: 'center'}}>
                    <Icon
                        src = { e.icon }
                        size = { isPress && iconId === e.icon ? 30 : 24 }
                        style = { styles.signLanguageItem } />
                    { isPressed && iconId === e.icon ? <View style={{ borderRadius: 100, width: 5, height: 5, backgroundColor: '#fff'}} /> : null}
                </View>
            </TouchableHighlight>
        ));

        return (
            <View
                pointerEvents = 'box-none'
                style = {{ position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    zIndex: 9999 }}>
                { showSignLanguageList
                    ? <View style={{ position: 'absolute',
                        bottom: 390,
                        left: 20,
                        display: 'flex',
                        flexDirection: 'row', zIndex: 9999}}>
                        {/*<IconSignBackground />*/}
                        <View style = { styles.signLanguageContainer }>
                            {iconList}
                        </View>
                    </View> : null }
                <TouchableWithoutFeedback onPress = { this._onCancel }>
                    <View
                        accessibilityRole = 'toolbar'
                        pointerEvents = 'box-none'
                        style = {{ position: 'absolute',
                            bottom: 100,
                            left: 20,
                            padding: 10,
                            backgroundColor: 'rgba(0, 0, 0, 0.4)',
                            borderRadius: 8 }}>
                        {/* <RaiseHandButton { ...buttonProps } />*/}

                        <SignLanguageButton
                            {...buttonProps}
                            icon={ iconId }>
                            { showSignLanguageList
                                ? <TouchableWithoutFeedback
                                    styl= {{ flex: 1 }}
                                    onPress= { this._onSignLanguageClick }>
                                    <View
                                        style = {{ position: 'absolute',
                                            top: -50,
                                            left: -10,
                                        }}>
                                        <IconSignBackground />
                                    </View>
                                </TouchableWithoutFeedback>
                                : null }

                        </SignLanguageButton>
                        <VoteButton { ...buttonProps } />
                        <ShareScreenButton { ...buttonProps } />
                        <RecordButton { ...buttonProps } />
                        <ReportStatButton { ...buttonProps } />
                        <VoteReportButton { ...buttonProps } />
                    </View>
                </TouchableWithoutFeedback>
            </View>
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
                onCancel = { this._onCancel }
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
            this.props.dispatch(hideDialog(LeftMenu_));

            return true;
        }

        return false;
    }

    // _onSignLanguageClick: () => void;

    _onSignLanguageClick() {
        const { showSignLanguageList } = this.state;

        this.setState({ showSignLanguageList: !showSignLanguageList });
    }

    // _onSignReportClick: () => void;
    //
    _onSignReportClick() {
        const { showSignLanguageReport } = this.state;

        this.setState({ showSignLanguageReport: !showSignLanguageReport });
        // this.props.signLanguageReportVisible();
    }

    onPressHandler(e) {
        this.setState({ iconId: e.icon }, () => {
            this.props.dispatch(participantUpdated({
                id: this.props._localParticipant.id,
                local: true,
                _raisedHandType: e.name
            }));
        });
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
    const _localParticipant = getLocalParticipant(state);
    return {
        _styles: ColorSchemeRegistry.get(state, 'Toolbox'),
        _bottomSheetStyles: ColorSchemeRegistry.get(state, 'BottomSheet'),
        _isOpen: isDialogOpen(state, LeftMenu_),
        _localParticipant
    };
}

LeftMenu_ = connect(_mapStateToProps)(LeftMenu);

export default LeftMenu_;
