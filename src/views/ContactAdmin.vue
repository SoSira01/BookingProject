<script setup>
import { ref } from 'vue'
import ContactForm from '../components/ContactForm.vue'
import router from '../router'
import Swal from 'sweetalert2'
import jwt_decode from 'jwt-decode'
// import { getCurrentUserToken } from '../authen/authen_service.js'

const url = `${import.meta.env.VITE_APP_BASE_URL}`

let status = ref("")

//Get currentUserToken from Localstorage
const getCurrentUserToken = () => {
  let headerObject = {}
  if(localStorage.currentUser && localStorage.currentUserToken) {
    let token = jwt_decode(localStorage.currentUserToken)
    if(token.exp*1000 < Date.now()) {
        headerObject["Authorization"] = `Bearer ${localStorage.currentUserRefreshToken}`
    } else {
        headerObject["Authorization"] = `Bearer ${localStorage.currentUserToken}`
    }
    return headerObject
  }
  if(!localStorage.currentUser && !localStorage.currentUserToken) {
    return headerObject
  }
}

// POST 
const sendingProblem = async (detailMail) => {
    Swal.showLoading()
    let email = ""
    if(detailMail.email == "" && localStorage.currentUser){
        email = localStorage.currentUser
    } else if (detailMail.email != "" && !localStorage.currentUser) {
        email = detailMail.email
    }

    const response = await fetch(`${url}/email/sendProblemMail`,
        {
            method: "POST",
            headers: { "content-type": "application/json","Authorization": getCurrentUserToken() },
            body: JSON.stringify({
                recipient: email,
                selfTopic: detailMail.topic,
                note: detailMail.note
            })
        })

    status = response.status

    if(status === 200) {
        Swal.fire({
            title:'Finished!',
            icon: 'success',
            text: 'Send the report to our admin successful!',
            showConfirmButton: true
        }).then(()=> {
            router.push({ name: 'Home' }).then(() => location.reload())
        })
    } else {         
        Swal.fire({
            title:'Cancelled!',
            text: 'Cannot Send Your Report, Please try again',
            icon: 'error',
            showConfirmButton: false
        })
    }

} 

</script>
 
<template>
    <div>
        <ContactForm @send="sendingProblem"/>
    </div>
</template>
 
<style>
</style>