<script setup>
import { ref } from 'vue'
import ListBooking from '../components/ListBooking.vue'
import router from '../router';
import jwt_decode from 'jwt-decode'
import Swal from 'sweetalert2'
const url = `${import.meta.env.VITE_APP_BASE_URL}`
// const url = 'http://intproj21.sit.kmutt.ac.th:8080/ssi5/api'
// const url = 'http://intproj21.sit.kmutt.ac.th:80/ssi5/api'
// const url = 'http://localhost:8080/api'
// const url = '  http://202.44.9.103:8080/ssi5/api'
const book = ref([])
const category =ref([])

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

//GET AllBooking
const getListBooking = async () => {
  const res = await fetch(`${url}/booking`,{ headers: { 'Authorization': getCurrentUserToken() }})
  if (res.status === 200) {
    book.value = await res.json()
    console.log(book.value)
  } else console.log('error, cannot get listNotes')
}

//DELETE booking
const removeEvent = async (deleteId) => {
  const res = await fetch(`${url}/booking/${deleteId}`, {
    method: 'DELETE',
    headers: { 'Authorization': getCurrentUserToken() }
  })
  if (res.status === 200) {
    book.value = book.value.filter((book) => { return book.id != deleteId })
    // router.push({name: 'List'})
    console.log("deleted success")
  } else {
    console.log("error, cannot delete data")
  }

  // let deleteBook = book.value.filter(book => book.id == deleteId)
  // console.log(deleteBook)
  // const swalDelete = Swal.mixin({
  //       customClass: {
  //           confirmButton: 'btn btn-success',
  //           cancelButton: 'btn btn-danger'
  //       },
  //       buttonsStyling: false
  //   })
  
  // swalDelete.fire({
  //   title: `Are you delete booking name: `+deleteBook[0].bookingName,
  //   text: "You won't be able to revert this!",
  //   icon: 'warning',
  //   showCancelButton: true,
  //   confirmButtonText: 'Yes, delete it!',
  //   cancelButtonText: 'No, cancel!',
  //   reverseButtons: true
  //   }).then( async (result) => {
  //   if (result.isConfirmed) {
  //       const response = await fetch(`${url}/booking/${deleteId}`, {
  //         method: 'DELETE',
  //         headers: {
  //           Authorization: getCurrentUserToken()
  //         }
  //       })

  //       if(response.status === 200 || response.ok ) {          
  //         console.log(response.status)
  //         book.value = book.value.filter((book) => { return book.id != deleteId })
  //         console.log("deleted success")
  //         swalDelete.fire(
  //           'Deleted!',
  //           `Booking name: ${deleteBook[0].bookingName} has been delete`,
  //           'success'
  //         )

  //       } else {
  //         swalDelete.fire(
  //           'Delete Booking Error!',
  //           'Please try again or contact admin',
  //           'error'
  //         )
  //         console.log("error, cannot delete data")
  //       }

  //     } else if (result.dismiss === Swal.DismissReason.cancel) {
  //       swalDelete.fire(
  //         'Cancelled',
  //         `Booking name : ${deleteBook[0].bookingName} is safe :)`,
  //         'error'
  //       )
  //     }
  //   })

  // e.preventDefault()
}

//GET category
const getAllListCategory = async () => {
  const res = await fetch(`${url}/category`,{ headers: { 'Authorization': getCurrentUserToken() }})    
  if (res.status === 200) {
    category.value = await res.json()
    console.log(category.value)
  } else console.log('error, cannot get Category List')
}

//Filter by categoryId
const getFilterCategory = async (filterId) => {
  console.log(filterId)
  if(filterId > 0 ){
      const res = await fetch(`${url}/booking/filter/${filterId}`,{ headers: { 'Authorization': getCurrentUserToken() }})

  if (res.status === 200) {
    book.value = await res.json()
    book.value = book.value.filter((book) => {return book.categoryId == filterId})
    console.log(book.value)
  } else console.log('error, cannot get Category List')

  } else getListBooking();
}

getFilterCategory()
getAllListCategory()

</script>
 
<template>
  <ListBooking 
  :listBooking="book"
  :categoryList="category"
  @filter="getFilterCategory"
  @remove="removeEvent" />
</template>
 
<style scoped>
</style>