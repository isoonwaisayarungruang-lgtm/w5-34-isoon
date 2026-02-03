import { View,Text, FlatList , TouchableOpacity} from "react-native";
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
        <View style={{ backgroundColor:"lightpink",flex:1,gap:10}}>
            <FlatList
                data={allBooks}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View>
                        <Text> รหัส: {item.id}</Text>
                        <Text>เรื่อง: {item.name}</Text>
                        <Text>ราคา: {item.price}</Text>
                        <TouchableOpacity onPress={() => removeBook(item.id)}>
                            <Text style={{ color: "red" }}>ลบ</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />

        </View>
    )
}