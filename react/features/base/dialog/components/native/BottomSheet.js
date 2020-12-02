// @flow

import React, { PureComponent, type Node } from 'react';
import { PanResponder, SafeAreaView, ScrollView, View, Text } from 'react-native';
import Slider from '@react-native-community/slider';
import { ColorSchemeRegistry } from '../../../color-scheme';
import { SlidingView } from '../../../react';
import { connect } from '../../../redux';
import { StyleType } from '../../../styles';

import { bottomSheetStyles as styles, SM_FONT_SIZE } from './styles';
import Icon from '../../../icons/components/Icon';
import {
    IconAudioRoute,
    IconVolumeMax,
    IconVolumeMin
} from '../../../icons/svg';
import {
    getLocalParticipant,
    getParticipantDisplayName
} from '../../../participants';

/**
 * Minimal distance that needs to be moved by the finger to consider it a swipe.
 */
const GESTURE_DISTANCE_THRESHOLD = 5;

/**
 * The minimal speed needed to be achieved by the finger to consider it as a swipe.
 */
const GESTURE_SPEED_THRESHOLD = 0.2;

/**
 * The type of {@code BottomSheet}'s React {@code Component} prop types.
 */
type Props = {

    /**
     * The color-schemed stylesheet of the feature.
     */
    _styles: StyleType,

    /**
     * The children to be displayed within this component.
     */
    children: Node,

    /**
     * Handler for the cancel event, which happens when the user dismisses
     * the sheet.
     */
    onCancel: ?Function,

    /**
     * Callback to be attached to the custom swipe event of the BottomSheet.
     */
    onSwipe?: Function,

    /**
     * Function to render a bottom sheet header element, if necessary.
     */
    renderHeader: ?Function,

    participantName: string
};

/**
 * A component emulating Android's BottomSheet.
 */
class BottomSheet extends PureComponent<Props> {
    panResponder: Object;

    /**
     * Instantiates a new component.
     *
     * @inheritdoc
     */
    constructor(props: Props) {
        super(props);

        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: this._onShouldSetResponder.bind(this),
            onMoveShouldSetPanResponder: this._onShouldSetResponder.bind(this),
            onPanResponderRelease: this._onGestureEnd.bind(this)
        });
    }

    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */
    render() {
        const { _styles, renderHeader, audioRoute, _participantName, _participantId, localParticipantId } = this.props;

        if (audioRoute) {
            return (
                <SlidingView
                    accessibilityRole = 'menu'
                    accessibilityViewIsModal = { true }
                    onHide = { this.props.onCancel }
                    position = 'center'
                    show = { true }>
                    {/*<View*/}
                    {/*    pointerEvents = 'box-none'*/}
                    {/*    style = { styles.audioRouteContainer }>*/}
                    {/*    <View*/}
                    {/*        pointerEvents = 'box-none'*/}
                    {/*        style = { styles.sheetAreaCover } />*/}
                    {/*    { renderHeader && renderHeader() }*/}
                    {/*    <SafeAreaView*/}
                    {/*        style = { [*/}
                    {/*            styles.sheetItemContainer,*/}
                    {/*            _styles.sheet*/}
                    {/*        ] }*/}
                    {/*        { ...this.panResponder.panHandlers }>*/}
                    {/*        <ScrollView*/}
                    {/*            bounces = { false }*/}
                    {/*            showsVerticalScrollIndicator = { false }*/}
                    {/*            style = { styles.scrollView } >*/}
                    {/*            { this.props.children }*/}
                    {/*        </ScrollView>*/}
                    {/*    </SafeAreaView>*/}
                    {/*</View>*/}
                    <View style = { styles.audioRouteContainer }>
                        <View style = { { backgroundColor: '#f5f5f5', borderTopLeftRadius: 16, borderTopRightRadius: 16,  height: 60, justifyContent: 'center', paddingLeft: 25 }}>
                            <Text style = { { fontWeight: '700', fontSize: SM_FONT_SIZE }}>Select sound device</Text>
                        </View>
                        <ScrollView
                            bounces = { false }
                            showsVerticalScrollIndicator = { false }
                            style = { styles.scrollView } >
                            { this.props.children }
                        </ScrollView>
                        <View style = { { display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5', borderBottomLeftRadius: 16, borderBottomRightRadius: 16 } }>
                            <Icon src = { IconVolumeMin } size = {20} />
                            <Slider
                                style={{width: 200, height: 40, transform: [{scaleX: 0.8}, {scaleY: 0.8}],}}
                                minimumValue={0}
                                maximumValue={1}
                                minimumTrackTintColor="#000"
                                maximumTrackTintColor="#000000"
                                thumbTintColor='#000'
                            />
                            <Icon src = { IconVolumeMax } size = {22} />
                        </View>

                    </View>
                </SlidingView>
            )
        }
        else
            return (
                <SlidingView
                    accessibilityRole = 'menu'
                    accessibilityViewIsModal = { true }
                    onHide = { this.props.onCancel }
                    position = 'bottom'
                    show = { true }>
                    <View
                        pointerEvents = 'box-none'
                        style = { styles.sheetContainer }>
                        <View
                            pointerEvents = 'box-none'
                            style = { styles.sheetAreaCover } />
                        { renderHeader && renderHeader() }
                        <SafeAreaView
                            style = { [
                                styles.sheetItemContainer,
                                _styles.sheet
                            ] }
                            { ...this.panResponder.panHandlers }>
                            { _participantId !== localParticipantId ? <View style={ styles.participantView }>
                                <Text style={ styles.participantName }>
                                    { _participantName }
                                </Text>
                            </View> : null }

                            <ScrollView
                                bounces = { false }
                                showsVerticalScrollIndicator = { false }
                                style = { styles.scrollView } >
                                { this.props.children }
                            </ScrollView>
                        </SafeAreaView>
                    </View>
                </SlidingView>
            );
        }

    /**
     * Callback to handle a gesture end event.
     *
     * @param {Object} evt - The native gesture event.
     * @param {Object} gestureState - The gesture state.
     * @returns {void}
     */
    _onGestureEnd(evt, gestureState) {
        const verticalSwipe = Math.abs(gestureState.vy) > Math.abs(gestureState.vx)
            && Math.abs(gestureState.vy) > GESTURE_SPEED_THRESHOLD;

        if (verticalSwipe) {
            const direction = gestureState.vy > 0 ? 'down' : 'up';
            const { onCancel, onSwipe } = this.props;
            let isSwipeHandled = false;

            if (onSwipe) {
                isSwipeHandled = onSwipe(direction);
            }

            if (direction === 'down' && !isSwipeHandled) {
                // Swipe down is a special gesture that can be used to close the
                // BottomSheet, so if the swipe is not handled by the parent
                // component, we consider it as a request to close.
                onCancel && onCancel();
            }
        }
    }

    /**
     * Returns true if the pan responder should activate, false otherwise.
     *
     * @param {Object} evt - The native gesture event.
     * @param {Object} gestureState - The gesture state.
     * @returns {boolean}
     */
    _onShouldSetResponder({ nativeEvent }, gestureState) {
        return nativeEvent.touches.length === 1
            && Math.abs(gestureState.dx) > GESTURE_DISTANCE_THRESHOLD
            && Math.abs(gestureState.dy) > GESTURE_DISTANCE_THRESHOLD;
    }
}

/**
 * Maps part of the Redux state to the props of this component.
 *
 * @param {Object} state - The Redux state.
 * @returns {{
 *     _styles: StyleType
 * }}
 */
function _mapStateToProps(state) {
    const participantId = state['features/large-video'].participantId;
    const localParticipant = getLocalParticipant(state);

    return {
        _styles: ColorSchemeRegistry.get(state, 'BottomSheet'),
        _participantName:
            getParticipantDisplayName(state, participantId),
        _participantId: participantId,
        localParticipantId: localParticipant.id
    };
}

export default connect(_mapStateToProps)(BottomSheet);
