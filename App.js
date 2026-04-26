import { View, Text, Button, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';

export default function App() {
  const [pantalla, setPantalla] = useState("menu");
  const [datos, setDatos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [detalle, setDetalle] = useState(null);

  useEffect(() => {
    const datosEjemplo = [
      { id: 1, title: "Aprender programación", body: "Practica todos los días." },
      { id: 2, title: "Tecnología hoy", body: "La tecnología avanza rápido." },
      { id: 3, title: "Aplicaciones móviles", body: "Son esenciales actualmente." }
    ];
    setDatos(datosEjemplo);
  }, []);

  const filtrarDatos = () => {
    return datos.filter(item =>
      item.title.toLowerCase().includes(busqueda.toLowerCase())
    );
  };

  const estilos = {
    contenedor: {
      flex: 1,
      padding: 20,
      backgroundColor: "#ffffff"
    },
    titulo: {
      fontSize: 22,
      fontWeight: "bold",
      color: "#000"
    },
    texto: {
      color: "#000"
    },
    input: {
      borderWidth: 1,
      marginVertical: 10,
      padding: 8,
      color: "#000"
    }
  };

  if (pantalla === "menu") {
    return (
      <View style={estilos.contenedor}>
        <Text style={estilos.titulo}>Explorador de Publicaciones</Text>
        <Text style={estilos.texto}>
          Consulta publicaciones de forma fácil.
        </Text>

        <Button 
          title="Ver publicaciones" 
          onPress={() => setPantalla("lista")} 
        />
      </View>
    );
  }

  if (pantalla === "lista") {
    return (
      <View style={estilos.contenedor}>
        <Text style={estilos.titulo}>Lista de publicaciones</Text>

        <TextInput
          placeholder="Buscar publicación..."
          value={busqueda}
          onChangeText={setBusqueda}
          style={estilos.input}
          placeholderTextColor="#888"
        />

        <FlatList
          data={filtrarDatos()}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => {
              setDetalle(item);
              setPantalla("detalle");
            }}>
              <Text style={estilos.texto}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />

        <Button 
          title="Volver al menú" 
          onPress={() => setPantalla("menu")} 
        />
      </View>
    );
  }

  if (pantalla === "detalle") {
    return (
      <View style={estilos.contenedor}>
        <Text style={estilos.titulo}>{detalle.title}</Text>
        <Text style={estilos.texto}>{detalle.body}</Text>

        <Button 
          title="Volver a la lista" 
          onPress={() => setPantalla("lista")} 
        />
      </View>
    );
  }
}