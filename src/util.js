import {useToast} from "bootstrap-vue-next";

export const ApplicationStatus = Object.freeze({
  Login: Symbol("Login"),
  InMainLobby: Symbol("In Main Lobby"),
  InGame: Symbol("In Game"),
});

export const GameStatus = Object.freeze({
  Waiting: "Waiting",
  Starting: "Starting",
  InProgress: "In Progress",
  Scoring: "Scoring",
  Results: "Results",
});

const {show} = useToast();

export function toast(msg) {
  show(msg, {pos: "bottom-right"});
}
