import { defineStore } from "pinia";

import statuses from "stores/statuses.js";
import { api } from "boot/axios";
import { useQuasar } from "quasar";

const collectionPosts = "posts"
const collectionLastFetch = collectionPosts + "_lastFetch"

async function pushToDb(posts) {
  let trans = request.transaction(["posts"], "readwrite");
  let store = trans.objectStore("posts");
  await trans;
}

export default defineStore("posts", {
  state: () => ({
    lastFetch: null,
    posts: null,
    fetchStatus: statuses.not_started,
  }),
  getters: {
    isReady: (state) => state.fetchStatus == statuses.finished || state.lastFetch
  },
  actions: {
    async init() {
      const $q = useQuasar()
      if(!this.lastFetch) {
        this.posts = $q.localStorage.getItem(collectionPosts)
        this.lastFetch = $q.localStorage.getItem(collectionLastFetch)
        await this.fetch()
      }
    },

    async fetch() {
      const $q = useQuasar()
      let result;

      try {
        this.fetchStatus = statuses.running;
        result = await api.get("/");
      } catch (error) {
        $q.notify({
          color: "negative",
          position: "top",
          message: "Loading failed",
          icon: "report_problem",
        });
        this.fetchStatus = statuses.unable_to_fetch;
        return;
      }
      $q.notify({
        color: "positive",
        position: "top",
        message: "News Updated",
      });
      this.posts = result.data
      this.fetchStatus = statuses.finished;
      this.lastFetch = Date.now();
      $q.localStorage.set(collectionPosts, this.posts)
      $q.localStorage.set(collectionLastFetch, this.lastFetch)
    },
  },
});
