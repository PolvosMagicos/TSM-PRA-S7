import { Keyboard, StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

export default function AddTodo({ text, query, setText, addTodo, setQuery }) {
  function viewAll() {
    setQuery('');
    setText('');
    Keyboard.dismiss();
  }

  function handleSearch() {
    setQuery(text);
    Keyboard.dismiss();
  }

  return (
    <View style={styles.container}>
      <TextInput
        multiline
        mode="flat"
        activeUnderlineColor="tomato"
        textColor="black"
        value={text}
        onChangeText={setText}
        label="Agregar o Buscar tareas"
        right={<TextInput.Icon icon="magnify" onPress={handleSearch} />}
      />

      {!query ? (
        <Button mode="contained" onPress={addTodo}>
          Agregar tarea
        </Button>
      ) : (
        <Button mode="contained" onPress={viewAll}>
          Ver Todo
        </Button>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    rowGap: 10,
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});
