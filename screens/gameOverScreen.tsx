import React from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";
import Bodytext from "../components/bodyText";
import TitleText from "../components/titleText";
import MainButton from "../components/mainButton";

interface GameOverProps {
  roundsNumber: number;
  userNumber: number;
  restartGame: () => void;
}

const GameOverScreen = (props: GameOverProps) => {
  return (
    <View style={styles.screen}>
      <TitleText>The game is over!</TitleText>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require("../assets/success.png")}
          resizeMode="cover"
        />
      </View>
      <Bodytext>Number of rounds: {props.roundsNumber}</Bodytext>
      <Bodytext>Number was: {props.userNumber} </Bodytext>
      <MainButton onPress={props.restartGame}>Start Again</MainButton>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  imageContainer: {
    width: Dimensions.get("window").width * 0.7,
    height: Dimensions.get("window").width * 0.7,
    borderRadius: (Dimensions.get("window").height * 0.7) / 2,
    borderWidth: 3,
    borderColor: "black",
    overflow: "hidden",
    marginVertical: Dimensions.get("window").height / 20
  },
  image: {
    width: "100%",
    height: "100%"
  }
});

export default GameOverScreen;
