<script setup>
import AllCategory from '../components/AllCategory.vue';
import { ref, onBeforeMount } from 'vue'
import jwt_decode from 'jwt-decode'
//const url = `${import.meta.env.VITE_APP_BASE_URL}`
//const url = 'http://intproj21.sit.kmutt.ac.th:8080/ssi5/api'
//const url = 'http://intproj21.sit.kmutt.ac.th:80/ssi5/api'
// const url = 'http://localhost:8080/api'
// const url = ' http://202.44.9.103:8080/ssi5/api'
const url = `${import.meta.env.VITE_APP_BASE_URL}`

const cat = ref([])

//Get currentUserToken from Localstorage
const getCurrentUserToken = () => {
  if(localStorage.currentUser && localStorage.currentUserToken) {
    let token = jwt_decode(localStorage.currentUserToken)
    if(token.exp*1000 < Date.now()) {
        return `Bearer ${localStorage.currentUserRefreshToken}`
    }
    return `Bearer ${localStorage.currentUserToken}`
  }
  if(localStorage.currentUser && localStorage.userRefreshToken) {
    return `Bearer ${localStorage.userRefreshToken}`
  }
}

//GET ALL
const getAllListCategory = async () => {
  const res = await fetch(`${url}/category`,{headers: { 'Authorization': getCurrentUserToken() }})
  if (res.status === 200) {
    cat.value = await res.json()
    console.log(cat.value)
  } else console.log('error, cannot get Category List')
}

  getAllListCategory();

</script>
 
<template>
  <AllCategory 
  :allcategory="cat" />
</template>
 
<style>
</style>