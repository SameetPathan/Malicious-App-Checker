import { initializeApp } from "firebase/app";
import { getAuth,initializeAuth, getReactNativePersistence  } from "firebase/auth";
import { getDatabase, set, ref } from "firebase/database";
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyAiJf1SDTPpfRHr4NwckDu_1ImNpju6y14",
  authDomain: "jarvis-systems-commons.firebaseapp.com",
  databaseURL: "https://jarvis-systems-commons-default-rtdb.firebaseio.com",
  projectId: "jarvis-systems-commons",
  storageBucket: "jarvis-systems-commons.appspot.com",
  messagingSenderId: "383480447879",
  appId: "1:383480447879:web:45baeaa9517cbb97088922",
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { auth };

export const database = getDatabase(app);

export function register(registerData) {
  try {
    const dbb = getDatabase();
    set(ref(dbb, "MaliciousAppChecker/users/" + registerData.phoneNumber), {
      name: registerData.name,
      phoneNumber: registerData.phoneNumber,
      email: registerData.email,
      password: registerData.password,
      confirmPassword: registerData.confirmPassword,
    });
    return true;
  } catch (error) {
    return false;
  }
}


export function updateUserProfile(userData) {
  const user = auth.currentUser;
  console.log("user:",user)
    if (user) {
    const db = getDatabase();
    const userRef = ref(db, `MaliciousAppChecker/users/${userData.phoneNumber}`);
    return update(userRef, {
      name: userData.name,
      email: userData.email,
      phoneNumber: userData.phoneNumber,
      address: userData.address,
      dateOfBirth: userData.dateOfBirth,
    });
  }
  return Promise.reject(new Error('No user is currently signed in.'));
}
