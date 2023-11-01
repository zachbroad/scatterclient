import {state} from "@/state";
import {ApplicationStatus} from "@/util";

export const registerNetworkHandler = (socket) => {
  socket.on('connect', () => {
    console.log('Connected to the server!');
    state.status = ApplicationStatus.InMainLobby;
    state.connected = true;
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from the server.');
    state.connected = false;
  });
};
