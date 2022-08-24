<script setup>
import { useRoute } from 'vue-router'
import { ref, onBeforeMount} from 'vue'
import router from "../router";
import Swal from 'sweetalert2';
import jwt_decode from 'jwt-decode';
// import authHeader from '../../authen/authen_service';
// const url = 'http://intproj21.sit.kmutt.ac.th:80/ssi5/api'
// const url = 'http://intproj21.sit.kmutt.ac.th:8080/ssi5/api'
// const url = 'http://localhost:8080/api'
// const url = 'http://202.44.9.103:8080/ssi5/api'
const url = `${import.meta.env.VITE_APP_BASE_URL}`

const usersDetail = ref({})
let { params } = useRoute()
const userId = ref(params.userId)
console.log(userId.value)

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

//GET user by Id
onBeforeMount( async () => {
  const res = await fetch(`${url}/users/${userId.value}`, 
    {
      method: "GET",
      headers: { Authorization:  getCurrentUserToken() }
    } )
    
  if (res.status === 200) {
    usersDetail.value = await res.json()
    console.log(usersDetail.value)
  } else console.log('error, cannot get user list')
})

//DELETE User
const confirmAction = (id, name) => {
  return id
}

const removeUser = async (uid) => {
  let uName = usersDetail.value.name

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
          )
        router.push({name: 'ListUser'})

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

let convertCreated = (dateCreated) => {
  let convertTime = new Date(dateCreated).toLocaleString('en-US', { 
    dateStyle: 'full', 
    timeStyle: 'medium'
   });
  return convertTime;
};


</script>
 
<template>
<div class="mt-20">
        <p class="text-4xl font-semibold text-white text-center">User Detail</p>
        <div class="grid grid-cols-1 w-7/12 ml-auto mr-auto drop-shadow ">
          <div class="rounded-lg bg-gray-50 text-neutral m-10 p-8 drop-shadow-xl text-left" v-show="usersDetail.length!==0">
              <p>
                <span class="font-bold text-lg m-2 text-base-100">Name :
                </span>{{ usersDetail.name }}
              </p>
              <p>
                <span class="font-bold text-lg m-2 text-base-100">Email :
                </span>{{ usersDetail.email }}
              </p>
              <p>
                <span class="font-bold text-lg m-2 text-base-100">Role :
                </span>{{ usersDetail.role }}
              </p>
              <p>
                <span class="font-bold text-lg m-2 text-base-100">CreatedOn :
                </span>{{ convertCreated(usersDetail.createdOn) }}
              </p>
              <p>
                <span class="font-bold text-lg m-2 text-base-100">UpdatedOn :
                </span>{{ convertCreated(usersDetail.updatedOn) }}
              </p>
                      
             
                <router-link class="mt-5 btn btn-xs drop-shadow-xl mr-3" :to="'/ListUser'"> Back </router-link>
        
                <router-link class="mt-5 flex-row btn btn-base-100 btn-xs drop-shadow-xl mr-3" :to="{
                    name: 'EditUser',
                    params: {
                        usersId: usersDetail.id
                    } }">
                    Edit
                </router-link>  
                
                <button @click="removeUser(usersDetail.id)"
                    class="mt-5 flex-row btn btn-outline btn-error btn-xs drop-shadow-xl">DELETE</button>
          </div>
        </div>
</div>
<!-- <div >
  <EditUser 
  :editUser="usersDetail"
  @edit="editUser"/>
</div> -->
</template>
 
<style scoped>
</style>