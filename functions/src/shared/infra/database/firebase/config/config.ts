import { App, initializeApp } from "firebase-admin/app";

const firebaseConfig = {
  apiKey: "AIzaSyDvLGWik43ioQ5-WOYYTIg9U6TZpv8PZvQ",
  authDomain: "smartbabe-41813.firebaseapp.com",
  databaseURL: "https://smartbabe-41813.firebaseio.com",
  projectId: "smartbabe-41813",
  storageBucket: "smartbabe-41813.firebasestorage.app",
  messagingSenderId: "995932226625",
  appId: "1:995932226625:web:c8eb8a08f9399f220f72c0",
};

const app: App = initializeApp(firebaseConfig);

export { app };
