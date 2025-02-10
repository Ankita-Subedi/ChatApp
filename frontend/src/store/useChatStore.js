import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/message/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/message/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

sendMessage: async(messageData) => {
  const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(`/message/send/${selectedUser._id}`, messageData,{timeout: 3000});
      console.log("API Response:", res);
      if (res && res.data) {
        set({ messages: [...messages, res.data.data] });
      } else {
        throw new Error('Response data is missing or malformed');
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
},

subscribeToMessages: ()=>{
  const { selectedUser } = get();
  if(!selectedUser) return;

  const socket = useAuthStore.getState().socket;

  //todo: optimize
  socket.on("newMessage", (newMessage)=>{
    set({messages: [...get().messages, newMessage]});
  })
},

unsubscribeFromMessages: ()=>{
  const socket = useAuthStore.getState().socket;
  socket.off("newMessage");
},

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));