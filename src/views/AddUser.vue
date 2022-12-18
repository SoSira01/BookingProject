<script setup>
import { ref } from 'vue'
import NewUser from '../components/NewUser.vue'
import router from '../router'
import jwt_decode from 'jwt-decode'

const url = `${import.meta.env.VITE_APP_BASE_URL}`
const AddUser = ref([])

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

// POST 
const addUser = async (newUser) => {
    if( newUser.password == newUser.checkPassword ){
        const res = await fetch(`${url}/users`,
        {
            method: "POST",
            headers: 
                { 
                    'Content-Type': "application/json", 
                    Authorization:  getCurrentUserToken() 
                },
            body: JSON.stringify({
                name: newUser.name.trim(),
                email: newUser.email.trim(),
                role: newUser.role,
                password: newUser.password
            })
        })

    //    console.log(await res.json())
        const test = await res.json()
        
        console.log(test)

        if (res.status === 200) {
            alert('Add New User complete')
            router.push({ name: 'ListUser'})
        } else {
        var error=""
            for (let i = 0; i < test.details.length; i++) {
                    console.log(test.details[i].errorMessage)
                    error+=test.details[i].errorMessage +" \n"
                }
            alert('Error To Add : ' +"\n" + error)
            console.log("cannot add new user")
        }
    }
}
</script>

<template>

  <NewUser 
  :addUser="AddUser"
  @add ="addUser"/>

</template>

<style scoped>
</style>