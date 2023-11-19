import { defineStore } from 'pinia'
import type { NotificationItem } from '../types'
import bus from '@/hooks/index'

export const useNotificationStore = defineStore({
  id: 'notification',
  state: () => ({
    notifications: [] as NotificationItem[]
  }),
  actions: {
    Init(): void {
      bus.on("SPAWN_NOTIFICATION",this._OnSpawnNotification)
    },
    _OnSpawnNotification(body:any){
      console.log(body)
      this.SpawnNotification(body)
    },
    _OnAddNotificatation(notification: NotificationItem): void {
      this.notifications.push(notification)
    },
    _OnRemoveNoticiation(index: number): void {
      this.notifications.splice(index, 1)
    },
    SpawnNotification(notification: NotificationItem) {
      if (
        this.notifications.length > 0 &&
        this.notifications[this.notifications.length - 1].message === notification.message
      ) {
        return
      }

      const id = Math.floor(Math.random() * 100000)
      const newNotification = { id, ...notification }

      this._OnAddNotificatation(newNotification)

      if (!newNotification.hasNoTimeout) {
        setTimeout(
          (notification: NotificationItem) => {
            this.RemoveNotificationById(notification)
          },
          newNotification.timeToLive || 5000,
          newNotification
        )
      }

      return newNotification
    },
    RemoveNotification(index?: number) {
      if (!index) {
        this._OnRemoveNoticiation(this.notifications.length - 1)
      } else {
        this._OnRemoveNoticiation(index)
      }
    },
    RemoveNotificationById(notification: NotificationItem): void {
      const index = this.notifications.findIndex((n) => n.id === notification.id)

      if (index !== -1) {
        this._OnRemoveNoticiation(index)
      }
    }
  },
  getters: {
    Notifications: (state) => state.notifications
  }
})
