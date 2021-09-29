import React, { useEffect, useMemo, createContext, useReducer } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator, BottomTabBar } from '@react-navigation/bottom-tabs';
import { 
  getItemAsync, 
  setItemAsync, 
  deleteItemAsync 
} from 'expo-secure-store';
import { Login } from './src/views/login';
import { Register } from './src/views/register';
import { Dashboard } from './src/views/dashboard';
import { Extract } from './src/views/extract';
import { Red } from './src/views/red';
import { BankAccount } from './src/views/bankAccount';
import {api} from './src/api'


export const AuthContext = createContext();
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
function HomeTabs() {
  return (
    <Stack.Navigator
    tabBar={(props) => (
      <View style={styles.navigatorContainer}>
        <BottomTabBar
          {...props}
        />
        {(
          <View style={[styles.xFillLine, {
            backgroundColor: '#fff'
          }]}/>
        )}
      </View>
    )}
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen 
        name="Dashboard" 
        component={Dashboard} 
      />
      <Stack.Screen 
        name="Extract" 
        component={Extract} 
      />
      <Stack.Screen 
        name="Red" 
        component={Red} 
      />
      <Stack.Screen 
        name="BankAccount" 
        component={BankAccount} 
      />
    </Stack.Navigator>
  );
}


export default function App() {
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );
  useEffect(() => {
    (async () => {
      let userToken;

      try {
            userToken = await getItemAsync('token');
      } catch (e) {
        // Tratar erro
      }

      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    })()

  }, []);

  const authContext = useMemo(
    () => ({
      signIn: async data => {
        const params = new URLSearchParams()
            params.append('username', data.username)
            params.append('password', data.password)
            params.append('action', 'LOGIN')
            const config = {    
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            }
            const response = await api.post('login.php', params, config);
            if (response.data.error) {
              return response.data.message
            } else {
                const token = response.data.token;
                await setItemAsync('token', token);
                dispatch({ type: 'SIGN_IN', token: token });
            }
      },
      signOut: async () => {
        await deleteItemAsync('token');
        dispatch({ type: 'SIGN_OUT' })
      },
      signUp: async data => {
        const params = new URLSearchParams()
        params.append('sponsor', data.sponsor)
        params.append('username', data.username)
        params.append('name', data.name)
        params.append('county', data.county)
        params.append('email', data.email)
        params.append('confirmEmail', data.confirmEmail)
        params.append('password', data.password)
        params.append('confirmPassword', data.confirmPassword)
        params.append('action', 'SIGNUP')
        const config = {    
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
    
        const response = await api.post('login.php', params, config)
        if(response.data.erro) {
          return response.data.message
        } else {
          const token = response.data.token;
          await setItemAsync('token', token);
          dispatch({ type: 'token', token: token });
        }
      },
    }),
    []
  );
  return (
    <AuthContext.Provider value={authContext}>    
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}      
        >
          {state.userToken == null ? (
              <>
                  <Stack.Screen name="Login" component={Login} />
                  <Stack.Screen name="Register" component={Register} />
              </> 
            ) : (
              <>
                <Stack.Screen name="HomeTabs" component={HomeTabs} />
              </>
            )
          }
        </Stack.Navigator>
      </NavigationContainer>
    
    </AuthContext.Provider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  navigatorContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    // SHADOW
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  navigator: {
    borderTopWidth: 0,
    backgroundColor: 'transparent',
    elevation: 30
  },
  xFillLine: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 34
  }
});
