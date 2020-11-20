// @flow

import React, { Component } from 'react';

import { IconMicDisabled, IconMicOff, IconMicOn } from '../../../base/icons';
import { BaseIndicator } from '../../../base/react';

/**
 * Thumbnail badge for displaying the audio mute status of a participant.
 */
export default class AudioMutedIndicator extends Component<{}> {
    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     */
    render() {
        return (
            this.props.mute
                ? <BaseIndicator
                    highlight = { false }
                    icon = { IconMicOff } />
                : <BaseIndicator
                    highlight = { false }
                    icon = { IconMicOn } />
        );
    }
}
