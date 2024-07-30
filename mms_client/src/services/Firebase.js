// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAgUspft6rccYg0WCNKOmfi7JAyhFzvSDU",
    authDomain: "mms-image-storage.firebaseapp.com",
    projectId: "mms-image-storage",
    storageBucket: "mms-image-storage.appspot.com",
    messagingSenderId: "233496676397",
    appId: "1:233496676397:web:a1c20f5eeec2703ec710a4"
  };

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp, "gs://mms-image-storage.appspot.com")

export default storage;