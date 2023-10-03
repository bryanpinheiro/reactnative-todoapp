import * as SQLite from 'expo-sqlite';

interface Task {
  id: number;
  task: string;
}

const db = SQLite.openDatabase('TodoDB.db');

const initDB = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS todo (id INTEGER PRIMARY KEY AUTOINCREMENT, task TEXT)',
      [],
      () => {},
      (_, error) => {
        console.error('Error creating table: ', error);
        return true;
      }
    );
  });
};

const addTask = task => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO todo (task) VALUES (?)',
        [task],
        (_, results) => {
          resolve(results);
        },
        (_, error) => {
          reject(error);
          return true;
        }
      );
    });
  });
};

const deleteTask = id => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM todo WHERE id = ?',
        [id],
        (_, results) => {
          resolve(results);
        },
        (_, error) => {
          reject(error);
          return true;
        }
      );
    });
  });
};

const fetchTasks = (): Promise<Task[]> => {
  return new Promise<Task[]>((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM todo',
        [],
        (_, results) => {
          const rows = results.rows._array;
          resolve(rows);
        },
        (_, error) => {
          reject(error);
          return true;
        }
      );
    });
  });
};

export { initDB, addTask, deleteTask, fetchTasks };
