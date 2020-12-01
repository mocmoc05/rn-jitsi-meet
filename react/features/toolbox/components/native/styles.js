// @flow

import { ColorSchemeRegistry, schemeColor } from '../../../base/color-scheme';
import { BoxModel, ColorPalette } from '../../../base/styles';

const BUTTON_SIZE = 50;

// Toolbox, toolbar:

/**
 * The style of toolbar buttons.
 */
const toolbarButton = {
    backgroundColor: schemeColor('button'),
    borderRadius: BUTTON_SIZE / 2,
    borderWidth: 0,
    flex: 0,
    flexDirection: 'row',
    height: BUTTON_SIZE,
    justifyContent: 'center',

    // XXX We probably tested BoxModel.margin and discovered it to be too small
    // for our taste.
    marginHorizontal: 7,
    width: BUTTON_SIZE
};

/**
 * The icon style of the toolbar buttons.
 */
const toolbarButtonIcon = {
    alignSelf: 'center',
    // color: ColorPalette.darkGrey,
    fontSize: 22
};

/**
 * The style of toolbar buttons which display white icons.
 */
const whiteToolbarButton = {
    ...toolbarButton,
    // backgroundColor: schemeColor('buttonToggled')
};

/**
 * The icon style of toolbar buttons which display white icons.
 */
const whiteToolbarButtonIcon = {
    ...toolbarButtonIcon,
    color: ColorPalette.white
};

const whiteHangUpToolbarButtonIcon = {
    ...toolbarButtonIcon,
    color: 'transparent'
}
/**
 * The Toolbox and toolbar related styles.
 */
const styles = {

    expandMenuContainer: {
        alignItems: 'center',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        flexDirection: 'column',
        paddingTop: 10,
        height: 30
    },

    sheetGestureRecognizer: {
        alignItems: 'stretch',
        flexDirection: 'column'
    },

    /**
     * The style of the toolbar.
     */
    toolbar: {
        alignItems: 'center',
        flexDirection: 'row',
        flexGrow: 0,
        justifyContent: 'center',
        marginBottom: BoxModel.margin / 2,
        paddingHorizontal: BoxModel.margin
    },

    /**
     * The style of the root/top-level {@link Container} of {@link Toolbox}.
     */
    toolbox: {
        flexDirection: 'column',
        flexGrow: 0
    },
    leftMenuItem: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5
    },
    signLanguageContainer: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        height: 58,
        width: 256,
        display: 'flex',
        flexDirection: 'row',
        paddingBottom: 10
    },
    signLanguageItem: {
        marginHorizontal: 5
    },
    btnPress: {
        borderColor: 'blue',
        borderWidth: 1,
        height: 30,
        width: 100,
    },
    signLanguageReportContainer: {
        flex: 1,
        borderTopColor: '#E0E2E4',
        borderTopWidth: 0.5
    },
    signLanguageReportHeader: {
        height: 44,
        borderBottomColor: '#E0E2E4',
        borderBottomWidth: 0.5,
        display: 'flex',
        flexDirection: 'row'
    },
    reportItem: {
        alignItems: 'center',
        padding: 10,
        flex: 1
    },
    reportItemSelected: {
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#2D84AC',
        flex: 1
    },
    signLanguageReportTextSelected: {
        color: '#2D84AC',
        marginRight: 5
    },
    signLanguageReportText: {
        color: '#7B8086',
        marginRight: 5,
        fontSize: 14
    },
    voteReportTextSelected: {
        color: '#2D84AC',
        marginRight: 5,
        fontSize: 16
    },
    privateChatButton: {
        backgroundColor: '#2D84AC',
        borderRadius: 4,
        width: 100,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 20
    },
    privateChatText: {
        color: '#fff'
    },
    borderReportItem: {
        borderBottomWidth: 1,
        borderBottomColor: '#F5F5F5',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    }
};

export default styles;

/**
 * Color schemed styles for the @{Toolbox} component.
 */
ColorSchemeRegistry.register('Toolbox', {
    /**
     * Styles for buttons in the toolbar.
     */
    buttonStyles: {
        iconStyle: toolbarButtonIcon,
        style: toolbarButton,
        underlayColor: 'white'
    },

    smallButtonStyles: {
        iconStyle: {
            alignSelf: 'center',
            // color: ColorPalette.darkGrey,
            color: 'transparent',
            fontSize: 22
        },
        style: {
            backgroundColor: 'transparent',
            opacity: 40,
            borderRadius: BUTTON_SIZE / 2,
            borderWidth: 0,
            flex: 0,
            flexDirection: 'row',
            height: BUTTON_SIZE/1.5,
            justifyContent: 'center',
    //
    //         // XXX We probably tested BoxModel.margin and discovered it to be too small
    //         // for our taste.
            marginHorizontal: 7,
            width: BUTTON_SIZE/1.5
        },
        underlayColor: 'rgba(255, 255, 255, 0.4)'
    },

    buttonStylesBorderless: {
        iconStyle: whiteToolbarButtonIcon,
        style: {
            ...toolbarButton,
            backgroundColor: 'transparent'
        }
    },

    /**
     * Overrides to the standard styles that we apply to the chat button, as
     * that behaves slightly differently to other buttons.
     */
    chatButtonOverride: {
        toggled: {
            backgroundColor: ColorPalette.blue
        }
    },

    hangupButtonStyles: {
        iconStyle: whiteHangUpToolbarButtonIcon,
        // iconStyle: whiteToolbarButtonIcon,
        style: {
            ...toolbarButton,
            backgroundColor: schemeColor('hangup')
        },
        underlayColor: ColorPalette.buttonUnderlay
    },

    /**
     * Styles for toggled buttons in the toolbar.
     */
    toggledButtonStyles: {
        iconStyle: whiteToolbarButtonIcon,
        style: {
            ...whiteToolbarButton,
            borderColor: schemeColor('buttonToggledBorder'),
            borderWidth: 1
        },
        underlayColor: 'white'
    },
    toogleMenuButtonStyles: {
        iconStyle: whiteToolbarButtonIcon,
        style: {
            ...toolbarButton,
            backgroundColor: 'transparent'
        }
    }
});
