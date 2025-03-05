import React, { useEffect } from "react";
import { io } from "socket.io-client";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addNotification } from "../../redux/features/notification";
import { toggleNotification } from "../../redux/features/user";

const socket = io("http://localhost:3000");

const NotificationComponent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("notification", (data) => {
      dispatch(addNotification(data));          // Save the notification
      dispatch(toggleNotification());           // Open the notification modal
      toast.success(`${data.message}`);         // Optional toast
    });

    return () => {
      socket.off("notification");
    };
  }, [dispatch]);

  return null; // Since this component's only job is to listen to sockets
};

export default NotificationComponent;
