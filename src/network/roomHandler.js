import {state} from "@/state";

import {ApplicationStatus} from "@/variables";

export const registerRoomHandler = (socket) => {
  socket.on("room:data", room => {
    state.status = ApplicationStatus.InGame;
    state.room = room;
    console.log(`Got room data: ${room}`);
  });
};