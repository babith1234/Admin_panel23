import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyAxYsYp2u3gRp3IVhLaBFUZMQFMvAtbTqM",
//   authDomain: "adminpaneltesting.firebaseapp.com",
//   projectId: "adminpaneltesting",
//   storageBucket: "adminpaneltesting.appspot.com",
//   messagingSenderId: "1054063209428",
//   appId: "1:1054063209428:web:af89cc87873eaf5f1f4441",
// };

const firebaseConfig = {
  apiKey: "AIzaSyAxYsYp2u3gRp3IVhLaBFUZMQFMvAtbTqM",
  authDomain: "adminpaneltesting.firebaseapp.com",
  projectId: "adminpaneltesting",
  storageBucket: "adminpaneltesting.appspot.com",
  messagingSenderId: "1054063209428",
  appId: "1:1054063209428:web:af89cc87873eaf5f1f4441"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
