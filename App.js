import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./redux/reducers";
import thunk from "redux-thunk";

import { auth } from "./firebaseConfig";

import { Landing, Register, Login } from "./components/auth";
import { Main, Add, Save } from "./screens";
import { LoadingAnimation } from "./components";

const store = createStore(rootReducer, applyMiddleware(thunk));
const Stack = createStackNavigator();

const App = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    let mounted = true;
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setIsLoading(false);
        setLoggedIn(true);
      }
    });
  }, []);

  if (isLoading) {
    return <LoadingAnimation />;
  }

  return (
    <>
      {loggedIn ? (
        <Provider store={store}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Feed">
              <Stack.Screen
                name="Feed"
                component={Main}
                options={{ headerShown: false }}
                navigation={navigation}
              />
              <Stack.Screen
                name="Add"
                component={Add}
                navigation={navigation}
              />
              <Stack.Screen
                name="Save"
                component={Save}
                navigation={navigation}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
      ) : (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen
              name="Landing"
              component={Landing}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </>
  );
};

export default App;
