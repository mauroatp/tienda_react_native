
import { StyleSheet, View, Text, SafeAreaView, Image } from 'react-native';

const constructionImage = { uri: 'https://cdn-icons-png.flaticon.com/512/3233/3233215.png' };


const SignupScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image source={constructionImage} style={styles.image} />
        <Text style={styles.title}>¡Estamos trabajando!</Text>
        <Text style={styles.description}>
          Esta pantalla está actualmente en construcción. Vuelve pronto para ver las novedades.
        </Text>
      </View>
    </SafeAreaView>
  );
}

export default SignupScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
    tintColor: '#FFD700',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    lineHeight: 24,
  },
});