import React, { useRef, useState } from "react";
import { BiSolidSave, BiTrash } from "react-icons/bi";
import { ImCancelCircle } from "react-icons/im";
import { db } from "../../firebase/config";
import { doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { IoMdReturnLeft } from "react-icons/io";

const EditMode = ({ tweet, close }) => {
  const [isPicDeleting, setIsPicDeleting] = useState(false);
  const inputRef = useRef();
  const handleSave = async () => {
    const newText = inputRef.current.value; //yeni icerige eris
    const tweetRef = doc(db, "tweets", tweet.id); //guncellenecek dokumanin refansini al
    const updated = isPicDeleting
      ? {
          textContent: newText,
          isEdited: true,
          imageContent: null,
        }
      : {
          textContent: newText,
          isEdited: true,
        };
    await updateDoc(tweetRef, updated); //dokumanin icerigini guncelle
    close(); //duzenleme modundan cik
    toast.info("Text-Content Edited");
  };
  return (
    <>
      <input
        ref={inputRef}
        type="text"
        className="rounded p-1 px-2 text-blank text-zinc-400 focus:text-zinc-800"
        defaultValue={tweet.textContent}
      />
      <button
        onClick={handleSave}
        className="mx-5 p-1 text-green-400 rounded-lg shadow border hover:bg-green-400 hover:text-zinc-700 transition"
      >
        <BiSolidSave />
      </button>
      <button
        onClick={close}
        className="mx-5 p-1 text-red-400 rounded-lg shadow border hover:bg-red-400 hover:text-zinc-700 transition"
      >
        <ImCancelCircle />{" "}
      </button>
      {tweet.imageContent && (
        <div className="relative">
          <img
            src={tweet.imageContent}
            className={`
            ${isPicDeleting ? "blur" : ""}
            max-h-[400px] object-cover w-full rounded-lg my-2`}
          />
          <button
            onClick={() => setIsPicDeleting(!isPicDeleting)}
            className="absolute top-2 right-0 text-2xl p-2 bg-white transition text-red-500 hover:bg-red-500 hover:text-white hover:scale-90 rounded-full"
          >
            {isPicDeleting ? <IoMdReturnLeft /> : <BiTrash />}
          </button>
        </div>
      )}
    </>
  );
};

export default EditMode;
