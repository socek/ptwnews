<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <img
          alt="Quasar logo"
          src="~assets/ptwlogo.png"
          style="width: 73px; height: 25px"
        >

        <q-toolbar-title>
          Prime Time Wrestilng
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import axios from 'axios'

export default defineComponent({
  name: 'MainLayout',
})
</script>
