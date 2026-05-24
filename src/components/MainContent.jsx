import { SafeAreaView } from 'react-native-safe-area-context';
import TodoList from './TodoList';

export default function MainContent() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TodoList />
    </SafeAreaView>
  );
}
