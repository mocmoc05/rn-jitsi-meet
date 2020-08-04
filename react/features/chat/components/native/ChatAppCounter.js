// @flow

import React, { Component } from 'react';

import { connect } from '../../../base/redux';
import { getUnreadCount } from '../../functions';
import { Text, View } from 'react-native';

/**
 * The type of the React {@code Component} props of {@link ChatCounter}.
 */
type Props = {

    /**
     * The value of to display as a count.
     */
    _count: number
};

/**
 * Implements a React {@link Component} which displays a count of the number of
 * unread chat messages.
 *
 * @extends Component
 */
class ChatAppCounter extends Component<Props> {

    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */
    render() {
        if (this.props._count <= 0) return null;
        return (
            <View
                style = {{
                    backgroundColor: '#3278ff',
                    borderRadius: 12,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 24,
                    height: 24,
                    position: 'absolute',
                    top: 0,
                    right: 0
                }}>
                <Text style = {{ color: '#fff' }}>{this.props._count}</Text>
            </View>
        );
    }
}

/**
 * Maps (parts of) the Redux state to the associated {@code ChatCounter}'s
 * props.
 *
 * @param {Object} state - The Redux state.
 * @private
 * @returns {{
 *     _count: number
 * }}
 */
function _mapStateToProps(state) {
    return {
        _count: getUnreadCount(state)
    };
}

export default connect(_mapStateToProps)(ChatAppCounter);
