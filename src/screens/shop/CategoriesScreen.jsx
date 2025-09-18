import { StyleSheet, Text, View, Image, FlatList,Pressable } from 'react-native'
import FlatCard from '../../components/FlatCard';
import { useSelector,useDispatch } from 'react-redux';
import { setCategorySelected } from '../../store/slices/shopSlice';
import { useGetCategoriesQuery } from '../../services/shopApi';
import { colors } from '../../global/colors';

const CategoriesScreen = ({navigation}) => {

    const {data:categories, isLoading, error} = useGetCategoriesQuery()

    const dispatch = useDispatch()

    const handleSelectCategory = (category)=>{
        dispatch(setCategorySelected(category))
        navigation.navigate("Productos")
    }

    const renderCategoryItem = ({ item }) => {
        return (
            <Pressable onPress={()=>handleSelectCategory(item.title)}>
                <FlatCard style={styles.cardCustom}>
                    <Text style={styles.title}>{item.title.toUpperCase()}</Text>
                    <Image width={120} height={50} source={{ uri: item.image }} resizeMode='contain' />
                </FlatCard>
            </Pressable>
        )
    }
    return (
        <FlatList
            data={categories}
            renderItem={renderCategoryItem}
            keyExtractor={item => item.id}
        />
    )
}

export default CategoriesScreen

const styles = StyleSheet.create({
    cardCustom: {
       backgroundColor: colors.grayCard,
    },title:{
        fontFamily:"Roboto-Bold",
        fontSize:20,
        fontWeight:"700",
    }
})