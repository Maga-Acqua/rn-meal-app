import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Platform, Text, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import FiltersScreen from '../screens/FiltersScreen';
import Colors from '../constants/Colors';
import DefaultText from '../components/DefaultText';

/***********STACK**************/

const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : 'white'
    },
    headerTitleStyle: {
        fontFamily: 'summer',
        fontSize: 32
    },
    //For Ios
    headerBackTitleStyle: {
        fontFamily: 'summer'
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor
};

//createStackNavigator -> 1st argument object with screen, 2nd argument config the navigator
const MealsNavigator = createStackNavigator({
    Categories: CategoriesScreen,
    CategoryMeals: {
        screen: CategoryMealsScreen
    },
    MealDetail: MealDetailScreen
}, {
    mode: 'modal',
    defaultNavigationOptions:  defaultNavOptions 
});

const FavsNavigator = createStackNavigator({
    Favorites: FavoritesScreen,
    MealDetail: MealDetailScreen
}, {
    mode: 'modal',
    defaultNavigationOptions:  defaultNavOptions 
});

const FiltersNavigator = createStackNavigator({
    Filters: FiltersScreen
}, {
    mode: 'modal',
    defaultNavigationOptions:  defaultNavOptions 
})

/****************TAB******************/
const tabsScreenConfig = {
    Meals: {
        screen: MealsNavigator,
        navigationOptions: {
            //tabInfo brings info about tab set before
            tabBarIcon: (tabInfo) => {
                return <Ionicons name='ios-restaurant' size={25} color={tabInfo.tintColor} />
            },
            //tabBarColor works with shifting: true
            tabBarColor: Colors.primaryColor,
            tabBarLabel: Platform.OS === 'android' ? <Text style={{fontFamily: 'song'}}>Meals</Text> : 'Meals'
        }
    },
    Favorites: {
        screen: FavsNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <Ionicons name='ios-heart' size={25} color={tabInfo.tintColor} />
            },
            //tabBarColor works with shifting: true
            tabBarColor: Colors.accentColor,
            tabBarLabel: Platform.OS === 'android' ? <Text style={{fontFamily: 'song'}}>Favorites</Text> : 'Favorites'
        }
    }
};
const MealsTabFavNavigator = Platform.OS === 'android'
    ? createMaterialBottomTabNavigator(
        //1st argument
        tabsScreenConfig,
        //2nd argument
        {
            activeTintColor: Colors.accentColor,
            shifting: true
        })
    : createBottomTabNavigator(
        //1st argument
        tabsScreenConfig,
        //2nd argument
        {
            tabBarOptions: {
                labelStyle: {
                    fontFamily: 'song'
                },
                activeTintColor: Colors.accentColor
            }
        });


/*******DRAWER******/
const MainNavigator = createDrawerNavigator({
    MealsFavs: {
        screen: MealsTabFavNavigator,
        navigationOptions: {
            drawerLabel: <DefaultText>Meals</DefaultText>
        }
    },
    Filters: {
        screen: FiltersNavigator,
        navigationOptions: {
            drawerLabel: <DefaultText>Filters</DefaultText>
        }}
}, {
    contentOptions: {
        activeBackgroundColor: Colors.accentColor,
        /*labelStyle: {
            fontFamily: 'summer',
            fontSize: 30
        }*/
    }
});
const styles = StyleSheet.create({
    content: {
        padding: 20
    }
});
export default createAppContainer(MainNavigator); //Route navigator