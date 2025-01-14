import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ImageBackground
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTodo, deleteTodo, setEditingTodo } from '../lib/features/TodoList/reducers';
import { Ionicons } from '@expo/vector-icons';

export default function TodoList({ navigation }) {
  const dispatch = useDispatch();
  const { todos, loading, error } = useSelector((state) => state.todoList);

  if (loading) {
    return <Text style={styles.message}>Quantum State Loading...</Text>;
  }

  if (error) {
    return <Text style={styles.message}>Quantum Anomaly: {error}</Text>;
  }

  const handleEdit = (todo) => {
    dispatch(setEditingTodo(todo));
    navigation.navigate('todoForm');
  };

  const renderTodo = ({ item }) => (
    <View style={styles.todoItem}>
      <TouchableOpacity 
        style={styles.todoContent}
        onPress={() => dispatch(toggleTodo(item.id))}
      >
        <View style={[styles.checkbox, item.completed && styles.checked]}>
          {item.completed && <Ionicons name="checkmark" size={16} color="#fff" />}
        </View>
        <Text style={[
          styles.todoText,
          item.completed && styles.completedText
        ]}>
          {item.text}
        </Text>
      </TouchableOpacity>
      
      <View style={styles.actionButtons}>
        <TouchableOpacity
          onPress={() => handleEdit(item)}
          style={styles.editButton}
        >
          <Ionicons name="create-outline" size={20} color="#7B68EE" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => dispatch(deleteTodo(item.id))}
          style={styles.deleteButton}
        >
          <Ionicons name="trash-outline" size={20} color="#ff4444" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Quantum Tasks</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('todoForm')}
        >
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={todos}
        renderItem={renderTodo}
        keyExtractor={item => item.id}
        style={styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No quantum tasks observed. Create one!</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#7B68EE',
    textShadowColor: 'rgba(123, 104, 238, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4
  },
  addButton: {
    backgroundColor: '#7B68EE',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#7B68EE',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  list: {
    flex: 1,
  },
  todoItem: {
    backgroundColor: 'rgba(30, 30, 60, 0.9)',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#7B68EE',
    shadowColor: '#7B68EE',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  todoContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#7B68EE',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    backgroundColor: '#7B68EE',
  },
  todoText: {
    fontSize: 16,
    color: '#fff',
    flex: 1,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#666',
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButton: {
    padding: 5,
    marginRight: 10,
  },
  deleteButton: {
    padding: 5,
  },
  message: {
    fontSize: 18,
    color: '#7B68EE',
    textAlign: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#7B68EE',
    textAlign: 'center',
    marginTop: 50,
  },
});
