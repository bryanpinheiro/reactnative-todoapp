import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TodoScreen from './src/screens/TodoScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="TodoApp" component={TodoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
