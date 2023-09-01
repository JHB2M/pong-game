import React,{useState,useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import colors from '../../constants/colors';
import Animated, {
    interpolateColor,
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useDerivedValue,
    useSharedValue,
    runOnJS
  } from 'react-native-reanimated';
  import {
    GestureHandlerRootView,
    PanGestureHandler,
    PanGestureHandlerGestureEvent,
  } from 'react-native-gesture-handler';

const Block = ({x,y}:{x:number,y:number}) => {



  return (
      <View style={[styles.container,{left:x,bottom:y}]}/>
  );
};

export default Block;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: 80,
    backgroundColor: colors.secondBlock,
    height: 15,
  },
});
