import { BiDoorOpen } from "react-icons/bi";
import { navSections } from "../../constants";
import { signOut } from "firebase/auth";
import { auth } from "./../../firebase/config";

const Nav = ({ user }) => {
  //console.log(user);
  return (
    <div className="flex flex-col justify-between items-end px-2 py-4">
      <div>
        <img src="x-logo.webp" className="w-14 mb-4" />
        {navSections.map((i, index) => (
          <div
            className="flex items-center gap-3 text-2xl md:text-xl p-3 cursor-pointer rounded-lg transition hover:bg-[#505050b7] max-md:justify-center"
            key={index}
          >
            {i.icon}{" "}
            <span className="whitespace-nowrap max-md:hidden">{i.title}</span>
          </div>
        ))}
      </div>

      <div>
        {!user ? (
          <div className="w-12 h-12 bg-gray-500 rounded-full animate-bounce" />
        ) : (
          <div className="flex flex-col gap-5">
            <div>
              <img src={user.photoURL} className="rounded-full" />
              <p className="max-md:hidden">{user.displayName}</p>
            </div>

            <div>
              <button
                onClick={() => signOut(auth)}
                className="bg-blue-600 flex justify-center items-center py-2 px-4 min-w-[85px] min-h-[40px] rounded-full transition hover:bg-blue-800"
              >
                <BiDoorOpen />
                <span className="max-md:hidden ms-2"> Sign out</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Nav;
