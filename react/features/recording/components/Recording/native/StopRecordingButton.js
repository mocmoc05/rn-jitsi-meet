// @flow

import React from 'react';
import { TouchableOpacity } from 'react-native';
import { translate } from '../../../../base/i18n';
import { connect } from '../../../../base/redux';
import AbstractStopRecordingDialog, {
    type Props,
    _mapStateToProps
} from '../AbstractStopRecordingDialog';
import { IconStopRecord } from '../../../../base/icons/svg';

/**
 * React Component for getting confirmation to stop a file recording session in
 * progress.
 *
 * @extends Component
 */
class StopRecordingButton extends AbstractStopRecordingDialog<Props> {

    /**
     * Implements {@code Component#render}.
     *
     * @inheritdoc
     */
    render() {
        return (
            <TouchableOpacity onPress = { this._onSubmit }>
                <IconStopRecord />
            </TouchableOpacity>
        );
    }

    _onSubmit: () => boolean
}

export default translate(connect(_mapStateToProps)(StopRecordingButton));
