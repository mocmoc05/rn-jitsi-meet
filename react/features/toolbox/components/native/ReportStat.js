// @flow

import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    ScrollView,
    Image
} from 'react-native';
import { translate } from '../../../base/i18n';
import { JitsiModal } from '../../../base/modal';
import { connect } from '../../../base/redux';
import AbstractChat, {
    _mapDispatchToProps,
    _mapStateToProps,
    type Props
} from '../../../chat/components/AbstractChat';
import { SIGN_REPORT_VIEW_MODAL_ID } from '../../../chat';
import styles from './styles';
import Icon from '../../../base/icons/components/Icon';
import {
    IconClap,
    IconConfuse,
    IconDislike,
    IconLike, IconLove,
    IconSmile, IconWow
} from '../../../base/icons/svg';


/**
 * Implements a React native component that renders the chat window (modal) of
 * the mobile client.
 */
class Chat extends AbstractChat<Props> {
    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     */
    render() {
        const { listIcon, isSelected, iconId, listReport } = this.state;
        const iconList = listIcon.map((icon, index) => (
            <TouchableOpacity style = { iconId === icon ? styles.reportItemSelected : styles.reportItem } onPress={() => this.setState({ isSelected: true, iconId: icon })} >
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', }}>
                    { icon === 'All' ? <Text style = { iconId === icon || iconId === 'All' ? styles.signLanguageReportTextSelected : styles.signLanguageReportText }>All</Text> : <Icon src = { icon } size = { 16 } style = {{ marginRight: 5 }} />}
                    <Text style={ iconId === icon ? styles.signLanguageReportTextSelected : styles.signLanguageReportText }>10</Text>
                </View>
            </TouchableOpacity>
        ));
        const reportList = listReport.map(report => this.renderReportList(report));
        const smileList = listReport.filter(smile => smile.icon === IconSmile).map(report => this.renderReportList(report));
        return (
            <JitsiModal
                headerProps = {{
                    headerLabelKey: 'signLanguage.title'
                }}
                modalId = { SIGN_REPORT_VIEW_MODAL_ID }
                onClose = { this._onClose }>

                <View style = { styles.signLanguageReportContainer }>
                    <View style = { styles.signLanguageReportHeader }>
                        <ScrollView horizontal = { true } showsHorizontalScrollIndicator = { false }>
                            { iconList }
                        </ScrollView>
                    </View>
                    <View>
                        { iconId === 'All' ? reportList : iconId === IconSmile ? smileList : null }
                    </View>
                </View>
            </JitsiModal>
        );
    }

    /**
     * Creates a new instance.
     *
     * @inheritdoc
     */
    constructor(props: Props) {
        super(props);

        this._onClose = this._onClose.bind(this);
        this.renderReportList = this.renderReportList.bind(this);

        this.state = {
            listIcon: [ 'All', IconSmile, IconConfuse, IconLike, IconDislike, IconLove, IconClap, IconWow ],
            isSelected: false,
            iconId: 'All',
            listReport: [ { avatar: 'none', name: 'John', icon: IconSmile }, { avatar: 'none', name: 'Nick', icon: IconLike } ]
        };
    }

    _onClose: () => boolean

    /**
     * Closes the modal.
     *
     * @returns {boolean}
     */
    _onClose() {
        this.props._onToggleChat();

        return true;
    }

    renderReportList(report) {
        return (
            <View style = {{ flexDirection: 'row', paddingLeft: 16, paddingTop: 8 }}>
                <View style = {{ marginRight: 20, height: 60, justifyContent: 'center' }}>
                    <Image style = {{width: 40, height: 40, borderRadius: 100 }} source = {{ uri: 'https://thumbs.dreamstime.com/b/default-avatar-photo-placeholder-profile-icon-eps-file-easy-to-edit-default-avatar-photo-placeholder-profile-icon-124557887.jpg' }} />
                    <Icon src = { report.icon } size = { 16 } style = {{ position: 'absolute', bottom: 5, right: 0 }} />
                </View>
                <View style={ styles.borderReportItem }>
                    <Text style={{ flex: 1 }}>{report.name}</Text>
                    <TouchableOpacity style={ styles.privateChatButton }><Text style={ styles.privateChatText }>Private Chat</Text></TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default translate(connect(_mapStateToProps, _mapDispatchToProps)(Chat));
