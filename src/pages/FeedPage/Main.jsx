import { useEffect, useState } from "react";
import Form from "../../components/Form";
import Post from "../../components/Post";
import { onSnapshot, collection, query, orderBy } from "firebase/firestore";
import { db } from "../../firebase/config";
import Loader from "../../components/Loader";
import { FiSettings } from "react-icons/fi";

const Main = ({ user }) => {
  const [tweets, setTweets] = useState();
  useEffect(() => {
    //aboneounacak colleciton referansi
    const collectionRef = collection(db, "tweets");
    const q = query(collectionRef, orderBy("createdAt", "desc"));
    //collectiondaki verileri anlik alma
    const unsub = onSnapshot(q, (snapshot) => {
      const tempTweets = [];
      snapshot.docs.forEach((doc) =>
        tempTweets.push({ ...doc.data(), id: doc.id })
      );
      setTweets(tempTweets);
    });
    return () => unsub(); // kullanici home dan ayrilinca collecion izlemesini birakir. performnasi dusurmemek icin
  }, []);

  return (
    <div className="border border-zinc-600 overflow-y-auto">
      <header className="font-bold p-4 border-b border-zinc-600 flex justify-between items-end ">
        <span className="takip text-xl p-3 bg-zinc-600 ">For you</span>
        <span className="text-xl ">Following</span>
        <FiSettings />
      </header>
      <Form user={user} />

      {!tweets ? (
        <Loader styles={`w-8 h-8 my-20`} />
      ) : (
        tweets.map((tweet) => <Post key={tweet.id} tweet={tweet} />)
      )}
    </div>
  );
};

export default Main;
