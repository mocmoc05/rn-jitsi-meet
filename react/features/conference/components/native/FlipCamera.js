// @flow

import { IconFlipCamera} from '../../../base/icons';

import {
    AbstractButton,
    type AbstractButtonProps
} from '../../../base/toolbox';


/**
 * Implements an {@link AbstractButton} to open the chat screen on mobile.
 */
class FlipButton extends AbstractButton<Props, *> {
    accessibilityLabel = 'toolbar.accessibilityLabel.chat';
    icon = IconFlipCamera;
    label = 'toolbar.chat';



}
export default FlipButton;
