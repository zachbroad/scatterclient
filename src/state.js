import {reactive} from "vue";
import {ApplicationStatus} from "./util";

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



