
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBPbFnSMhGFjqzPqwZ2Rz5wp6-26XoVf_4",
  authDomain: "hospital-management-syst-85618.firebaseapp.com",
  projectId: "hospital-management-syst-85618",
  storageBucket: "hospital-management-syst-85618.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdefgh1234",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
