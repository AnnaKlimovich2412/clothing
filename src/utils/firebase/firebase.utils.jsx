import { initializeApp } from 'firebase/app'
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyB8gO1v95RNSAjI7s-36dlqX_iA7yUdJvY",
    authDomain: "clothing-60b13.firebaseapp.com",
    projectId: "clothing-60b13",
    storageBucket: "clothing-60b13.appspot.com",
    messagingSenderId: "251669766759",
    appId: "1:251669766759:web:fbebed0574f1cc3a656ac2"
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({
    prompt: 'select_account'
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid)

    console.log(userDocRef)

    const userSnapshot = await getDoc(userDocRef)


    if (!userSnapshot.exists()) {
        const { displayName, email} = userAuth
        const createdAt = new Date()

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            })
        } catch (error) {
                console.log('error creating the user', error.message )
        }
    }
    return userDocRef
}

