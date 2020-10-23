// @flow

import { IconChatUnread, IconVolumeNew } from '../../../base/icons';

import {
    AbstractButton,
    type AbstractButtonProps
} from '../../../base/toolbox';


/**
 * Implements an {@link AbstractButton} to open the chat screen on mobile.
 */
class VolumeButton extends AbstractButton<Props, *> {
    accessibilityLabel = 'toolbar.accessibilityLabel.chat';
    icon = IconVolumeNew;
    label = 'toolbar.chat';
    toggledIcon = IconChatUnread;



}
export default VolumeButton;
