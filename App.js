import React, { Component } from "react";
import { StyleSheet, View, Animated, PanResponder } from "react-native";

export default class animations extends Component {
  state = {
    animation: new Animated.ValueXY(0),
  }

  componentWillMount() {

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([
        null,
        {
          dx: this.state.animation.x,
          dy: this.state.animation.y,
        }
      ]),
      onPanResponderRelease:  (e, { vx, vy }) => {
        Animated.decay(this.state.animation, {
          velocity: { x: vx, y: vy },
        }).start();
      },
      onPanResponderGrant: (e, gestureEvent) => {
        this.state.animation.extractOffset()
      }
    });
  }
  render() {
    const animatedStyle = {
      transform: this.state.animation.getTranslateTransform()
    }

    return (
      <View style={styles.container}>
          <Animated.View
            style={[styles.content, animatedStyle]}
            { ...this._panResponder.panHandlers }
          />
      </View>
    );

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    height: 50,
    width: 50,
    backgroundColor: 'red'
  }
});