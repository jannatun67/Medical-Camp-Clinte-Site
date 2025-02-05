import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../Firebase/firebase.config";
import axios from "axios";
import UseAxiosPublic from "../UseHook/UseAxiosPublic";
import Swal from "sweetalert2";

export const AuthContext = createContext(null)
const AuthProvider = ({ children }) => {
  const [history, setHistory] = useState()
  const provider = new GoogleAuthProvider();
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const axiosPublic = UseAxiosPublic()

  // REGISTER
  const createUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
  }

  // Login
  const userLogin = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  }
  // Google
  const googleLogin = async () => {
    return signInWithPopup(auth, provider)
  }

  // logOut
  const logOut = () => {
    setLoading(true)
    return signOut(auth)
  }
  // update user
  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name, photoURL: photo
    })

  }



  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log("current User", currentUser);
      if (currentUser?.email) {

        const userInfo = { email: currentUser?.email }
        axiosPublic.post("/jwt", userInfo)
          .then(res => {
            if (res.data.token) {
              localStorage.setItem("access-token", res.data.token)
              setLoading(false)
              setUser(currentUser)
            }
          })


      }
      else {
        localStorage.removeItem("access-token")
        setLoading(false)
        setUser(currentUser)
      }



    })
    return () => {
      unsubscribe()
    }
  }, [axiosPublic])

  const userInfo = {
    user,
    loading,
    createUser,
    userLogin,
    googleLogin,
    logOut,
    setUser,
    updateUserProfile,
    setHistory,
    history
  }
  return (
    <AuthContext.Provider value={userInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;