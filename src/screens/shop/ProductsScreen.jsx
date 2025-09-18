import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native'
import { useEffect, useState } from 'react'
import KarlaRegularText from '../../components/KarlaRegularFont'
import Search from '../../components/Search'
import { useSelector,useDispatch } from 'react-redux'
import { setProductSelected } from '../../store/slices/shopSlice'
import { useGetProductsByCategoryQuery } from '../../services/shopApi'
import FlatCard from '../../components/FlatCard';
import { colors } from '../../global/colors';

const ProductsScreen = ({ navigation, route }) => {
    const [productsFiltered, setProductsFiltered] = useState([])
    const [keyword, setKeyword] = useState("")

    const category = useSelector(state=>state.shopReducer.categorySelected)

    const {data:productsFilteredByCategory, isLoading, error} = useGetProductsByCategoryQuery(category.toLowerCase())

    const dispatch = useDispatch()

    const handleSelectProduct = (product) => {
        dispatch(setProductSelected(product))
        navigation.navigate("Producto")
    }

    const renderProductsItem = ({ item }) => (
        <View>
            <Pressable onPress={() => handleSelectProduct(item)}>
            <FlatCard style={styles.cardCustom}>
                    <Text style={{ fontSize: 16 }}>{item.title}</Text>
                    
                </FlatCard>

            </Pressable>
        </View>

    )

    useEffect(() => {
        if (keyword) { //Re-filtramos la lista de productos según la búsqueda del usuario
            const productsFilteredByKeyword = productsFilteredByCategory.filter(product => product.title.toLowerCase().includes(keyword.toLocaleLowerCase()))
            setProductsFiltered(productsFilteredByKeyword)
        } else {
            setProductsFiltered(productsFilteredByCategory)
        }
    }, [category, keyword,productsFilteredByCategory])

    return (
        <View >
            <Search setKeyword={setKeyword} />
            <FlatList
                data={productsFiltered}
                keyExtractor={item => item.id}
                renderItem={renderProductsItem}
            />
        </View>
    )
}


export default ProductsScreen

const styles = StyleSheet.create({
    cardCustom: {
        backgroundColor: colors.grayCard,
    },title:{
        fontFamily:"Roboto-Bold"
    }
})