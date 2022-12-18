<script setup>
import {ref,onBeforeMount} from 'vue'
import router from '../router'
import Swal from 'sweetalert2'
import AllUser from '../components/AllUser.vue'
import jwt_decode from 'jwt-decode'

const url = `${import.meta.env.VITE_APP_BASE_URL}`

const user = ref([])

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

// Function for transforming from JSON to Object
var GetUserData = function(sJson, id, property) {
  // parse the stringified JSON into a JavaScript object
  let parsedJson = JSON.parse(sJson);
  // check if the property be together with a given ID
  for(var i = 0; i < parsedJson.length; i += 1) {
    if(parseInt(parsedJson[i].id) === parseInt(id)) {
      (typeof parsedJson[i][property]) !== 'undefined'
      return parsedJson[i][property]
    }
  }
  return false;
}

//GET AllUser
onBeforeMount( async () => {
  const res = await fetch(`${url}/users`,
    {
      method: "GET",
      headers: { Authorization:  getCurrentUserToken() }
    }
  )
  if (res.status === 200) {
    user.value = await res.json()
    console.log(user.value)
  } else console.log('error, cannot get user list')
})

//DELETE User
const removeUser = async (uid) => {
  let selectedData = []
  selectedData = JSON.stringify(user.value)
  let uName = GetUserData(selectedData, uid, "name")

  const swalDelete = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })
  
  swalDelete.fire({
    title: `Are you delete user name: `+uName,
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, cancel!',
    reverseButtons: true
    }).then( async (result) => {
    if (result.isConfirmed) {
        const response = await fetch(`${url}/users/${uid}`, {
          method: 'DELETE',
          headers: {
            Authorization: getCurrentUserToken()
          }
        })

        if(response.status === 200 || response.ok ) {          
          console.log(response.status)
          console.log("deleted success")
          swalDelete.fire(
            'Deleted!',
            `User name: ${uName} has been delete`,
            'success'
          ).then(() => location.reload())

        } else {
          console.log("error, cannot delete data")
        }

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalDelete.fire(
          'Cancelled',
          'Your User data is safe :)',
          'error'
        )
      }
    })
}

</script>
 
<template>

  <AllUser 
  :listUser="user"
  @remove="removeUser"/>

</template>
 
<style>

</style>