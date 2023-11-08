import {useToast} from "bootstrap-vue-next";
import {socket} from "@/network/socket";

const {show} = useToast();

export function toast(msg) {
  show(msg, {pos: "bottom-right"});
}

export function error(msg) {
  show(msg, {pos: "bottom-right", variant: "danger"});
}

export function isRoomOwner(room) {
  return room.owner.socket.id === socket.id;
}
