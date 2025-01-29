export default function ProfileMenu({isOpen}) {
  return (
    <div className="relative">
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg text-black">
          <ul className="flex flex-col text-left m-2 ">
            <li className="py-2 hover:bg-gray-100 cursor-pointer">Edit profile</li>
            <li className="py-2 hover:bg-gray-100 cursor-pointer">Feedback</li>
            <li className=" py-2 hover:bg-gray-100 cursor-pointer">Settings</li>
          </ul>
        </div>
      )}
    </div>
  );
}
