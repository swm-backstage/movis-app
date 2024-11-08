import React from 'react';
import {
    Image,
    StyleSheet,
    TextInput,
    TextInputProps,
    TouchableOpacity,
    View,
} from 'react-native';

import colors from '../../assets/colors/defaultColors';

interface NameInputProps extends TextInputProps {
    onClear: any;
    isFocused: boolean;
    isClosed?: boolean;
}

const CancelButtonWithInput: React.FC<NameInputProps> = ({
    isFocused,
    onClear,
    isClosed,
    ...props
}) => {

    return (
        <View style={styles.inputContainer}>
            <TextInput
                style={[styles.input, isClosed ? styles.closedText : styles.openText]}
                {...props}
            />
            {isFocused && (
                <TouchableOpacity onPress={onClear}>
                    <Image
                        source={require('../../assets/delete.png')}
                        style={styles.clearIcon}
                    />
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center', // 교차축 ( 주축이 row니까 수직 방향으로 가운데 정렬 )
        borderWidth: 1,
        borderColor: colors.Gray100,
        borderRadius: 4,
        paddingHorizontal: 10,
        paddingVertical: 8,
        gap: 8, // 자식 컴포넌트 사이간의 간격을 설정
    },
    input: {
        flexGrow: 1,
        flexShrink: 0,
        flexBasis: 0,
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 16.52,
        letterSpacing: -0.28,
    },
    clearIcon: {
        width: 24,
        height: 24,
    },
    closedText: {
        color: 'gray', // isClosed가 true일 때 글씨 색상
    },
    openText: {
        color: 'black', // isClosed가 false일 때 글씨 색상
    },
});

export default CancelButtonWithInput;
