import moment from "moment"; //import 'moment/locale/en'
import Buttons from "./Buttons";
import { auth, db } from "../../firebase/config";
import {
  deleteDoc,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import Dropmenu from "./Dropmenu";
import { toast } from "react-toastify";
import { useState } from "react";
import EditMode from "./EditMode";
import Content from "./Content";

const Post = ({ tweet }) => {
  const [isEditMode, setIsEditMode] = useState(false);

  //tarihin suanki zamana kiyasini alma
  const date = moment(tweet?.createdAt?.toDate()).fromNow();
  //console.log(auth.currentUser.uid); oturumu acik olan kullanici id si
  //console.log(tweet.user.id);  tweeti atan kullanici  id si

  //sigin olan kullanici tweetin likes dizisinde varmi
  const isLiked = tweet.likes.includes(auth.currentUser.uid);

  //tweet delete
  const handleDelete = async () => {
    //silinecek dokumanin referansini alalim
    const tweetRef = doc(db, "tweets", tweet.id);
    //refenasi alinan tweeti silme
    deleteDoc(tweetRef)
      .then(() => {
        toast.warn("Deleted");
      })
      .catch(() => {
        toast.danger("is not delete");
      });
  };

  //tweet like
  const handleLike = async () => {
    //guncellenecek dokumanin refenasini alma
    const tweetRef = doc(db, "tweets", tweet.id);
    updateDoc(tweetRef, {
      likes: isLiked
        ? arrayRemove(auth.currentUser.uid) //sigin olan like ise kaldir
        : arrayUnion(auth.currentUser.uid), //sigin olan like degil  ise ekle
    }); //belgeyi guncelleme
  };

  return (
    <div className="border-b py-6 px-3 border-zinc-600 flex gap-3 ">
      <img
        className="w-10 h-10 rounded-full"
        src={tweet?.user?.photo}
        alt="NYC"
      />

      <div className="w-full">
        <div className="flex justify-between items-center">
          <div className="flex gap-4 items-center whitespace-nowrap">
            <p className="font-semibold">{tweet?.user?.name}</p>
            <p className="text-gray-400 text-sm">
              @{tweet?.user?.name.toLowerCase().split(" ").join("_")}
            </p>
            <p className="text-gray-400 text-sm">{date}</p>
            {tweet.isEdited && <p className="text-gray-400 text-xs">*Edited</p>}
          </div>

          {tweet.user.id === auth.currentUser.uid && (
            <Dropmenu
              handleEdit={() => setIsEditMode(true)}
              handleDelete={handleDelete}
            />
          )}
        </div>

        <div className="my-4">
          {isEditMode ? (
            <EditMode tweet={tweet} close={() => setIsEditMode(false)} />
          ) : (
            <Content tweet={tweet} />
          )}
        </div>

        <div>
          <Buttons
            likeCount={tweet?.likes?.length}
            handleDelete={handleDelete}
            handleLike={handleLike}
            isLiked={isLiked}
          />
        </div>
      </div>
    </div>
  );
};

export default Post;
