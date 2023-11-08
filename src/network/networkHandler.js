import {state} from "@/state";

import {ApplicationStatus} from "@/variables";

export const registerNetworkHandler = (socket) => {
  socket.on("connect", () => {
    console.log("Connected to the server!");
    state.status = ApplicationStatus.InMainLobby;
    state.connected = true;
  });

  socket.on("disconnect", () => {
    console.log("Disconnected from the server.");
    state.status = ApplicationStatus.Login;
    state.connected = false;
  });
};
