<script setup>
import { ref } from 'vue'
import NewBooking from '../components/NewBooking.vue'
import router from '../router'
import Swal from 'sweetalert2'
import jwt_decode from 'jwt-decode'
// import { getCurrentUserToken } from '../authen/authen_service.js'

const url = `${import.meta.env.VITE_APP_BASE_URL}`
// const url = 'http://intproj21.sit.kmutt.ac.th:80/ssi5/api'
// const url = 'http://localhost:8080/api'
// const url = '  http://202.44.9.103:8080/ssi5/api'
// const url = 'http://intproj21.sit.kmutt.ac.th:8080/ssi5/api'
const Categorydetails = ref([])
let status = ref("")

//Get currentUserToken from Localstorage
const getCurrentUserToken = () => {
  let headerObject = {}
//   `${headerObject.content-type}` = "application/json"
  headerObject["content-type"] = "application/json"
  if(localStorage.currentUser && localStorage.currentUserToken) {
    let token = jwt_decode(localStorage.currentUserToken)
    if(token.exp*1000 < Date.now()) {
        // `${headerObject.Authorization} : Bearer ${localStorage.currentUserRefreshToken}`
        headerObject.Authorization = `Bearer ${localStorage.currentUserRefreshToken}`
    } else {
        // `${headerObject.Authorization} : Bearer ${localStorage.currentUserToken}`
        headerObject.Authorization = `Bearer ${localStorage.currentUserToken}`
    }
    return headerObject
  }
  if(!localStorage.currentUser && !localStorage.currentUserToken) {
    return headerObject
  }
}

// POST 
const addBooking = async (newBookingEvent) => {
    const res = await fetch(`${url}/booking`,
        {
            method: "POST",
            headers: getCurrentUserToken() ,
            body: JSON.stringify({
                bookingName: newBookingEvent.bookingName,
                startTime: new Date(newBookingEvent.startTime).toISOString(),
                email: newBookingEvent.email.trim(),
                note: newBookingEvent.note,
                categoryId: newBookingEvent.category.id
            })
        })
    console.log(await res.json())
    Swal.showLoading()
    
    if (res.status === 200) {
        const response = await fetch(`${url}/email/sendMail`,
            {
                method: "POST",
                headers: { "content-type": "application/json","Authorization": getCurrentUserToken() },
                body: JSON.stringify({
                    recipientName: newBookingEvent.bookingName,
                    startTime: new Date(newBookingEvent.startTime).toISOString(),
                    recipient: newBookingEvent.email.trim(),
                    note: newBookingEvent.note,
                    category: newBookingEvent.category.categoryName
                })
            })

        status = response.status
        if(status === 200) {
            Swal.fire({
                title:'Finished!',
                icon: 'success',
                text: 'Add new booking and send the confirmation to your email successful!',
                showConfirmButton: true
            }).then(()=> {
                if(localStorage.currentUserToken){
                    router.push({ name: 'List' }).then(() => location.reload())
                }
                router.push({ name: 'Home' }).then(() => location.reload())
            })
        } else {         
            Swal.fire({
                title:'Cancelled!',
                text: 'Cannot Send Your Booking Confirmation, Please contact the admin if necessary',
                icon: 'error',
                showConfirmButton: false
            })
        }
        
    } else {
        alert('Error To Add Your Booking, Please try again')
    }
}
  
const getListCategory = async () => {
    const res = await fetch(`${url}/category`,{headers : { 'Authorization': getCurrentUserToken() }});
    if (res.status === 200) {
        Categorydetails.value = await res.json()
        console.log(Categorydetails.value)
    } else console.log('error, cannot get Categorydetails')
}

getListCategory();

</script>
 
<template>
    <div>
        <NewBooking :categoryDetails="Categorydetails" @AddList="addBooking" />
    </div>
</template>
 
<style>
</style>