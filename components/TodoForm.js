import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  TextInput, 
  TouchableOpacity, 
  Text,
  Dimensions,
  ImageBackground
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, updateTodo } from '../lib/features/TodoList/reducers';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const TodoForm = ({ navigation }) => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const editingTodo = useSelector(state => state.todoList.editingTodo);

  useEffect(() => {
    if (editingTodo) {
      setText(editingTodo.text);
    }
  }, [editingTodo]);

  const handleSubmit = () => {
    if (text.trim()) {
      if (editingTodo) {
        dispatch(updateTodo({
          id: editingTodo.id,
          text: text.trim()
        }));
      } else {
        dispatch(addTodo({
          id: Date.now().toString(),
          text: text.trim(),
          completed: false,
          createdAt: new Date().toISOString()
        }));
      }
      setText('');
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>
          {editingTodo ? 'Modify Quantum State' : 'Create New Quantum Task'}
        </Text>
        <View style={styles.inputContainer}>
          <Ionicons name="flask-outline" size={24} color="#7B68EE" style={styles.icon} />
          <TextInput
            style={styles.input}
            value={text}
            onChangeText={setText}
            placeholder="Enter quantum observation..."
            placeholderTextColor="#666"
          />
        </View>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={handleSubmit}
        >
          <Text style={styles.buttonText}>
            {editingTodo ? 'Update Quantum State' : 'Create Quantum Task'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1a1a2e',
  },
  formContainer: {
    backgroundColor: 'rgba(30, 30, 60, 0.9)',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#7B68EE',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#7B68EE',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: 'rgba(123, 104, 238, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(40, 40, 80, 0.8)',
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#7B68EE',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    color: '#fff',
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#7B68EE',
    padding: 15,
    borderRadius: 12,
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
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  }
});

export default TodoForm;
