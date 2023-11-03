// import './assets/main.css'
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-next/dist/bootstrap-vue-next.css";

import {createApp} from "vue";
import App from "./App.vue";
import ToastPlugin from "vue-toast-notification";
import "vue-toast-notification/dist/theme-bootstrap.css";
import "./assets/main.css";


let app = createApp(App);
app.use(ToastPlugin);
app.mount("#app");
