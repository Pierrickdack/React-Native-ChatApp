import firebase from 'firebase';

// Initialize Firebase with your configuration
const firebaseConfig = {
  // Your Firebase config
};

firebase.initializeApp(firebaseConfig);

// Create a reference to your Firebase database
const database = firebase.database();

async function get(key, defaultValue = null) {
  try {
    const snapshot = await database.ref(key).once('value');
    const value = snapshot.val();

    if (value !== null) {
      return value;
    }

    return defaultValue;
  } catch (error) {
    // Error retrieving data
    console.log(`Could not get data: ${key}`, error);
  }
}

async function set(key, value) {
  try {
    await database.ref(key).set(value);
  } catch (error) {
    // Error saving data
    console.log(`Could not set data: ${key}`, error);
  }
}

async function remove(key) {
  try {
    await database.ref(key).remove();
  } catch (error) {
    // Error removing data
    console.log(`Could not remove data: ${key}`, error);
  }
}

async function clear() {
  try {
    // Clear all data in the database
    await database.ref().remove();
  } catch (error) {
    // Error clearing data
    console.log('Could not clear data', error);
  }
}

export default {
  get,
  set,
  remove,
  clear,
};

