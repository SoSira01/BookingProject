<script setup>
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import ListDetailBooking from '../components/ListDetailBooking.vue'
import router from "../router";
import jwt_decode from 'jwt-decode';
import Swal from 'sweetalert2'

const url = `${import.meta.env.VITE_APP_BASE_URL}`
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
  const swalDelete = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })
  
  swalDelete.fire({
    title: `Are you delete booking name: `+bookdetails.value.bookingName,
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, cancel!',
    reverseButtons: true
    }).then( async (result) => {
    if (result.isConfirmed) {
        const response = await fetch(`${url}/booking/${deleteId}`, {
          method: 'DELETE',
          headers: {
            Authorization: getCurrentUserToken()
          }
        })

        if(response.status === 200 || response.ok ) {
          console.log("deleted success")
          swalDelete.fire(
            'Deleted!',
            `Booking name: ${bookdetails.value.bookingName} has been delete`,
            'success'
          ).then(() => router.push({ name: "List"}))

        } else {
          swalDelete.fire(
            'Delete Booking Error!',
            'Please try again or contact admin',
            'error'
          )
          console.log("error, cannot delete data")
        }

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalDelete.fire(
          'Cancelled',
          `Booking name : ${bookdetails.value.bookingName} is safe :)`,
          'error'
        )
        console.log("cancel delete booking")
      }
    })

}

//Loading File
const loadEventFile = async (name) => {
  const res = await fetch(`${url}/files/${bookdetails.value.id}/${name}`, {
    method: 'GET',
    responseType: 'blob',
    headers: {"Authorization": getCurrentUserToken()}
  })

  if (res.status === 200) {
    var fileElem = document.createElement('a')
    fileElem.href = `${url}/files/${bookdetails.value.id}/${name}`
    fileElem.download = name
    document.body.appendChild(fileElem)

    fileElem.click()
    alert("Complete!")
  } else {
    alert("Incomplete!")
  }
}

//Viewing File
const viewEventFile = async (name) => {
  const res = await fetch(`${url}/files/view/${bookdetails.value.id}/${name}`, {
    method: 'GET',
    responseType: 'blob',
    headers: {"Authorization": getCurrentUserToken()}
  })

  if (res.status === 200) {
    // alert("Complete!")
    window.open(`${url}/files/view/${bookdetails.value.id}/${name}`)
  } else {
    alert("Incomplete!")
    // console.log("error, cannot delete data")
  }
}

//Reset Attachment
const resetFile = async(idbooking, e) => {
  let confirmReset = confirm("Do you want to reset this booking attachment?")
  if(confirmReset) {
    let requestOptions = {
            method: 'DELETE',
            headers: { Authorization: getCurrentUserToken() }
        };
    const res = await fetch(`${url}/files/${idbooking}`, requestOptions )
    // Swal.showLoading()
    if (res.status === 200) {
      alert('Reset completely!!')
      location.reload()
      // router.push({ name: 'ListDetail', param: {bookingId : bookdetails.value.id} })
    } else {
      alert('Error To Reset \n Please try again')
      console.log("error, cannot be edited")
    }
    e.preventDefault();  //prevent to refresh page
  }
}
</script>
 
<template>
  <ListDetailBooking :listDetailBooking="bookdetails" 
  @remove="removeEvent" @link="loadEventFile" 
  @view="viewEventFile" @delete="resetFile"/>
</template>
 
<style scoped>
</style>