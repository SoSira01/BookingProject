<script setup>
import { useRoute } from 'vue-router'
import { ref,onBeforeMount } from 'vue'
import EditBooking from '../components/EditBooking.vue'
import router from "../router"
import jwt_decode from 'jwt-decode'
const url = `${import.meta.env.VITE_APP_BASE_URL}`
// const url = 'http://intproj21.sit.kmutt.ac.th:8080/ssi5/api'
// const url = 'http://intproj21.sit.kmutt.ac.th:80/ssi5/api'
// const url = 'http://localhost:8080/api'
// const url = '  http://202.44.9.103:8080/ssi5/api'

//EDIT
const editdetails = ref({});

let { params } = useRoute()
console.log(params.BookingIdEdit)

const id = ref(params.BookingIdEdit)

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

//PATCH (edit)
const editBooking = async (newedit, e) => {
  e.preventDefault();  //prevent to refresh page

  //   if (editing.duration > 481 || editing.duration < 1){
  //   alert("you can add number only between 1 - 480")
  //   return
  // }

  let dataBody = {}

  // check name
  if(newedit.startTime != null) {
    dataBody.startTime = new Date(newedit.startTime).toISOString();
    alert("start time : "+dataBody.startTime);
  }
  // check email
  if(newedit.note != null) {
    dataBody.note = newedit.note;
    alert("note : "+dataBody.note);
  }

  let requestOptions = {
          method: 'PATCH',
          headers: { 
              'Content-Type': 'application/json',
              Authorization: getCurrentUserToken()
          },
          body: JSON.stringify(dataBody)
      };

  console.log(newedit)
  const res = await fetch(`${url}/booking/${id.value}`, requestOptions )
  if (res.status === 200) {
    router.push({ name: 'ListDetail' })
  } else {
    alert('Error To Edit Please try again')
    console.log("error, cannot be edited")
  }

}

//GETById
const getListBookingById = async () => {
  const res = await fetch(`${url}/booking/${id.value}`,{headers: { 'Authorization': getCurrentUserToken() }});
  if (res.status === 200) {
    editdetails.value = await res.json()
    console.log(editdetails.value)
  } else 
  console.log('error, cannot get editdetails')
}

onBeforeMount(() => {getListBookingById()})

</script>
 
<template>
  <EditBooking :editBook="editdetails" @edit="editBooking" />
</template>
 
<style>
</style>