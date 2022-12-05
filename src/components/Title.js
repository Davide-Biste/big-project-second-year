import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";

export const Title = ({
                           text,
                           style,
                           ...props
                       }) => {
    return (
        <Text
            style={[styles.text, style]}
        >
            {text}
        </Text>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 30,
        fontWeight: "bold",
        color:"#184E77"
    },
});
