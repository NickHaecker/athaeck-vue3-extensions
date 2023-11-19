import type { Pinia } from "pinia";
import { useWebSocketStore } from "./athaeck-websocket-vue3-extension/stores/webSocket";
import {useNotificationStore} from "./notifications/stores/index"

export function ImportExtensions(pinia:Pinia){
    useWebSocketStore(pinia)
    useNotificationStore(pinia)
    return pinia
}