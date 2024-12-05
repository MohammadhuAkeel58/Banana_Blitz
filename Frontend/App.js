import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import WelcomeScreen from "./Screens/Welcome";
import SignInScreen from "./Screens/SignIn";
import SignUpScreen from "./Screens/SignUp";
import ProfileScreen from "./Screens/Profile";
import BananaGameScreen from "./Screens/GameScreen";
import LeaderboardScreen from "./Screens/LeaderBoard";
import InstructionScreen from "./Screens/Instruction";

const Drawer = createDrawerNavigator();

function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Welcome">
        <Drawer.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{
            headerShown: false,
            title: "Welcome",
            drawerLabel: "Starter",
            drawerActiveTintColor: "#333",
            drawerActiveBackgroundColor: "#FFFF",
            drawerContentStyle: {
              backgroundColor: "#F6F31F",
            },
          }}
        />
        <Drawer.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{
            headerShown: false,
            title: "SignUp",
            drawerLabel: "SignUp",
            drawerActiveTintColor: "#333",
            drawerActiveBackgroundColor: "#FFFF",
            drawerContentStyle: {
              backgroundColor: "#F6F31F",
            },
          }}
        />
        <Drawer.Screen
          name="SignIn"
          component={SignInScreen}
          options={{
            headerShown: false,
            title: "SignIn",
            drawerLabel: "SignIn",
            drawerActiveTintColor: "#333",
            drawerActiveBackgroundColor: "#FFFF",
            drawerContentStyle: {
              backgroundColor: "#F6F31F",
            },
          }}
        />
        <Drawer.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            headerShown: false,
            title: "Profile",
            drawerLabel: "Profile",
            drawerActiveTintColor: "#333",
            drawerActiveBackgroundColor: "#FFFF",
            drawerContentStyle: {
              backgroundColor: "#F6F31F",
            },
          }}
        />
        <Drawer.Screen
          name="Instruction"
          component={InstructionScreen}
          options={{
            headerShown: false,
            title: "Game Instruction",
            drawerLabel: "Instructions",
            drawerActiveTintColor: "#333",
            drawerActiveBackgroundColor: "#FFFF",
            drawerContentStyle: {
              backgroundColor: "#F6F31F",
            },
          }}
        />
        <Drawer.Screen
          name="GameScreen"
          component={BananaGameScreen}
          options={{
            headerShown: false,
            title: "Banana Twist",
            drawerLabel: "Game",
            drawerActiveTintColor: "#333",
            drawerActiveBackgroundColor: "#FFFF",
            drawerContentStyle: {
              backgroundColor: "#F6F31F",
            },
          }}
        />
        <Drawer.Screen
          name="leaderBoard"
          component={LeaderboardScreen}
          options={{
            headerShown: false,
            title: "Leaderboard",
            drawerLabel: "LeaderBoard",
            drawerActiveTintColor: "#333",
            drawerActiveBackgroundColor: "#FFFF",
            drawerContentStyle: {
              backgroundColor: "#F6F31F",
            },
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
