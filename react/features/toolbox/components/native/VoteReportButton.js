// @flow

import { type Dispatch } from 'redux';

import {
    createToolbarEvent,
    sendAnalytics
} from '../../../analytics';
import { VOTE_BUTTON_ENABLED , getFeatureFlag } from '../../../base/flags';
import { translate } from '../../../base/i18n';
import { IconReportStat, IconReportVote } from '../../../base/icons';
import {
    getLocalParticipant,
    participantUpdated
} from '../../../base/participants';
import { connect } from '../../../base/redux';
import { AbstractButton } from '../../../base/toolbox';
import type { AbstractButtonProps } from '../../../base/toolbox';
import { setActiveModalId } from '../../../base/modal';
import { VOTE_REPORT_VIEW_MODAL_ID } from '../../../chat';

/**
 * The type of the React {@code Component} props of {@link RaiseHandButton}.
 */
type Props = AbstractButtonProps & {

    /**
     * The local participant.
     */
    _localParticipant: Object,

    /**
     * Whether the participant raused their hand or not.
     */
    _voted: boolean,

    /**
     * The redux {@code dispatch} function.
     */
    dispatch: Dispatch<any>
};

/**
 * An implementation of a button to raise or lower hand.
 */
class VoteButton extends AbstractButton<Props, *> {
    accessibilityLabel = 'toolbar.accessibilityLabel.raiseHand';
    icon = IconReportVote;
    label = 'toolbar.voteReport';
    toggledLabel = 'toolbar.voteReport';

    /**
     * Handles clicking / pressing the button.
     *
     * @override
     * @protected
     * @returns {void}
     */
    _handleClick() {
        this.props.onCancel();
        this.props._displayVoteReport();
    }
}

function _mapDispatchToProps(dispatch: Function) {
    return {
        /**
         * Launches native invite dialog.
         *
         * @private
         * @returns {void}
         */
        _displayVoteReport() {
            dispatch(setActiveModalId(VOTE_REPORT_VIEW_MODAL_ID));
        },
    };
}
/**
 * Maps part of the Redux state to the props of this component.
 *
 * @param {Object} state - The Redux state.
 * @param {Object} ownProps - The properties explicitly passed to the component instance.
 * @private
 * @returns {Props}
 */
function _mapStateToProps(state, ownProps): Object {
    const _localParticipant = getLocalParticipant(state);
    const enabled = getFeatureFlag(state, VOTE_BUTTON_ENABLED , true);
    const { visible = enabled } = ownProps;

    return {
        _localParticipant,
        _voted: _localParticipant.voted,
        visible
    };
}

export default translate(connect(_mapStateToProps, _mapDispatchToProps)(VoteButton));
