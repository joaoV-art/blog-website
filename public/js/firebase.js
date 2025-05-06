const firebaseConfig = {
    apiKey: "AIzaSyD9ijuUae7kiXS-gC7akgUVOgbLU5PrnHQ",
    authDomain: "blog-website-37a25.firebaseapp.com",
    projectId: "blog-website-37a25",
    storageBucket: "blog-website-37a25.firebasestorage.app",
    messagingSenderId: "189961026762",
    appId: "1:189961026762:web:01c8199716024a3d7e8833"
};
  
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();

const logoutUser = () => {
    auth.signOut();
    location.reload();
}