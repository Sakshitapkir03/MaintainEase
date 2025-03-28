import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyAirCbjIXL6TiT3m9NWdW_e3Fo4-1D0O0E",

//   authDomain: "satya-c3dc7.firebaseapp.com",

//   projectId: "satya-c3dc7",

//   storageBucket: "satya-c3dc7.firebasestorage.app",

//   messagingSenderId: "675840626303",

//   appId: "1:675840626303:web:055a87ec4f3f0c35ba394a",

//   measurementId: "G-BWDY7SSVJC"

// };

const firebaseConfig = {
  apiKey: "AIzaSyDGvhqndZHzwa88L6ElTW8T4N7eSutNdWc",
  authDomain: "juan-c3dc7.firebaseapp.com",
  projectId: "juan-c3dc7",
  storageBucket: "juan-c3dc7.firebasestorage.app",
  messagingSenderId: "521491313170",
  appId: "1:521491313170:web:8a2444fe4cbcba8b3d9ecb",
  measurementId: "G-NRR6W1RFL8"
};



export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);