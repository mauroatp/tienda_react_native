import { FlatList, StyleSheet, Text, View, Image, Pressable ,  SafeAreaView, TouchableOpacity, Alert} from 'react-native'
import { colors } from '../../global/colors'
import FlatCard from '../../components/FlatCard'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useSelector, useDispatch } from 'react-redux'
import { removeItemFromCart, clearCart } from '../../store/slices/cartSlice' 
import Toast from 'react-native-toast-message';

const emptyCartImage = { uri: 'https://cdn-icons-png.flaticon.com/512/3233/3233215.png' };

const CartScreen = () => {
  const cartItems = useSelector(state=>state.cartReducer.cartItems)
  const total = useSelector(state=>state.cartReducer.total)
  const dispatch = useDispatch() 

  const handleRemoveItem = (item) => {
    Alert.alert(
      "Confirmar eliminación",
      `¿Estás seguro de que quieres eliminar "${item.title}"?`, 
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Eliminar",
          onPress: () => {
            dispatch(removeItemFromCart(item.id)),
            Toast.show({
                                    type: 'success',
                                    text1: '¡Producto eliminado!',
                                    text2: `${item.title} se ha eliminado del carrito.`,
                                    visibilityTime: 2500,
                                    position: 'bottom'
                                });
          }
        }
      ],
      { cancelable: false }
    );
  };
  
  const handleConfirmPurchase = () => {

    dispatch(clearCart());
    
    Toast.show({
      type: 'success',
      text1: '¡Compra confirmada!',
      text2: 'Tu pedido ha sido procesado con éxito.',
      visibilityTime: 3000,
      position: 'top'
    });
  };

  const FooterComponent = () => (
    <View style={styles.footerContainer}>
      <Text style={styles.footerTotal}>Total: $ {total} </Text>
      <Pressable style={styles.confirmButton} onPress={handleConfirmPurchase} >
        <Text style={styles.confirmButtonText}>Comprar</Text>
        
      </Pressable>
    </View>
  )

  const renderCartItem = ({ item }) => (
    <FlatCard style={styles.cartContainer}>
      <View>
        <Image
          source={{ uri: item.mainImage }}
          style={styles.cartImage}
          resizeMode='cover'
        />
      </View>
      <View style={styles.cartDescription}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.shortDescription}</Text>
        <Text style={styles.price}>Precio unitario: $ {item.price}</Text>
        <Text stlyle={styles.quantity}>Cantidad: {item.quantity}</Text>
        <Text style={styles.total}>Total: $ {item.quantity * item.price}</Text>
        <Pressable onPress={() => handleRemoveItem(item)}>
          <Icon name="delete" size={24} color={colors.red} style={styles.trashIcon} />
        </Pressable>
      </View>
    </FlatCard>
  )

  return (
    <>
      {
        cartItems.length>0
          ?
          <FlatList
            data={cartItems}
            keyExtractor={item => item.id}
            renderItem={renderCartItem}
            ListHeaderComponent={<Text style={styles.cartScreenTitle}>Tu carrito:</Text>}
            ListFooterComponent={<FooterComponent />}
          />

          :
          <SafeAreaView style={styles.container}>
            <View style={styles.content}>
              <Image source={emptyCartImage} style={styles.image} />
              <Text style={styles.title}>Tu carrito está vacío</Text>
              <Text style={styles.description}>
                Parece que no has añadido ningún vehículo todavía. ¡Explora nuestra selección y encuentra tu auto ideal!
              </Text>
            </View>
          </SafeAreaView>
      }
    </>
  )
}

export default CartScreen

const styles = StyleSheet.create({
  cartContainer: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: "flex-start",
    margin: 16,
    alignItems: "center",
    gap: 10
  },
  cartImage: {
    width: 80,
    height: 80
  },
  cartDescription: {
    width: '80%',
    padding: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: '700'
  },
  description: {
    marginBottom: 16,
  },
  total: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: '700'
  },
  trashIcon: {
    alignSelf: 'flex-end',
    marginRight: 16,
  },
  footerContainer: {
    padding: 32,
    gap: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  footerTotal: {
    fontSize: 16,
    fontWeight: '700'
  },
  confirmButton: {
    padding: 8,
    paddingHorizontal: 16,
    backgroundColor: colors.blue,
    borderRadius: 16,
    marginBottom: 24,
  },
  confirmButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700'
  }, cartScreenTitle: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: "center",
    paddingVertical: 8
  },

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
    tintColor: '#a9a9a9',
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
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  }

})