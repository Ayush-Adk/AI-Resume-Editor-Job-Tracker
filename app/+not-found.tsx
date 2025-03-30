import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View, ViewStyle, TextStyle } from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={styles.container}>
        <Text style={styles.text}>This screen doesn't exist.</Text>
        <Link href="/" style={styles.link}>
          <Text>Go to home screen!</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  } as ViewStyle, // Explicitly type as ViewStyle
  text: {
    fontSize: 20,
    fontWeight: '600', // Changed from 600 to "600"
  } as TextStyle, // Explicitly type as TextStyle
  link: {
    marginTop: 15,
    paddingVertical: 15,
  } as TextStyle, // Explicitly type as TextStyle
});
