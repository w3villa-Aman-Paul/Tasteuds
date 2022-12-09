import { Text, View } from "react-native";

export const toastConfig = {
    'success': (internalState) => (
      <View style={{ height: 60, width: '100%', backgroundColor: 'pink' }}>
        <Text>{internalState.text1}</Text>
      </View>  
    ),
    'error': (internalState) => (
      <View style={{ height: 60, width: '100%', backgroundColor: "#363652", padding : 5, borderRadius: 5,  justifyContent: 'center' ,alignItems: 'center'}}>
        <Text numberOfLines={2} style={{color: "#fff", textAlign: 'center'}}>{internalState.text2}</Text>
      </View>  
    ),
  }