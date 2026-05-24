import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import AddTodo from './AddTodo';
import AppHeader from './AppHeader';
import Todo from './Todo';
import { useDB } from '../database/useDB';

export default function TodoList() {
  const db = useDB();

  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [query, setQuery] = useState('');

  const list = async () => {
    try {
      const results = await db.findAll();
      setTodos(results);
    } catch (error) {
      console.error(error);
    }
  };

  const addTodo = async () => {
    if (!text.trim()) return;

    await db.createOne({ description: text.trim() });
    setText('');
    await list();
  };

  const deleteTodo = async (id) => {
    try {
      await db.deleteOne(id);
      await list();
    } catch (error) {
      console.error(error);
    }
  };

  const toggleIsCompleted = async (id, state) => {
    try {
      await db.toggleIsCompleted(id, state);
      await list();
    } catch (error) {
      console.error(error);
    }
  };

  const filteredTodos = todos.filter((todo) =>
    todo.description.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    list();
  }, []);

  return (
    <LinearGradient
      colors={['#dadde4', '#c0d3fd', '#76a9d5', '#512da8']}
      style={styles.fullWidth}
    >
      <AppHeader />

      <View style={styles.content}>
        <AddTodo
          text={text}
          query={query}
          setText={setText}
          addTodo={addTodo}
          setQuery={setQuery}
        />

        <FlatList
          data={filteredTodos}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Todo
              {...item}
              deleteTodo={deleteTodo}
              toggleIsCompleted={toggleIsCompleted}
            />
          )}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  fullWidth: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
});
