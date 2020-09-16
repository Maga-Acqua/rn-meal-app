import React from 'react';
import { Text, StyleSheet } from 'react-native';

const DefaultText = props => {
return <Text style={{...styles.text, ...props.style}}>{props.children}</Text>
};

const styles = StyleSheet.create({
    text: {
        fontFamily: 'song',
        textAlign: 'center',
        fontSize: 18,
        padding: 5
    }
});

export default DefaultText;