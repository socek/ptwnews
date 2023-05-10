<template>
  <q-page>
    <h1>Prime Time Wrestling news</h1>
    <q-inner-loading :showing="!store.isReady">
      <q-spinner-gears size="50px" color="primary" />
    </q-inner-loading>
    <div class="q-pa-md" style="max-width: 350px" v-if="store.isReady">
        <q-list bordered separator>
          <q-item v-ripple v-for="post in store.posts" :key="post.id">
            <q-item-section>
              <q-item-label><div v-html="post.title.rendered" /></q-item-label>
              <q-item-label caption>{{ post.id }}</q-item-label>
            </q-item-section>
          </q-item>

        </q-list>
      </div>
  </q-page>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { api } from 'boot/axios'
import useCounterStore from "stores/posts"

const store = useCounterStore()

onMounted(() => {
  store.init()
})
</script>
