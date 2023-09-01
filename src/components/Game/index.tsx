import React, {useState, useEffect} from 'react';
import {Text, Alert, View, StyleSheet, useWindowDimensions} from 'react-native';
import colors from '../../constants/colors';
import Block from '../Block';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Ball from '../Ball';
import {ICoordinate, IDirection} from '../../constants/types';
import Colliusion from '../../utils/Colliusion';
import Picth from '../../utils/Picth';

const INITIAL_BALL_POSITION = {x: 140, y: 15};
const INITIAL_BALL_DIRECTION = null;

const Game = () => {
  const [ball, setBall] = useState<ICoordinate>({x: 150, y: 500});
  const [block, setBlock] = useState<ICoordinate>({x: 0, y: 630});
  const [pitch, setPitch] = useState<number>(1);
  const [colliusion, setCollusion] = useState(
    Colliusion(ball.x, ball.y, block.x, block.y),
  );
  const [colliusionOfRightBlock, setCollusionOfRightBlock] = useState(
    Colliusion(ball.x, ball.y, block.x, block.y),
  );
  const [isHitted, setIsHitted] = useState(false);
  const [isHittedUpBlock, setIsHittedUpBlock] = useState(false);
  const [isHittedLeft, setIsHittedLeftBlock] = useState(false);
  const [isHiteedRightBlock, setIsHittedRightBlock] = useState(false);

  const [ballDirection,setBallDirection]  =useState({x:5,y:5})

  useEffect(() => {
    const intervalId = setInterval(() => {

      MoveBall();
    }, 1444);
    return () => clearInterval(intervalId);
  }, [ball, block]);


  function ClearHitted(down:boolean,right:boolean,up:boolean,left:boolean){
    setIsHitted(down)
    setIsHittedLeftBlock(left)
    setIsHittedRightBlock(right)
    setIsHittedUpBlock(up)
  }
   console.log('COLLİSON : ' ,Colliusion(255,605,238,630))
  function SetDirection(){
    const collOfDown = Colliusion(ball.x,ball.y,block.x,block.y)
    const collOfRight = Colliusion(ball.x,0,380,0)
    const collOfLeft = Colliusion(ball.x,0,0,0)
    const collOfUp = Colliusion(0,ball.y,0,0)
    if(collOfDown<30 && !isHitted){
      const pitch =  (block.y-ball.y)/(block.x-ball.x)
      console.log(' X : ', ball.x ,' Y : '  ,ball.y)
      setBallDirection({x:5,y:-5})
      ClearHitted(true,false,false,false)

    }
    if(collOfRight<20 && !isHiteedRightBlock){
      setBallDirection({x:-5,y:-5})
      ClearHitted(false,true,false,false)

    }
    if(collOfLeft<20 && !isHittedLeft){
      setBallDirection({x:5,y:-5})
      ClearHitted(false,false,false,true)
    }
    if(collOfUp<20 && !isHittedUpBlock){
      setBallDirection({x:5,y:5})
      ClearHitted(false,false,true,false)
      
    }

  }
  console.log(Math.sqrt(3))
  function MoveBall() {
    SetDirection()
     const newBall = {...ball} 
     newBall.x +=ballDirection.x
     newBall.y +=ballDirection.y
     setBall(newBall)
  }

  const handleGesture = (event: PanGestureHandlerGestureEvent) => {
    const {absoluteX} = event.nativeEvent;
    const newBlock = {...block};
    newBlock.x = absoluteX;
    setBlock(newBlock);
  };

  return (
    <View style={styles.container}>
      <View style={styles.gameArea}>
        <View style={styles.topBlock} />
        <View style={styles.leftBlock} />
        <View style={styles.rightBlock} />
        <Ball x={ball.x} y={ball.y} />

        <PanGestureHandler onGestureEvent={handleGesture}>
          <View
            style={[
              {position: 'absolute', left: block.x, top: block.y},
              styles.block,
            ]}
          />
        </PanGestureHandler>
      </View>
    </View>
  );
};

export default Game;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    paddingVertical: 44,
    paddingHorizontal: 10,
  },
  gameArea: {
    borderRadius: 10,
    backgroundColor: '#445069',
    alignSelf: 'center',
    height: '90%',
    width: '100%',
  },
  block: {
    position: 'absolute',
    width: 80,
    backgroundColor: colors.secondBlock,
    height: 15,
  },
  topBlock: {
    width: '100%',
    backgroundColor: colors.secondBlock,
    height: 15,
  },
  leftBlock: {
    position: 'absolute',
    width: 15,
    backgroundColor: colors.secondBlock,
    height: '100%',
    borderBottomLeftRadius: 10,
  },
  rightBlock: {
    position: 'absolute',
    left: 380,
    width: 15,
    backgroundColor: colors.secondBlock,
    height: '100%',
    borderBottomRightRadius: 10,
  },
});
