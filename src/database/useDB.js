import { useSQLiteContext } from 'expo-sqlite';

export function useDB() {
  const database = useSQLiteContext();

  async function findAll() {
    try {
      const query = 'SELECT * FROM tasks ORDER BY id DESC';
      return await database.getAllAsync(query);
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async function searchByDescription(text) {
    try {
      const query = 'SELECT * FROM tasks WHERE description LIKE ? ORDER BY id DESC';
      return await database.getAllAsync(query, [`%${text}%`]);
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async function createOne(task) {
    const statement = await database.prepareAsync(
      'INSERT INTO tasks (description) VALUES ($description)'
    );

    try {
      return await statement.executeAsync({
        $description: task.description,
      });
    } catch (error) {
      console.error(error);
    } finally {
      await statement.finalizeAsync();
    }
  }

  async function toggleIsCompleted(id, currentState) {
    try {
      const nextState = currentState ? 0 : 1;
      await database.runAsync(
        'UPDATE tasks SET isCompleted = ? WHERE id = ?',
        [nextState, id]
      );
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteOne(id) {
    try {
      await database.runAsync('DELETE FROM tasks WHERE id = ?', [id]);
    } catch (error) {
      console.error(error);
    }
  }

  return {
    findAll,
    searchByDescription,
    createOne,
    toggleIsCompleted,
    deleteOne,
  };
}
