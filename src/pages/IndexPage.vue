<template>
  <q-page>
    <h1>Prime Time Wrestling news</h1>
    <q-inner-loading :showing="status != 'finished'">
      <q-spinner-gears size="50px" color="primary" />
    </q-inner-loading>
    <div class="q-pa-md" style="max-width: 350px" v-if="status == 'finished'">
        <q-list bordered separator>
          <q-item v-ripple v-for="post in posts" :key="post.id">
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
import { defineComponent, ref } from 'vue'
import { api } from 'boot/axios'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const posts = ref(null)
const status = ref('off')

async function loadData () {
  let result;
  try {
    status.value = 'loading';
    result = await api.get('/')
  } catch(error) {
    $q.notify({
      color: 'negative',
      position: 'top',
      message: 'Loading failed',
      icon: 'report_problem'
    })
    return
  }
  posts.value = result.data
  status.value = 'finished'
}

loadData()
</script>
