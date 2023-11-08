import {state} from "@/state";
import {registerGlobalHandler} from "@/network/globalHandler";
import {registerRoomHandler} from "@/network/roomHandler";
import {registerNetworkHandler} from "@/network/networkHandler";
import {io} from "socket.io-client";
import {SERVER_ADDR} from "@/config";

// Create socket object
export const socket = io(SERVER_ADDR, {
  reconnectionDelayMax: 10000,
  autoConnect: false,
  query: {
    name: state.name
  }
});

// Initialize socket object
export function initializeSocket() {
  // Set query.name to state.name
  socket.io.opts.query.name = state.name;

  socket.connect();

  registerNetworkHandler(socket);
  registerGlobalHandler(socket);
  registerRoomHandler(socket);

  // TODO: Handle socket error connecting
}

export async function startSinglePlayerGame() {
  console.log("Starting single player game!");

  // Set name to "Single Player"
  const SINGLE_PLAYER_NAME = "Single Player";
  state.name = SINGLE_PLAYER_NAME;
  socket.io.opts.query.name = SINGLE_PLAYER_NAME;

  // Connect to server and join single player room
  initializeSocket();
  socket.emit("room:singlePlayer");
}

