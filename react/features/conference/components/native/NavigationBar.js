// @flow

import React, { Component } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { getConferenceName } from '../../../base/conference';
import { getFeatureFlag, CONFERENCE_TIMER_ENABLED, MEETING_NAME_ENABLED } from '../../../base/flags';
import { connect } from '../../../base/redux';
import { ChatButton } from '../../../chat';
import { PictureInPictureButton } from '../../../mobile/picture-in-picture';
import { isToolboxVisible } from '../../../toolbox/functions.native';
import ConferenceTimer from '../ConferenceTimer';

import FlipButton from './FlipCamera';
import VolumeNew from './VolumeNew';
import styles, { NAVBAR_GRADIENT_COLORS } from './styles';
import RecordTimer from '../RecordTimer';
import { getActiveSession } from '../../../recording';
import { JitsiRecordingConstants } from '../../../base/lib-jitsi-meet';

type Props = {

    /**
     * Whether displaying the current conference timer is enabled or not.
     */
    _conferenceTimerEnabled: boolean,

    /**
     * Name of the meeting we're currently in.
     */
    _meetingName: string,

    /**
     * Whether displaying the current meeting name is enabled or not.
     */
    _meetingNameEnabled: boolean,

    /**
     * True if the navigation bar should be visible.
     */
    _visible: boolean
};

/**
 * Implements a navigation bar component that is rendered on top of the
 * conference screen.
 */
class NavigationBar extends Component<Props> {
    /**
     * Implements {@Component#render}.
     *
     * @inheritdoc
     */
    render() {
        if (!this.props._visible) {
            return null;
        }

        return [
            // <LinearGradient
            //     colors = { NAVBAR_GRADIENT_COLORS }
            //     key = { 1 }
            //     pointerEvents = 'none'
            //     style = { styles.gradient }>
            //     <SafeAreaView>
            //         <View style = { styles.gradientStretchTop } />
            //     </SafeAreaView>
            // </LinearGradient>,
            <View
                key = { 2 }
                pointerEvents = 'box-none'
                style = { styles.navBarWrapper }>
                <View
                    style = {{ alignSelf: 'flex-start',
                        paddingTop: 3 }}>
                    <ChatButton
                        styles = {{ iconStyle: { color: 'transparent',
                            fontSize: 24 } }}>
                         {/*<ChatAppCounter _count = { _unreadMessageCount } />*/}
                    </ChatButton>
                    <PictureInPictureButton
                        styles = { styles.navBarButton }
                        { ...this.props } />
                </View>
                <View
                    style = {{ display: 'flex',
                        flexDirection: 'row',
                        paddingHorizontal: 10 }}>
                    {/*<VolumeNew*/}
                    {/*    styles*/}
                    {/*        = {{ iconStyle: { color: 'transparent',*/}
                    {/*            fontSize: 24,*/}
                    {/*            marginRight: 5 } }} />*/}
                    <FlipButton
                        styles = {{ iconStyle: { fontSize: 24 } }} />
                </View>
                <View
                    pointerEvents = 'box-none'
                    style = { styles.roomNameWrapper }>
                    {
                        this.props._meetingNameEnabled
                        && <Text
                            numberOfLines = { 1 }
                            style = { styles.roomName }>
                            { this.props._meetingName }
                        </Text>
                    }
                    <View style = { { display: 'flex', flexDirection: 'row' }}>
                        {
                            this.props._conferenceTimerEnabled && <ConferenceTimer />
                        }
                        <View style = { { marginLeft: 10, display: 'flex', flexDirection: 'row' }}>
                            {
                                this.props._isRecordingRunning && <RecordTimer />
                            }
                        </View>
                    </View>
                </View>
            </View>
        ];
    }

}

/**
 * Maps part of the Redux store to the props of this component.
 *
 * @param {Object} state - The Redux state.
 * @returns {Props}
 */
function _mapStateToProps(state) {
    return {
        _conferenceTimerEnabled: getFeatureFlag(state, CONFERENCE_TIMER_ENABLED, true),
        _meetingName: getConferenceName(state),
        _meetingNameEnabled: getFeatureFlag(state, MEETING_NAME_ENABLED, true),
        _visible: isToolboxVisible(state),
        _isRecordingRunning: Boolean(getActiveSession(state, JitsiRecordingConstants.mode.FILE))
    };
}

export default connect(_mapStateToProps)(NavigationBar);
