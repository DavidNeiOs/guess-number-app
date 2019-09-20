import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  Button,
  Alert,
  ScrollView,
  FlatList,
  Dimensions
} from "react-native";
import NumberContainer from "../components/numberContainer";
import Card from "../components/card";
import TitleText from "../components/titleText";
import BodyText from "../components/bodyText";

const renderListItem = (listLength, itemData) => (
  <View key={itemData.index} style={styles.listItem}>
    <BodyText>Guess # {listLength - itemData.index}: </BodyText>
    <BodyText>{itemData.item}</BodyText>
  </View>
);

const generateRandomBetween = (min: number, max: number, exclude: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNumber = Math.floor(Math.random() * (max - min)) + min;
  if (rndNumber === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNumber;
  }
};

interface GameScreenProps {
  userChoice: number;
  onGameOver: (num: number[]) => void;
}

const GameScreen = ({ userChoice, onGameOver }: GameScreenProps) => {
  let initialGuess = generateRandomBetween(1, 100, userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setpastGuesses] = useState([initialGuess]);

  const currentLow = useRef(1);
  const currentHigh = useRef(99);

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses);
    }
  }, [currentGuess, userChoice, onGameOver]);
  const nextGuessHandler = (direction: string) => {
    if (
      (direction === "lower" && currentGuess < userChoice) ||
      (direction === "greater" && currentGuess > userChoice)
    ) {
      Alert.alert("Wrong hint", "That will never work", [
        { text: "Try the other option", style: "cancel" }
      ]);
      return;
    }
    if (direction === "lower") {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess;
    }
    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    //setRounds(currRounds => currRounds + 1);
    setpastGuesses(currPastGuesses => [...currPastGuesses, nextNumber]);
    setCurrentGuess(nextNumber);
  };
  return (
    <View style={styles.screen}>
      <TitleText>Opponents Guess</TitleText>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <Button title="LOWER" onPress={() => nextGuessHandler("lower")} />
        <Button title="GREATER" onPress={() => nextGuessHandler("greater")} />
      </Card>
      <View style={styles.listContainer}>
        {/* <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses
            .reverse()
            .map((pastGuess, index) =>
              renderListItem(pastGuess, pastGuesses.length - index)
            )}
        </ScrollView> */}
        <FlatList
          keyExtractor={item => item.toString()}
          data={pastGuesses.reverse()}
          renderItem={renderListItem.bind(this, pastGuesses.length)}
          contentContainerStyle={styles.list}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center"
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: Dimensions.get("window").height > 600 ? 20 : 10,
    width: 300,
    maxWidth: "80%"
  },
  listContainer: {
    flex: 1,
    width: Dimensions.get("window").width > 500 ? "60%" : "80%"
  },
  list: {
    justifyContent: "flex-end",
    flexGrow: 1
  },
  listItem: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%"
  }
});

export default GameScreen;
