<script setup>
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import ListDetailBooking from '../components/ListDetailBooking.vue'
import router from "../router";
import jwt_decode from 'jwt-decode';

const url = `${import.meta.env.VITE_APP_BASE_URL}`
// const url = 'http://localhost:8080/api'
// const url = 'http://intproj21.sit.kmutt.ac.th:80/ssi5/api'
// const url = 'http://intproj21.sit.kmutt.ac.th:8080/ssi5/api'
// const url = 'http://202.44.9.103:8080/ssi5/api'

const bookdetails = ref({})
let { params } = useRoute()
 
const id = ref(params.BookingId)

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

//GET by id
const getListBookingById = async () => {
  const res = await fetch(`${url}/booking/${id.value}`,{ headers: {"Authorization": getCurrentUserToken()} });
  if (res.status === 200) {
    bookdetails.value = await res.json()
    console.log(bookdetails.value)
  } else console.log('error, cannot get listNotesById')
}
getListBookingById();

//DELETE
const removeEvent = async (deleteId) => {
  const res = await fetch(`${url}/booking/${deleteId}`, {
    method: 'DELETE',
    headers: {"Authorization": getCurrentUserToken()}
  })
  if (res.status === 200) {
    router.push({ name: 'List' })
    console.log("deleted success")
  } else {
    console.log("error, cannot delete data")
  }
}
</script>
 
<template>
  <ListDetailBooking :listDetailBooking="bookdetails" @remove="removeEvent" @edit="" />
</template>
 
<style scoped>
</style>