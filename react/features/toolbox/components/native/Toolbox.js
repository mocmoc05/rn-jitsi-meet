// @flow

import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';

import { ColorSchemeRegistry } from '../../../base/color-scheme';
import { Container } from '../../../base/react';
import { connect } from '../../../base/redux';
import { StyleType } from '../../../base/styles';
import { ChatButton } from '../../../chat';
import ChatAppCounter from '../../../chat/components/native/ChatAppCounter';
import { getUnreadCount } from '../../../chat/functions';
import { isToolboxVisible } from '../../functions';
import AudioMuteButton from '../AudioMuteButton';
import HangupButton from '../HangupButton';
import VideoMuteButton from '../VideoMuteButton';
import VoteButton from './VoteButton';
import { Dimensions } from 'react-native';
import RaiseHandButton from './RaiseHandButton';
import { RecordButton } from '../../../recording'
import ShareScreenButton from './ShareScreenButton';
import ReportStatButton from './ReportStatButton';
import OverflowMenuButton from './OverflowMenuButton';
import styles from './styles';
import LeftMenuButton from './LeftMenuButton';

/**
 * The type of {@link Toolbox}'s React {@code Component} props.
 */
type Props = {

    /**
     * The color-schemed stylesheet of the feature.
     */
    _styles: StyleType,

    /**
     * The indicator which determines whether the toolbox is visible.
     */
    _visible: boolean,

    // signLanguageVisible: boolean,
    /**
     * The redux {@code dispatch} function.
     */
    dispatch: Function
};

/**
 * Implements the conference toolbox on React Native.
 */
class Toolbox extends PureComponent<Props> {
    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */
    render() {
        return (
            <Container
                style = { styles.toolbox }
                visible = { this.props._visible }>
                { this._renderToolbar() }
            </Container>
        );
    }

    /**
     * Constructs the toggled style of the chat button. This cannot be done by
     * simple style inheritance due to the size calculation done in this
     * component.
     *
     * @param {Object} baseStyle - The base style that was originally
     * calculated.
     * @returns {Object | Array}
     */
    _getChatButtonToggledStyle(baseStyle) {
        const { _styles } = this.props;

        if (Array.isArray(baseStyle.style)) {
            return {
                ...baseStyle,
                style: [
                    ...baseStyle.style,
                    _styles.chatButtonOverride.toggled
                ]
            };
        }

        return {
            ...baseStyle,
            style: [
                baseStyle.style,
                _styles.chatButtonOverride.toggled
            ]
        };
    }

    /**
     * Renders the toolbar. In order to avoid a weird visual effect in which the
     * toolbar is (visually) rendered and then visibly changes its size, it is
     * rendered only after we've figured out the width available to the toolbar.
     *
     * @returns {React$Node}
     */
    _renderToolbar() {
        const { _styles, _unreadMessageCount } = this.props;
        const { buttonStyles, buttonStylesBorderless, hangupButtonStyles, toggledButtonStyles, toggledMenuButtonStyles } = _styles;

        return (
            <>
                {/*<View accessibilityRole = 'toolbar'*/}
                {/*      pointerEvents = 'box-none'*/}
                {/*      style = { [styles.toolbar, { marginBottom: 10 } ] }>*/}
                {/*    <RaiseHandButton*/}
                {/*        styles = { smallButtonStyles }*/}
                {/*    />*/}
                {/*    <VoteButton*/}
                {/*        styles = { smallButtonStyles }*/}
                {/*    />*/}
                {/*    <ShareScreenButton*/}
                {/*        styles = { smallButtonStyles }*/}
                {/*    />*/}
                {/*    <RecordButton*/}
                {/*        styles = { smallButtonStyles }/>*/}
                {/*    <ReportStatButton*/}
                {/*        styles = { smallButtonStyles }*/}
                {/*    />*/}
                {/*</View>*/}
                <View
                    accessibilityRole = 'toolbar'
                    pointerEvents = 'box-none'
                    style = { styles.toolbar }>
                    <View style = {{ position: 'absolute', left: 0 }}>
                        <LeftMenuButton
                            styles = { buttonStylesBorderless }
                            toggledStyles = { toggledMenuButtonStyles } />
                    </View>
                    {/*<ChatButton*/}
                    {/*    styles = { buttonStylesBorderless }*/}
                    {/*    toggledStyles = { this._getChatButtonToggledStyle(toggledButtonStyles) }>*/}
                    {/*    <ChatAppCounter _count = { _unreadMessageCount } />*/}
                    {/*</ChatButton>*/}
                    <AudioMuteButton
                        styles = { buttonStyles }
                        toggledStyles = { toggledButtonStyles } />
                    <VideoMuteButton
                        styles = { buttonStyles }
                        toggledStyles = { toggledButtonStyles } />
                    <HangupButton
                        styles = { hangupButtonStyles } />
                    {/* <VoteButton
                            styles = { buttonStyles }
                            toggledStyles = { toggledButtonStyles } /> */}
                    <View style={{position: 'absolute', right: 0}}>
                        <OverflowMenuButton
                            styles = { buttonStylesBorderless }
                            toggledStyles = { toggledButtonStyles } />
                    </View>
                </View>
            </>
        );
    }
}

/**
 * Maps parts of the redux state to {@link Toolbox} (React {@code Component})
 * props.
 *
 * @param {Object} state - The redux state of which parts are to be mapped to
 * {@code Toolbox} props.
 * @private
 * @returns {Props}
 */
function _mapStateToProps(state: Object): Object {
    return {
        _styles: ColorSchemeRegistry.get(state, 'Toolbox'),
        _visible: isToolboxVisible(state),
        _unreadMessageCount: getUnreadCount(state)
    };
}

export default connect(_mapStateToProps)(Toolbox);
