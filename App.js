import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import categories from './src/data/categories.json'
import Header from './src/components/Header';
import FlatCard from './src/components/FlatCard';

export default function App() {
  const renderCategoryItem = ({ item }) => {
    console.log(item)
    return (
      <FlatCard>
        <Text>{item.title}</Text>
        <Image width={120} height={50} source={{ uri: item.image }} resizeMode='contain' />
      </FlatCard>
    )
  }
  return (
    <View style={styles.container}>
      <Header title="Mundo Geek" />
      <FlatList
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={item => item.id}
      />
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});