import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Platform, TouchableNativeFeedback, TouchableNativeFeedbackComponent } from 'react-native';

const CategoryGridTile = props => {
    let TouchableCmp = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }
    return (
        <View style={styles.gridItem}>
            <TouchableCmp
                style={{flex:1}}
                onPress={props.onSelect}>
                <View style={{ ...styles.container, ...{ backgroundColor: props.color } }}>
                    <Text style={styles.title}>{props.title}</Text>
                </View>
            </TouchableCmp>
        </View>
    );
};

const styles = StyleSheet.create({
    gridItem: {
        flex: 1,
        margin: 15,
        height: 150,
        borderRadius: 10,
        overflow: Platform.OS === 'android' && Platform.Version >= 21 ? 'hidden': 'visible',
        //elevation for android
        elevation: 5,
    },
    container: {
        flex: 1,
        borderRadius: 10,
        //shadow for Ios
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        padding: 15,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    title: {
        fontFamily: 'summer',
        fontSize: 26,
        color: 'white'
    }
});

export default CategoryGridTile;