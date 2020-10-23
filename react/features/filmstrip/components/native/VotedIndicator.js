// @flow

import React from 'react';

import { IconVote } from '../../../base/icons';
import { BaseIndicator } from '../../../base/react';
import { connect } from '../../../base/redux';
import AbstractVotedIndicator, {
    type Props,
    _mapStateToProps
} from '../AbstractVotedIndicator';

/**
 * Thumbnail badge showing that the participant would like to speak.
 *
 * @extends Component
 */
class VotedIndicator extends AbstractVotedIndicator<Props> {
    /**
     * Renders the platform specific indicator element.
     *
     * @returns {React$Element<*>}
     */
    _renderIndicator() {
        return (
            <BaseIndicator
                highlight = { true }
                icon = { IconVote } />
        );
    }
}

export default connect(_mapStateToProps)(VotedIndicator);
