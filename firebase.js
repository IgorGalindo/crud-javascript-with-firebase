const firebaseConfig = {
    apiKey: "Your API Key",
    authDomain: "Your Auth Domain",
    projectId: "Your Project ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const registersRef = db.collection('registers');