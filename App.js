import React from 'react';
import { StyleSheet, Text, View, Animated, Easing, TouchableWithoutFeedback } from 'react-native';
 
export default class App extends React.Component {
  state = {
    animation: new Animated.Value(0),
  };

  startAnimation = () => {
    this.state.animation.addListener(({ value }) => this._value = value);
    const toValue = 115;

    if (this.state.animation._value === 0) {
      Animated.loop(this.state.animation, {
        toValue,
        duration: 650,
        tension: 2,
        friction: 450,
        // easing: Easing.back(15),
        // easing: Easing.bounce
        // easing: Easing.elastic(3)
        // easing: Easing.bezier(.06,1,.86,.23)
      }).start();
    } else {
      Animated.loop(this.state.animation, {
        toValue: 0,
        duration: 650,
        tension: 0,
        friction: 160,
        // easing: Easing.back(15),
        // easing: Easing.bounce
        // easing: Easing.elastic(3)
        // easing: Easing.bezier(.06,1,.86,.23)
      }).start();
    }
    
  };

  render() {
    const animatedStyles = {
      transform: [{ translateY: this.state.animation }],
      backgroundColor: this.state.animation.interpolate({ inputRange: [0, 85], outputRange: ['rgb(255, 0, 0)', 'rgb(0, 255, 0)']})
    };
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this.startAnimation}>
          <Animated.View style={[styles.box, animatedStyles]} />
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  box: {
    width: 150,
    height: 150,
    backgroundColor: "tomato",
  },
});
