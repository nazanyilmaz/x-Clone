import { useEffect, useState } from "react";
import { auth } from "../../firebase/config";
import Aside from "./Aside";
import Main from "./Main";
import Nav from "./Nav";
import { onAuthStateChanged } from "firebase/auth";

const FeedPage = () => {
  //console.log(auth.currentUser);
  const [user, setUser] = useState(null);
  useEffect(() => {
    //kullanici verisini al ve state aktar
    const unsub = onAuthStateChanged(auth, (user) => {
      // anlik olarak kullanici oturumunu izler
      setUser(user);
    });
    return () => unsub();
  }, []);

  //console.log(user);
  return (
    <section className="feed h-screen bg-black overflow-hidden">
      <Nav user={user} />
      <Main user={user} />
      <Aside />
    </section>
  );
};

export default FeedPage;
