import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Game } from "./src/components";

export default function App (){

  return(
    <GestureHandlerRootView style ={{flex:1}}>
       <Game/>
    </GestureHandlerRootView>
  )
}