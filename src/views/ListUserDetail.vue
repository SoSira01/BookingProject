<script setup>
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import router from "../router";
import EditUser from '../components/EditUser.vue';
// const url = 'http://intproj21.sit.kmutt.ac.th:80/ssi5/api'
const url = 'http://intproj21.sit.kmutt.ac.th:8080/ssi5/api'
// const url = 'http://202.44.9.103:8080/ssi5/api'

const usersDetail = ref({})
let { params } = useRoute()
//GET user by Id
const userId = ref(params.userId)
console.log(userId.value)
const getListUserById = async () => {
  const res = await fetch(`${url}/user/${userId.value}`);
  if (res.status === 200) {
    usersDetail.value = await res.json()
    console.log(usersDetail.value)
  } else console.log('error, cannot get listUserById')
}
getListUserById();

//DELETE User
const removeUser = async (deleteId) => {
  const res = await fetch(`${url}/user/${deleteId}`, {
    method: 'DELETE'
  })
  if (res.status === 200) {
    router.push({name: 'ListUser'})
    console.log("deleted success")
  } else {
    console.log("error, cannot delete data")
  }
}
// //PATCH user
// const editUser = async (editing, e) => {
//   e.preventDefault();
//   console.log(editing)


//   const res = await fetch(`${url}/category/${id.value}`, {
//     method: 'PATCH',
//     headers: {
//       'content-type': 'application/json'
//     },
//     body: JSON.stringify({
//       name: usersDetail.name,
//       email: usersDetail.email,
//       role: usersDetail.role
//     })
//   })
//   if (res.status === 200) {
//     router.push({ name: '/ListUser/:userId' })
//   }else  
//     alert('error, cannot be edited')
//     console.log("error, cannot be edited")
// }

let convertCreated = (dateCreated) => {
  let convertTime = new Date(dateCreated).toLocaleString('en-US', 
   { dateStyle: 'full', 
   timeStyle: 'medium', 
  //  timeZone: 'Asia/Bangkok'
   });
  return convertTime;
};

const confirmAction = (id, name) => {
    let confirmAction = confirm(`Do you want to delete name: ${name}`)
    if (confirmAction) {
        return id
    }
}
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
                
                <button @click="removeUser(usersDetail.id), confirmAction(usersDetail.id, usersDetail.name)"
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