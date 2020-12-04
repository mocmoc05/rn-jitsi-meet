// @flow

import React from 'react';
import { Text } from 'react-native';

import styles from './styles';
import { IconRecording } from '../../../base/icons/svg';

/**
 * Returns native element to be rendered.
 *
 * @param {string} timerValue - String to display as time.
 *
 * @returns {ReactElement}
 */
export default function renderRecordTimer(timerValue: string) {
    return (
        <>
            <IconRecording />
            <Text
                numberOfLines = { 4 }
                style = { styles.recordTimer }>
                { timerValue }
            </Text>
        </>
    );
}
