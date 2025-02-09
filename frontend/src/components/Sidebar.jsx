import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();

  const { onlineUsers } = useAuthStore();

  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;
  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>

        {/* todo online filter toggle */}
      </div>

      <div className=" w-full py-3 overflow-y-auto">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
          w-full p-3 flex items-center gap-3
          hover:bg-base-300 transition-colors
          ${
            selectedUser?._id === user._id
              ? "bg-base-300 ring-1 ring-base-300"
              : ""
          }
        `}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={`user.profilePic || /avatar.png`}
                alt={user.name}
                className="size-12 object-cover rounded-full"
              />
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
