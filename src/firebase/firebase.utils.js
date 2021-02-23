import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyD03rYITWEKuUwpNADQe3160LdDicqcJW0",
  authDomain: "issue-tracking-map.firebaseapp.com",
  databaseURL: "https://issue-tracking-map.firebaseio.com",
  projectId: "issue-tracking-map",
  storageBucket: "issue-tracking-map.appspot.com",
  messagingSenderId: "264436365399",
  appId: "1:264436365399:web:a48b6d593e4f8145d18b12",
  measurementId: "G-W2SQE6L9C0",
};

firebase.initializeApp(config);

export const createIssueDocument = async (
  description,
  selectedLatitude,
  selectedLongitude,
  displayName
) => {
  //if (!userAuth) return;
  // const location = GeoLocation(37.7853889, -122.4056973);
  // console.log(location);

  firestore
    .collection("issues")
    .add({
      description: description,
      createdAt: new Date(),
      createdBy: displayName,
      location: new firebase.firestore.GeoPoint(
        selectedLatitude,
        selectedLongitude
      ),
      open: true,
    })
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
  objectsToAdd.forEach((obj) => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

export async function fetchIssues() {
  const collectionRef = await firestore
    .collection("issues")
    .where("open", "==", true);
  const snapshot = await collectionRef.get();
  console.log(snapshot);
  const docID = snapshot.docs[2].id;
  console.log(snapshot.docs[2].id);
  console.log(snapshot.docs[2].data());
  // const commentsRef = await firestore
  //   .collection("issues")
  //   .doc(docID)
  //   .collection("comments");
  // const commentsSnapshot = await commentsRef.get();
  // console.log(commentsSnapshot.docs[0].data());
  const transformedCollection = await snapshot.docs.map((doc, i) => {
    const { description, location, createdBy, createdAt } = doc.data();
    const id = doc.id;
    console.log(id);
    console.log(doc.data());
    return {
      id,
      description,
      location,
      createdBy,
      createdAt,
    };
  });
  console.log(transformedCollection);
  return transformedCollection;
  //setIssueList(transformedCollection);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
