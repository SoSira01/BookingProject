<script setup>
import AllCategory from '../components/AllCategory.vue';
import { ref, onBeforeMount } from 'vue'
import router from '../router'
import jwt_decode from 'jwt-decode'

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
    cat.value.forEach((cat)=>{ 
      console.log(cat.id)
      getEventInCategory(cat.id)
    })
  } else console.log('error, cannot get Category List')
}

//Check with role and the number of events
const getEventInCategory = async (cateId) => {
  const res = await fetch(`${url}/category/${cateId}/permission`,{headers: { 'Authorization': getCurrentUserToken() }})
  if (res.status === 200) {
    document.getElementById(`edit${cateId}`).style.visibility = 'visible'
    if(localStorage.currentUserRole == 'lecturer') {
      document.getElementById(`linkToCate${cateId}`).style.visibility = 'visible'
    }
  } else if (res.status === 403) {
    document.getElementById(`edit${cateId}`).style.visibility = 'hidden'
    if(localStorage.currentUserRole == 'lecturer') {
      document.getElementById(`linkToCate${cateId}`).style.visibility = 'hidden'
    }
    console.log('You do not have the permission!')
  } else {
    console.log('Error, cannot sync event with this category. Please try again')
  }
}

onBeforeMount(
  () => {
    getAllListCategory()
  },
)  
</script>
 
<template>
  <AllCategory 
  :allcategory="cat"
  @checkStatus="getEventInCategory" />
</template>
 
<style>
</style>