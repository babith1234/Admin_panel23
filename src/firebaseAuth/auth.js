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
  apiKey: "AIzaSyBN8H-HRd_jVDLprNAt96KC3iQKs1qqgZA",
  authDomain: "aerophilia-2023.firebaseapp.com",
  projectId: "aerophilia-2023",
  storageBucket: "aerophilia-2023.appspot.com",
  messagingSenderId: "171266886388",
  appId: "1:171266886388:web:feb4f7debe7eae045f6ca1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
