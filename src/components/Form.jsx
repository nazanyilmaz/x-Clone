import React, { useEffect, useState } from "react";
import { BsCardImage } from "react-icons/bs";
import { toast } from "react-toastify";
import {
  addDoc,
  collection,
  count,
  onSnapshot,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db, storage } from "./../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import Loader from "./Loader";
import { PiGifFill } from "react-icons/pi";
import { IoMdHappy } from "react-icons/io";
import { TfiMenuAlt } from "react-icons/tfi";
import { LuCalendarClock } from "react-icons/lu";
import { CiLocationOn } from "react-icons/ci";

const Form = ({ user }) => {
  const [tweetsCount, setTweetsCount] = useState(0);
  useEffect(() => {
    const tweetsCol = collection(db, "tweets");
    const q = query(tweetsCol, count());
    onSnapshot(q, (snapshot) => {
      setTweetsCount(snapshot.size);
    });
  }, []);
  const [isLoading, setIsLoading] = useState(false); //atilan postun yuklenmesini izlemek icin
  //tweet'ler kolleksiyonuinu referansini al
  const tweetsCol = collection(db, "tweets");
  //dosya resim ise starage yukle ve urlini fonsksiyonun cagirildigi yere dondurur
  const uploadImage = async (file) => {
    //console.log(file);
    //dosya resim degilse fonksiyonu durdur
    if (!file || !file.type.startsWith("image")) return null;
    //doyanin yuklenecegi konumiun referansini al
    const fileRef = ref(storage, v4() + file.name);
    //referansi olusturulan konuma dosyayi yukle
    await uploadBytes(fileRef, file);
    //yuklenen dosyanin urline eris ve dondur
    return await getDownloadURL(fileRef);
  };
  const handleSubmit = async (e) => {
    // form gonderildiginde calisacak fonk.
    e.preventDefault();

    //inputlardaki verilere eris
    const textContent = e.target[0].value;
    const imageContent = e.target[1].files[0];
    //yazi ve resim icerigi yoksa alert
    if (!textContent && !imageContent) {
      return toast.info("Add Content");
    }
    setIsLoading(true); //yuklenme statini true cek
    //console.log(imageContent, textContent);
    try {
      //resmi storage yukle
      const url = await uploadImage(imageContent);
      console.log(url);
      //postu veri tabanina(kolleksiyona) kaydet
      await addDoc(tweetsCol, {
        textContent,
        imageContent: url,
        createdAt: serverTimestamp(),
        likes: [],
        isEdited: false,
        user: {
          id: user.uid,
          name: user.displayName,
          photo: user.photoURL,
        },
      });
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false); //yuklenme statini false cek
    //formu temizlemek
    e.target.reset();
  };
  //console.log(user);
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="border-b border-zinc-600 p-4 flex gap-3"
      >
        <img
          className="rounded-full h-[35px] md:h-[45px] mt-1"
          src={user?.photoURL}
          alt={user?.displayName}
        />

        <div className="w-full ">
          <input
            type="text"
            className="w-full bg-transparent my-2 outline-none md:text-lg"
            placeholder="What's happening?"
          />
          <div className="flex justify-between">
            <div className="flex flex-column gap-3">
              <label
                htmlFor="image"
                className="text-lg transition p-4 cursor-pointer rounded-full items-center  hover:bg-blue-600"
              >
                <BsCardImage />
              </label>
              <label
                htmlFor="image"
                className="text-lg transition p-4 cursor-pointer rounded-full items-center  hover:bg-blue-600"
              >
                <PiGifFill />
              </label>
              <label
                htmlFor="image"
                className="text-lg transition p-4 cursor-pointer rounded-full items-center  hover:bg-blue-600"
              >
                <TfiMenuAlt />
              </label>
              <label
                htmlFor="image"
                className="text-lg transition p-4 cursor-pointer rounded-full items-center  hover:bg-blue-600"
              >
                <IoMdHappy />
              </label>
              <label
                htmlFor="image"
                className="text-lg transition p-4 cursor-pointer rounded-full items-center  hover:bg-blue-600"
              >
                <LuCalendarClock />
              </label>
              <label
                htmlFor="image"
                className="text-lg transition p-4 cursor-pointer rounded-full items-center  hover:bg-blue-600"
              >
                <CiLocationOn />
              </label>
            </div>

            <input type="file" id="image" className="hidden" />
            <button
              className="bg-blue-600 flex justify-center items-center py-2 px-4 min-w-[85px] min-h-[40px] rounded-full transition hover:bg-blue-800"
              type="submit"
            >
              {isLoading ? <Loader styles={`!text-white`} /> : "Post"}
            </button>
          </div>
        </div>
      </form>
      <h2 className="border-b border-zinc-600 text-blue-500 text-2xl fw-bolder flex items-center p-3 justify-center">
        Show {tweetsCount} post
      </h2>
    </>
  );
};

export default Form;
