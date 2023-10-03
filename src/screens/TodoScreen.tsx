import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Alert } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import { initDB, addTask, deleteTask, fetchTasks } from '../database/mySQLite';

interface Task {
  id: number;
  task: string;
}

const TodoScreen = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    initDB();
    fetchTasksFromDB();
  }, []);

  const fetchTasksFromDB = async () => {
    try {
      const tasksFromDB = await fetchTasks();
      setTasks(tasksFromDB);
    } catch (error) {
      console.error('Error fetching tasks: ', error);
    }
  };

  const handleAddTask = async () => {
    if (task.trim() === '') {
      Alert.alert('Task cannot be empty');
      return;
    }

    try {
      await addTask(task);
      fetchTasksFromDB();
      setTask('');
    } catch (error) {
      console.error('Error adding task: ', error);
    }
  };

  const handleDeleteTask = async id => {
    try {
      await deleteTask(id);
      fetchTasksFromDB();
    } catch (error) {
      console.error('Error deleting task: ', error);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Enter a task"
        value={task}
        onChangeText={setTask}
      />
      <Button title="Add Task" onPress={handleAddTask} />

      <FlatList
        data={tasks}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title>{item.task}</ListItem.Title>
            </ListItem.Content>
            <Icon
              name="delete"
              type="material"
              onPress={() => handleDeleteTask(item.id)}
            />
          </ListItem>
        )}
      />
    </View>
  );
};

export default TodoScreen;
