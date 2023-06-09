import  firebase  from "firebase/compat/app"

//import firebase from 'firebase/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

import Filter from 'bad-words'
import { ref, onUnmounted, computed } from 'vue'

firebase.initializeApp({
    apiKey: "AIzaSyBpEvYA9KbQywv2SzLnf-FlFuK9n0z6YII",
    authDomain: "test-351f2.firebaseapp.com",
    projectId: "test-351f2",
    storageBucket: "test-351f2.appspot.com",
    messagingSenderId: "615010128511",
    appId: "1:615010128511:web:38119dce23470ec905654a",
    measurementId: "G-WFYR4YBGJK"
  })

const auth = firebase.auth()

export function useAuth() {
  const user = ref(null)
  const unsubscribe = auth.onAuthStateChanged(_user => (user.value = _user))
  onUnmounted(unsubscribe)
  const isLogin = computed(() => user.value !== null)

  const signIn = async () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider()
    await auth.signInWithPopup(googleProvider)
  }
  const signOut = () =>{ 
    sessionStorage.clear()
    auth.signOut()
  }

  return { user, isLogin, signIn, signOut }
}

const firestore = firebase.firestore()
const messagesCollection = firestore.collection('messages')
const messagesQuery = messagesCollection.orderBy('createdAt', 'desc').limit(100)
const filter = new Filter()

export function useChat() {
  const messages = ref([])
  const unsubscribe = messagesQuery.onSnapshot(snapshot => {
    messages.value = snapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .reverse()
  })
  onUnmounted(unsubscribe)

  const { user, isLogin } = useAuth()
  const sendMessage = text => {
    if (!isLogin.value) return
    const { photoURL, uid, displayName } = user.value
    messagesCollection.add({
      userName: displayName,
      userId: uid,
      userPhotoURL: photoURL,
      text: filter.clean(text),
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
  }

  const sendAssistantMessage = text => {
    if (!isLogin.value) return

    messagesCollection.add({
      userName: 'Buddy',
      userId: '',
      userPhotoURL: 'https://media0.giphy.com/media/S60CrN9iMxFlyp7uM8/giphy.gif?cid=ecf05e47n7lwku1vxtaln9yvhza2r3aih4u6jd60bmy72slm&rid=giphy.gif&ct=g',
      text: filter.clean(JSON.stringify(text)),
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
  }

  return { messages, sendMessage, sendAssistantMessage }
}