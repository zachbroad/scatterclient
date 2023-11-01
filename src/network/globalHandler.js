import {state} from "@/state";
import {toast} from "@/util";

export const registerGlobalHandler = (socket) => {


  socket.on('global:message', msg => {
    state.messages = [...state.messages, msg];
  });

  socket.on('global:messageHistory', msgs => {
    state.messages = msgs;
  });

  socket.on('global:roomList', rooms => {
    console.dir(rooms);
    state.rooms = rooms;
  });

  socket.on('error', msg => {
    console.error(msg);
    toast(msg);
  });

  socket.on('message', msg => {
    console.log(msg);
    toast(msg);
  });
};
