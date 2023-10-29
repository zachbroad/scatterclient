import {io} from "socket.io-client";
import {reactive} from "vue";
import {ApplicationStatus} from "./util";

const SERVER = "http://localhost:3000";


const names = [
  "Zach",
  "Anna",
  "Lola",
  "Tom",
  "Kaylee",
  "Sonja",
  "Penelope",
  "Bob",
]

export const state = reactive({
  connected: false,
  appStatus: ApplicationStatus.InMainLobby,
  server: SERVER,
  messages: [],
  rooms: [],
  room: null,
  name: names[Math.floor(Math.random() * names.length)]
});


export const socket = io(SERVER, {
  reconnectionDelayMax: 10000,
  autoConnect: false,
  query: {
    name: state.name
  }
});

