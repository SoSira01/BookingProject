<script setup>
import {ref} from 'vue'
import AllUser from '../components/AllUser.vue'

// const url = 'http://intproj21.sit.kmutt.ac.th:8080/ssi5/api'
const url = 'http://intproj21.sit.kmutt.ac.th:80/ssi5/api'
// const url = '  http://202.44.9.103:8080/ssi5/api'
const user = ref([])
//GET AllUser
const getListUser = async () => {
  const res = await fetch(`${url}/user`)
  if (res.status === 200) {
    user.value = await res.json()
    console.log(user.value)
  } else console.log('error, cannot get user list')
}

getListUser();

//DELETE User
const removeUser = async (deleteId) => {
  const res = await fetch(`${url}/user/${deleteId}`, {
    method: 'DELETE'
  })
  if (res.status === 200) {
    user.value = user.value.filter((user) => { return user.id != deleteId })
    // router.push({name: 'List'})
    console.log("deleted success")
  } else {
    console.log("error, cannot delete data")
  }
}

</script>
 
<template>

  <AllUser 
  :listUser="user"
  @remove="removeUser"/>
</template>
 
<style>

</style>