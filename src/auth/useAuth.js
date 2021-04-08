import { useEffect } from "react";
import firebase from "../firebase/firebase";
import { useDispatch } from "react-redux";
import { authUser, DisAuthUser } from "../actions/index";

function useAuth() {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsub = firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(authUser(user));
      } else {
        dispatch(DisAuthUser());
      }
    });
    return () => unsub();
  }, []);
}

export default useAuth;
