import {StyleSheet, Text, View} from 'react-native'
import {colors} from '../global/colors'

const Header = ({title}) => {
  return (
    <view style={StyleSheet.container}>
        <Text style={StyleSheet.title}>{title}</Text>
    </view>
  )
}

export default Header

const styles = StyleSheet.create({
    container:{
        backgroundColor: colors.purple,
        height: 150,
        justifyContent:"center",
        alignItems:"center"
    },
    title:{
        fontSize:24,
        color:colors.white
    }
})