import { View, Text, Button, FlatList, TextInput } from 'react-native';
import { useState, useEffect } from 'react';

export default function App() {
  const [pantalla, setPantalla] = useState("menu");
  const [data, setData] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(res => res.json())
      .then(json => setData(json));
  }, []);

  const filtrar = () => {
    return data.filter(item =>
      item.title.toLowerCase().includes(busqueda.toLowerCase())
    );
  };

  if (pantalla === "menu") {
    return (
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 20 }}>MENÚ PRINCIPAL</Text>

        <Button 
          title="Ir a lista" 
          onPress={() => setPantalla("lista")} 
        />
      </View>
    );
  }

  if (pantalla === "lista") {
    return (
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 20 }}>LISTA API</Text>

        <TextInput
          placeholder="Buscar..."
          value={busqueda}
          onChangeText={setBusqueda}
          style={{ borderWidth: 1, marginVertical: 10, padding: 5 }}
        />

        <FlatList
          data={filtrar()}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <Text>{item.title}</Text>}
        />

        <Button 
          title="Volver" 
          onPress={() => setPantalla("menu")} 
        />
      </View>
    );
  }
}