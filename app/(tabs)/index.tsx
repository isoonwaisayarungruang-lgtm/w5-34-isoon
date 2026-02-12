import { View,Text, FlatList , TouchableOpacity,TextInput,Button,StyleSheet} from "react-native";
import { useState, useEffect } from "react";
import AsyncStorge from "@react-native-async-storage/async-storage";
type Book = { id: string, name: string, price: string }

export default function Home() {
    const [allBooks, setAllbook] = useState<Book[]>([])
    useEffect(() => {
        loadBook()
    }, [])

    async function loadBook() {
        const data = await AsyncStorge.getItem("book")
        if (data !== null) {
            setAllbook(JSON.parse(data))
        }
    }

    async function removeBook(id: string) {
        const newBooks = allBooks.filter((_, i) => _.id !== id)
        setAllbook(newBooks)
        await AsyncStorge.setItem("book", JSON.stringify(newBooks))
    }

    return (
        <View style={mystyle.container}>
            <View style={mystyle.container1}>
            <FlatList
                data={allBooks}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View>
                        <Text > รหัส: {item.id}</Text>
                        <Text>เรื่อง: {item.name}</Text>
                        <Text>ราคา: {item.price}</Text>
                        <TouchableOpacity style={mystyle.button}   onPress={() => removeBook(item.id)}>
                            <Text style={{ color: "red" }}>ลบ</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
            </View>
        </View>
   )
    
}
        
const mystyle = StyleSheet.create({
 container:{
    flex : 1,
    alignItems :"center",
    backgroundColor:"#FFE6EA"
 },
 container1:{
    width :"85%",
    backgroundColor:"white",
    height :250,
    marginTop :50,
    alignItems :"center",
    borderRadius:10,
    padding :20
 },
 input:{
    textAlign : "center",
    alignItems :"center",
    borderWidth: 1,
    width :"70%",
    borderRadius : 5
 },
 text:{
    fontWeight :600,
    margin :10
 },
 button:{
    backgroundColor :"B8D4FF",
    padding :8,
    marginTop :10,
    borderRadius : 5,
    width : 70,
    alignItems:"center"
 }

})