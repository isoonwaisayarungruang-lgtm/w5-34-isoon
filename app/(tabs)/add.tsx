import  {View,TextInput,Button,StyleSheet,Text,FlatList} from "react-native";
import { useState,useEffect } from "react"; 
import AsyncStorge from "@react-native-async-storage/async-storage";

type Book ={id :string,name : string,price : string}

export default function  add
(){
    const [bookName,setBookName] = useState<string>("")
    const [bookPrice,setBookPrice] = useState<string>("")
    const [allBooks,setAllBooks] = useState<Book[]>([])

    useEffect(() =>{
        loadBook()
    },[allBooks])

    async function loadBook(){
        const data = await AsyncStorge.getItem("book")
        if(data !== null){
            setAllBooks (JSON.parse(data))
        }
    }

    async function addBook(){
        const Book = {
            id: Date.now().toString(),
            name: bookName,
            price: bookPrice
        }
        console.log(Book)

     const newBook = [...allBooks,Book]
     await AsyncStorge.setItem("book",JSON.stringify (newBook))
     setAllBooks(newBook)
     setBookName("")
     setBookPrice("")
    } 

    return(
        <View style={{ backgroundColor:"lightblue",flex:1,alignItems:"center",gap:10}}>
            <Text>ชื่อหนังสือ</Text>
            <TextInput  value={bookName} onChangeText={setBookName}  style={mystyle.input}/>
            <Text>ราคาหนังสือ</Text>
            <TextInput  value={bookPrice} onChangeText={setBookPrice}  style={mystyle.input}/>
            <Button title="บันทึก" onPress={() => addBook()}  />
        </View>
    )
}

const mystyle = StyleSheet.create({
    input:{
        borderWidth:1,
        width:"80%",
        gap:10
    }


})