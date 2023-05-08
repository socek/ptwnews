import { defineStore } from 'pinia';

import statuses from "stores/statuses.js"
import { api } from 'boot/axios'
import { useQuasar } from 'quasar'

export const useCounterStore = defineStore('posts', {
  state: () => ({
    posts: null,
    status: statuses.not_started,
  }),
  actions: {
    async fetchFromCache() {

    },

    async fetch() {
      const $q = useQuasar()
      let result

      try {
        this.status.value = statuses.running;
        result = await api.get('/')
      } catch(error) {
        $q.notify({
          color: 'negative',
          position: 'top',
          message: 'Loading failed',
          icon: 'report_problem'
        })
        this.status.value = statuses.unable_to_fetch;
        return
      }
      this.posts.value = result.data
      this.status.value = statuses.finished
    },
  },
});
