import React,{useState,useEffect} from 'react';
import { Text, View, StyleSheet } from 'react-native';

const Ball = ({x,y}:{x:number,y:number}) => {
  return (
    <View style={[styles.container,{top:y,left :x}]}/>
  );
};

export default Ball;

const styles = StyleSheet.create({
  container: {
    height:15,
    width:15,
    backgroundColor:'white',
    borderRadius:8,
    position: 'absolute',
  }
});
