import React from "react";
import { Text, StyleSheet, TextStyle } from "react-native";

interface BodyTextProps {
  children: React.ReactNode;
  style?: TextStyle;
}

const TitleText = (props: BodyTextProps) => {
  return (
    <Text style={{ ...styles.base, ...props.style }}>{props.children}</Text>
  );
};

const styles = StyleSheet.create({
  base: {
    fontFamily: "open-sans-bold",
    fontSize: 18
  }
});

export default TitleText;
