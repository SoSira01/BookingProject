<script setup>
import { logout } from '../authen/authen_service.js' 
let localUser = localStorage.currentUser
let localUserRole = localStorage.currentUserRole
</script>
 
<template>

  <div>
    <div class="navbar p-2 mt-0 fixed w-full z-10 top-0 bg-base-100">
      <div class="flex-1">
        <p class="text-primary normal-case pl-1 font-bold text-2xl">
          <router-link :to="{ name: 'Home' }">- CLINIC | <span class="text-white">booking -</span></router-link>
          <span class="text-zinc-500 pl-7 text-sm pr-2" v-if="localUser">
            {{ localUser }} 
            <button @click="logout()"
              class="btn btn-outline btn-error rounded-full btn-xs text-xs ml-2">Log Out</button>
        </span>
        </p>
      </div>
      <div class="flex-none">
        <ul class="menu menu-horizontal p-0 mr-1 text-lg text-white">
          <li>
            <router-link :to="{ name: 'Home' }">Home</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'List' }">Show All Event</router-link>
          </li>
          <li v-if="localUserRole != 'lecturer'">
            <router-link :to="{ name: 'AddList' }">Add Event</router-link>
          </li>
          <li v-if="localUserRole == 'admin' || localUserRole == 'lecturer'">
            <router-link :to="{ name: 'CategoryList' }">CategoryList</router-link>
          </li>
          <li v-if="localUserRole == 'admin'">
            <router-link :to="{ name: 'AddCategory' }">Add Category</router-link>
          </li>
          <li v-if="localUserRole == 'admin'">
            <router-link :to="{ name: 'ListUser' }">User</router-link>
          </li>
          <li v-if="localUserRole == 'admin'">
            <router-link :to="{ name: 'MatchUserPassword' }">Match Password</router-link>
          </li>
          <li v-if="!localUser">
            <router-link :to="{ name: 'Login' }">Login</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'AboutUs' }">About Us</router-link>
          </li>
          <li v-if="localUserRole != 'admin'">
            <router-link :to="{ name: 'ContactAdmin' }">Contact Admin</router-link>
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
