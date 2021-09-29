import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Feather } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';
import { AuthContext } from '../../App';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export function TabBar({ navigation }) {
  const { signOut } = useContext(AuthContext);
  const [menu, toggleMenu] = useState(false)
  const offset = useSharedValue(1);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: withTiming(offset.value * -windowHeight, {
        duration: 500,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),

      })}],
    };
  });
  function hideMenu() {
    offset.value = 1
    toggleMenu(false)
  }
  function goTo(view) {
    navigation.navigate(view)
    hideMenu()
  }
  return (
    <>
      {menu && (<View style={styles.container}>
        <Animated.View style={[styles.background, animatedStyles]}>
          <BlurView intensity={50} tint="dark" style={styles.blur}>

          </BlurView>

        </Animated.View>
        <View style={styles.iconsView}>
          <View style={{ width: 274, flexDirection: "row", flexWrap: "wrap", marginBottom: 94}}>
            <TouchableOpacity onPress={() => goTo('Dashboard')}>
              <View style={styles.icons}>
                <Feather name="home" size={24} color="#10BF21" />
              </View>
              <Text style={styles.textTab}>Inicio</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => goTo('BankAccount')}>
              <View style={styles.icons}>
                <Feather name="user" size={24} color="#10BF21" />
              </View>
              <Text style={styles.textTab}>Mi Cuenta</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => goTo('Red')}>
              <View style={styles.icons}>
                <Feather name="users" size={24} color="#10BF21" />
              </View>
              <Text style={styles.textTab}>Mi Red</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => goTo('Extract')}>
              <View style={styles.icons}>
                <Feather name="dollar-sign" size={24} color="#10BF21" />
              </View>
              <Text style={styles.textTab}>Extracto{'\n'}General</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.icons}>
                <Feather name="shopping-cart" size={24} color="#10BF21" />
              </View>
              <Text style={styles.textTab}>Tienda</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.icons}>
                <Feather name="download-cloud" size={24} color="#10BF21" />
              </View>
              <Text style={styles.textTab}>Download</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.icons}>
                <Feather name="headphones" size={24} color="#10BF21" />
              </View>
              <Text style={[styles.textTab, {marginBottom: 0}]}>Soporte{'\n'}Técnico</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => signOut()}>
              <View style={styles.icons}>
                <Feather name="power" size={24} color="#10BF21" />
              </View>
              <Text style={[styles.textTab, {marginBottom: 0}]}>Salir</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => hideMenu()}>
            <Feather name="x" size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>

        
      </View>)}
      <View style={styles.navigatorContainer}>
        <View style={styles.otherTabs}>
          <TouchableOpacity onPress={() => goTo('Dashboard')}>
            <Feather name="home" size={24} color="#005851" />
          </TouchableOpacity>
        </View>
        <View style={styles.otherTabs}>
          <TouchableOpacity>
            <Feather name="user" size={24} color="#005851" />
          </TouchableOpacity>
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <TouchableOpacity style={styles.button} onPress={() => {offset.value = 0; toggleMenu(true)}}>
            <Feather name="plus" size={24} color="white" />
          </TouchableOpacity>
          <TabBg></TabBg>
        </View>
        <View style={styles.otherTabs}>
          <TouchableOpacity>
            <Feather name="users" size={24} color="#005851" />
          </TouchableOpacity>
        </View>
        <View style={styles.otherTabs}>
          <TouchableOpacity onPress={() => signOut()}>
            <Feather name="power" size={24} color="#005851" />
          </TouchableOpacity>
        </View>
        <View style={[
          styles.xFillLine, {
            backgroundColor: '#ffffff'
          }
        ]}>
        </View>
      </View>
    </>
  )
}
const styles = StyleSheet.create({
    container: {
      height: windowHeight,
      width: windowWidth,
      position: 'absolute', 
      top: 0,
      zIndex: 1,
      // backgroundColor: '#dddddd'
    },
    background: {
      backgroundColor: "#005851e6",
      height: windowHeight,
      width: windowWidth,
      position: 'absolute', 
      top: 0,
      zIndex: 1
    },
    blur : {
      width: "100%",
      height: "100%",
    },
    iconsView: {
      height: windowHeight,
      width: windowWidth,
      position: 'absolute', 
      top: 0,
      zIndex: 2,
      justifyContent: 'center',
      alignItems: 'center',
      // backgroundColor: "red"
    },
    icons: {
      width: 72,
      height: 72,
      marginHorizontal: 32.5,
      marginBottom: 16,
      backgroundColor: "#fff",
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    otherTabs: {
      backgroundColor: '#ffffff',
      height: 61,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    navigatorContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      width: '100%',
      flexDirection: 'row',
      flexWrap: "wrap",
      // SHADOW
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 0,
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
      height: 10
    },
    button: {
      width: 54,
      height: 54,
      borderRadius: 29,
      backgroundColor: '#10BF21',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      bottom: 33,
    },
    textTab: {
      fontWeight: '500',
      fontSize: 13,
      textAlign: 'center',
      marginBottom: 50,
      color: 'white',
    }
  });
  // console.log(windowWidth);
const TabBg = ({
    color = '#FFFFFF',
    ...props
  }) => {
    return (
      <Svg
        width={75}
        height={61}
        viewBox="0 0 75 61"
        {...props}
      >
        <Path
          d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
          fill={color}
        />
      </Svg>
    )
  };
  const TabBarAdvancedButton = ({
    bgColor,
    ...props
  }) => (
    <View
      style={styles.container}
      pointerEvents="box-none"
    >
      <TabBg
        color={bgColor}
        style={styles.background}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={props.onPress}
      >
        <Icon
          name="rocket"
          style={styles.buttonIcon}
        />
      </TouchableOpacity>
    </View>
  );
  