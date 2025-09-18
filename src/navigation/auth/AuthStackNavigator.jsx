import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginScreen, SignupScreen } from "../../screens";

const Stack = createNativeStackNavigator()

const AuthStackNavigator = props => {
  return (
    <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
                headerShown:false
            }
            }
        >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
        </Stack.Navigator>
  )
}

export default AuthStackNavigator