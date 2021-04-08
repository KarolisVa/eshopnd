import { useState, useEffect } from "react";
import firebase from "../firebase/firebase";

function useGetCollection(collectionRef) {
  const [collectionData, setCollectionData] = useState([]);
  let unsub;
  useEffect(() => {
    unsub = collectionRef.onSnapshot(handleSnapshot);
  }, []);

  const handleSnapshot = (snapshot) => {
    const data = snapshot.docs.map((doc) => {
      return { docId: doc.id, ...doc.data() };
    });
    setCollectionData(data);
  };

  return { collectionData, unsub };
}

export default useGetCollection;
