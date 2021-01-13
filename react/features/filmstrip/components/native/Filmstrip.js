// @flow

import React, { Component } from 'react';
import { ScrollView, TouchableOpacity, Text } from 'react-native';

import { Container, Platform } from '../../../base/react';
import { connect } from '../../../base/redux';
import { ASPECT_RATIO_NARROW } from '../../../base/responsive-ui/constants';
import { isFilmstripVisible } from '../../functions';

import LocalThumbnail from './LocalThumbnail';
import Thumbnail from './Thumbnail';
import styles from './styles';

/**
 * Filmstrip component's property types.
 */
type Props = {

    /**
     * Application's aspect ratio.
     */
    _aspectRatio: Symbol,

    /**
     * The indicator which determines whether the filmstrip is enabled.
     */
    _enabled: boolean,

    /**
     * The participants in the conference.
     */
    _participants: Array<any>,

    /**
     * The indicator which determines whether the filmstrip is visible.
     */
    _visible: boolean
};

/**
 * Implements a React {@link Component} which represents the filmstrip on
 * mobile/React Native.
 *
 * @extends Component
 */
class Filmstrip extends Component<Props> {
    /**
     * Whether the local participant should be rendered separately from the
     * remote participants i.e. outside of their {@link ScrollView}.
     */
    _separateLocalThumbnail: boolean;

    /**
     * Constructor of the component.
     *
     * @inheritdoc
     */
    constructor(props) {
        super(props);

        // XXX Our current design is to have the local participant separate from
        // the remote participants. Unfortunately, Android's Video
        // implementation cannot accommodate that because remote participants'
        // videos appear on top of the local participant's video at times.
        // That's because Android's Video utilizes EGL and EGL gives us only two
        // practical layers in which we can place our participants' videos:
        // layer #0 sits behind the window, creates a hole in the window, and
        // there we render the LargeVideo; layer #1 is known as media overlay in
        // EGL terms, renders on top of layer #0, and, consequently, is for the
        // Filmstrip. With the separate LocalThumnail, we should have left the
        // remote participants' Thumbnails in layer #1 and utilized layer #2 for
        // LocalThumbnail. Unfortunately, layer #2 is not practical (that's why
        // I said we had two practical layers only) because it renders on top of
        // everything which in our case means on top of participant-related
        // indicators such as moderator, audio and video muted, etc. For now we
        // do not have much of a choice but to continue rendering LocalThumbnail
        // as any other remote Thumbnail on Android.
        this._separateLocalThumbnail = Platform.OS !== 'android';
        this.state = { isShowMore: false };
    }

    showMore() {
        this.setState({ isShowMore: !this.state.isShowMore });
    }

    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */
    render() {
        const { _aspectRatio, _enabled, _participants, _participantsIncludeLocal, _visible } = this.props;

        const style6OrMoreUsers = {
            borderRadius: 100,
            width: 60,
            height: 60,
            marginBottom: 10
        };
        const filmstripMoreUsers = {
            position: 'absolute',
            top: 60,
            right: 20
        };
        const extraUsers = this._sort(_participantsIncludeLocal, isNarrowAspectRatio).slice(2).length;
        console.log(_participants);

        if (!_enabled) {
            return null;
        } else if (this.props._participants.length >= 2) {
            return (
                <Container
                    style = { filmstripMoreUsers }
                    visible = { _visible }>
                    {

                        // this._separateLocalThumbnail
                        // && !isNarrowAspectRatio
                        // && <LocalThumbnail />
                    }
                    <ScrollView
                        horizontal = { isNarrowAspectRatio }
                        showsHorizontalScrollIndicator = { false }
                        showsVerticalScrollIndicator = { false }
                        style = { styles.scrollView } >
                        {
                            !this._separateLocalThumbnail && !isNarrowAspectRatio
                            && <LocalThumbnail />
                        }
                        {
                            this._sort(_participantsIncludeLocal, isNarrowAspectRatio)
                                .slice(0, 1)
                                .map(p => (
                                    <Thumbnail
                                        styleOverrides = { style6OrMoreUsers }
                                        key = { p.id }
                                        participant = { p }
                                        moreUsers = { true } />))
                        }
                        {
                            this.state.isShowMore
                                ? this._sort(_participantsIncludeLocal, isNarrowAspectRatio)
                                .slice(2)
                                .map(p => (
                                    <Thumbnail
                                        styleOverrides = { style6OrMoreUsers }
                                        key = { p.id }
                                        participant = { p } />)) : null
                        }
                        {
                            !this._separateLocalThumbnail && isNarrowAspectRatio
                            && <LocalThumbnail />
                        }
                    </ScrollView>
                    <TouchableOpacity
                        style = {{ width: 60,
                            height: 60,
                            backgroundColor: '#7B8086',
                            borderRadius: 100,
                            justifyContent: 'center',
                            alignItems: 'center',
                            activeOpacity: 0.1 }}
                        onPress = { () => this.showMore() }>
                        <Text
                            style = {{ color: '#C4C4C4',
                                fontSize: 14,
                                fontWeight: '700' }}>+{extraUsers}</Text>
                    </TouchableOpacity>
                    {
                        this._separateLocalThumbnail && isNarrowAspectRatio
                        && <LocalThumbnail />
                    }
                </Container>
            );
        }

        const isNarrowAspectRatio = _aspectRatio === ASPECT_RATIO_NARROW;
        const filmstripStyle = isNarrowAspectRatio ? styles.filmstripNarrow : styles.filmstripWide;

        return (
            <Container
                style = { filmstripStyle }
                visible = { _visible }>
                {
                    this._separateLocalThumbnail
                        && !isNarrowAspectRatio
                        && <LocalThumbnail />
                }
                <ScrollView
                    horizontal = { isNarrowAspectRatio }
                    showsHorizontalScrollIndicator = { false }
                    showsVerticalScrollIndicator = { false }
                    style = { styles.scrollView } >
                    {
                        !this._separateLocalThumbnail && !isNarrowAspectRatio
                            && <LocalThumbnail />
                    }
                    {

                        // this._sort(_participants, isNarrowAspectRatio)
                        // .map(p => (
                        // <Thumbnail
                        // key = { p.id }
                        // participant = { p } />))
                    }
                    {
                        !this._separateLocalThumbnail && isNarrowAspectRatio
                            && <LocalThumbnail />
                    }
                </ScrollView>
                {

                    // this._separateLocalThumbnail && isNarrowAspectRatio
                    //     && <LocalThumbnail />
                }
                <LocalThumbnail />
            </Container>
        );
    }

    /**
     * Sorts a specific array of {@code Participant}s in display order.
     *
     * @param {Participant[]} participants - The array of {@code Participant}s
     * to sort in display order.
     * @param {boolean} isNarrowAspectRatio - Indicates if the aspect ratio is
     * wide or narrow.
     * @private
     * @returns {Participant[]} A new array containing the elements of the
     * specified {@code participants} array sorted in display order.
     */
    _sort(participants, isNarrowAspectRatio) {
        // XXX Array.prototype.sort() is not appropriate because (1) it operates
        // in place and (2) it is not necessarily stable.

        const sortedParticipants = [
            ...participants
        ];

        if (isNarrowAspectRatio) {
            // When the narrow aspect ratio is used, we want to have the remote
            // participants from right to left with the newest added/joined to
            // the leftmost side. The local participant is the leftmost item.
            sortedParticipants.reverse();
        }

        return sortedParticipants;
    }
}

/**
 * Maps (parts of) the redux state to the associated {@code Filmstrip}'s props.
 *
 * @param {Object} state - The redux state.
 * @private
 * @returns {Props}
 */
function _mapStateToProps(state) {
    const participants = state['features/base/participants'];
    const { enabled } = state['features/filmstrip'];

    return {
        _aspectRatio: state['features/base/responsive-ui'].aspectRatio,
        _enabled: enabled,
        _participants: participants.filter(p => !p.local),
        _participantsIncludeLocal: participants,
        _visible: isFilmstripVisible(state)
    };
}

export default connect(_mapStateToProps)(Filmstrip);
