import {reactive} from "vue";
import {ApplicationStatus, toast} from "./util";
import {socket} from "@/network/socket";

export const state = reactive({
  // Connected to server?
  connected: false,

  // Used to control what screen is displayed
  status: ApplicationStatus.Login,

  // Current state of app
  messages: [],
  rooms: [],

  // Current room user is in
  room: null,

  // Username provided by user
  name: null,
});

export function isUserLoggedIn() {
  return socket.connected && state.name && state.status !== ApplicationStatus.Login;
}

export function leaveRoom() {
  socket.emit("room:leave", {
    room: state.room
  });
  state.status = ApplicationStatus.InMainLobby;
}

export function goHome() {
  // If in game, ask for confirmation
  if (state.status === ApplicationStatus.InGame) {
    if (!confirm("Are you sure you want to leave the game?")) {
      return;
    }
  }

  toast("Returning to main lobby.");
  leaveRoom()
  state.status = ApplicationStatus.InMainLobby;
}


