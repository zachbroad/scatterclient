import {state} from "@/state";
import {registerGlobalHandler} from "@/network/globalHandler";
import {registerRoomHandler} from "@/network/roomHandler";
import {registerNetworkHandler} from "@/network/networkHandler";
import {io} from "socket.io-client";
import {SERVER_ADDR} from "@/config";

export const socket = io(SERVER_ADDR, {
  reconnectionDelayMax: 10000,
  autoConnect: false,
  query: {
    name: state.name
  }
});

export function initializeSocket() {
  // Set query.name to state.name
  socket.io.opts.query.name = state.name;

  socket.connect();

  registerNetworkHandler(socket);
  registerGlobalHandler(socket);
  registerRoomHandler(socket);

  // TODO: Handle socket error connecting
}

export function startSinglePlayer() {
  socket.emit("room:singlePlayer");
}

