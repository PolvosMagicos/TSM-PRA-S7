import { StatusBar } from 'expo-status-bar';
import { PaperProvider } from 'react-native-paper';
import { SQLiteProvider } from 'expo-sqlite';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import MainContent from './src/components/MainContent';
import { initDB } from './src/database/initDB';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SQLiteProvider databaseName="tasks.db" onInit={initDB}>
        <PaperProvider>
          <MainContent />
          <StatusBar style="auto" />
        </PaperProvider>
      </SQLiteProvider>
    </GestureHandlerRootView>
  );
}
