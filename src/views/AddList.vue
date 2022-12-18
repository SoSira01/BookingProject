<script setup>
import { ref } from 'vue'
import NewBooking from '../components/NewBooking.vue'
import router from '../router'
import Swal from 'sweetalert2'
import jwt_decode from 'jwt-decode'

const url = `${import.meta.env.VITE_APP_BASE_URL}`

const Categorydetails = ref([])
let status = ref("")

let files = ref([])
let form = new FormData()

const handleFileUpload = (event) => {
    event.preventDefault()
    console.log(event.target.files) // print : show files
    if(event.target.files[0] && event.target.files[0].size <= 10*1024*1024) {
        files[0] = event.target.files[0]
        console.log(files[0])

        // set to listing new file name
        let listFileElem = document.querySelector("#boxlistfile")
        let listFile = document.createAttribute('p')
        listFile.value = event.target.files[0].name
        listFileElem.innerHTML = listFile.value
        listFileElem.style.display = "block"

        document.querySelector("#noboxlistfile").style.display = "none" // close message to notice no new list
        document.querySelector("#boxlistfilebtn").style.display = "block" // show button to remove file later
    } 
    if(event.target.files[0] && event.target.files[0].size > 10*1024*1024) {
        alert(`The file size cannot be larger than 10 MB.\n Can not attach ${event.target.files[0].name}`)
    } else {
        console.log("Not have any file attachment")
    }

    console.log("finish process :: attach files") // print : to confirm finish working 
}

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

const addBooking = async (newBookingEvent) => {
    const json = JSON.stringify({
            bookingName: newBookingEvent.bookingName,
            startTime: new Date(newBookingEvent.startTime).toISOString(),
            email: newBookingEvent.email.trim(),
            note: newBookingEvent.note,
            categoryId: newBookingEvent.category.id
        });

    const blob = new Blob([json], {
        type: 'application/json'
    });

    form.append("booking",blob)

    let listFileElem = document.querySelector("#boxlistfile")
    if(listFileElem.style.display == "block") {
        form.append("file",files[0])
    }

    for (const value of form.values()) {
        console.log(value)
    }

    const res = await fetch(`${url}/booking`,
        {
            method: "POST",
            headers: getCurrentUserToken() ,
            body: form
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
                } else {
                    router.push({ name: 'Home' }).then(() => location.reload())
                }
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
        <NewBooking :categoryDetails="Categorydetails" 
        @AddList="addBooking" @Upload="handleFileUpload"/>
    </div>
</template>
 
<style>
</style>