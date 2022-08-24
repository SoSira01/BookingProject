<script setup>
import { logout } from '../authen/authen_service.js' 
let localUser = localStorage.currentUser
</script>
 
<template>

  <div>
    <div class="navbar p-2 mt-0 fixed w-full z-10 top-0 bg-base-100">
      <div class="flex-1">
        <p class="text-primary normal-case pl-5 font-bold text-2xl">
          <router-link :to="{ name: 'Home' }">- CLINIC | <span class="text-white">booking -</span></router-link>
          <span class="text-zinc-500 pl-7 text-base pr-3" v-if="localUser">
            {{ localUser }} 
            <button @click="logout()"
              class="btn btn-outline btn-error btn-xs drop-shadow-xl">Log Out</button>
        </span>
        </p>
      </div>
      <div class="flex-none">
        <ul class="menu menu-horizontal p-0 mr-8 text-lg text-white space-x-3">
          <li>
            <router-link :to="{ name: 'Home' }">Home</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'List' }">Show All Event</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'AddList' }">Add Event</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'CategoryList' }">CategoryList</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'ListUser' }">User</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'MatchUserPassword' }">Match Password</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'Login' }">Login</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'AboutUs' }">AboutUs</router-link>
          </li>

        </ul>
      </div>
    </div>
  </div>
  <div>
    <router-view></router-view>
  </div>

</template>
 
<style scoped>
</style>
