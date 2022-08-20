<script setup>
import { ref } from 'vue'
import NewUser from '../components/NewUser.vue'
import router from '../router'

// const url = 'http://intproj21.sit.kmutt.ac.th:80/ssi5/api'
// const url = '  http://202.44.9.103:8080/ssi5/api'
const url = 'http://intproj21.sit.kmutt.ac.th:8080/ssi5/api'
const AddUser = ref([])

// POST 
const addUser = async (newUser) => {

    const res = await fetch(`${url}/user`,
        {
            method: "POST",
            headers: { "content-type": "application/json" },
                body: JSON.stringify({
                name: newUser.name.trim(),
                email: newUser.email.trim(),
                role: newUser.role,

            })
        })

   console.log(await res.json())

if (res.status === 200) {
        alert('Add New User complete')
        router.push({ name: 'ListUser'})
    } else {
        alert('Error To Add :') 

//หาวิธีดึง errorมาจาก be 
//{
//     "status": "BAD_REQUEST",
//     "message": "Validation failed !!!",
//     "details": [
//         {
//             "field": "name",
//             "errorMessage": "Name Not Unique"
//         },
//         {
//             "field": "email",
//             "errorMessage": "Must be well-formed as email address"
//         }
//     ]
// }

        console.log("cannot add new user")
    }

}
  
// const getListCategory = async () => {
//     const res = await fetch(`${url}/category`);
//     if (res.status === 200) {
//         Categorydetails.value = await res.json()
//         console.log(Categorydetails.value)
//     } else console.log('error, cannot get Categorydetails')
// }

// getListCategory();

</script>

<template>

  <NewUser 
  :addUser="AddUser"
  @add ="addUser"/>

</template>

<style scoped>
</style>