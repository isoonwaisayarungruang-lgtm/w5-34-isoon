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
        <View style={mystyle.container}>
            <View style={mystyle.container1}>
            <Text  style={mystyle.text}>ชื่อหนังสือ</Text>
            <TextInput  value={bookName} onChangeText={setBookName}  style={mystyle.input}/>
            <Text style={mystyle.text}>ราคาหนังสือ</Text>
            <TextInput  value={bookPrice} onChangeText={setBookPrice}  style={mystyle.input}/>
            <Button title="บันทึก" onPress={() => addBook()}  />

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