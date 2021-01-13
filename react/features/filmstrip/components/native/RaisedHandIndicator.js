// @flow

import React from 'react';

import { IconRaisedHand, IconClap,
    IconConfuse, IconDislike,
    IconDragHandle, IconLike, IconLove,
    IconSignBackground,
    IconSmile, IconWow, Icon } from '../../../base/icons';
import { BaseIndicator } from '../../../base/react';
import { connect } from '../../../base/redux';
import AbstractRaisedHandIndicator, {
    type Props,
    _mapStateToProps
} from '../AbstractRaisedHandIndicator';

/**
 * Thumbnail badge showing that the participant would like to speak.
 *
 * @extends Component
 */
class RaisedHandIndicator extends AbstractRaisedHandIndicator<Props> {
    /**
     * Renders the platform specific indicator element.
     *
     * @returns {React$Element<*>}
     */
    _renderIndicator() {
        const raiseHandType = this.props._raisedHandType;
        let icon;
        switch (raiseHandType) {
        case 'agreeRaiseHand':
            icon = IconSmile;
            break;
        case 'disagreeRaiseHand':
            icon = IconConfuse;
            break;
        case 'agree':
            icon = IconLike;
            break;
        case 'disagree':
            icon = IconDislike;
            break;
        case 'clapHands':
            icon = IconClap;
            break;
        case 'empathetic':
            icon = IconLove;
            break;
        case 'boring':
            icon = IconWow;
            break;
        default:
            icon = IconRaisedHand;
        }
        return (
            <Icon
                size={18}
                src = { icon } />
        );
    }
}

export default connect(_mapStateToProps)(RaisedHandIndicator);
