<script setup>
import { useRoute } from 'vue-router';
import { ref,onBeforeMount } from 'vue';
import EditUser from '../components/EditUser.vue';
import router from '../router'

// const url = 'http://intproj21.sit.kmutt.ac.th:80/ssi5/api'
const url = 'http://intproj21.sit.kmutt.ac.th:8080/ssi5/api'

const usersDetail = ref({})
let { params } = useRoute()
console.log(params.userId)
const id = ref(params.userId)

const editUser = async (newedit, e) => {
  e.preventDefault();  //prevent to refresh page

  console.log(newedit)
  const res = await fetch(`${url}/user/${userId.value}`, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
        name: usersDetail.value.name.trim(),
        email: usersDetail.value.email.trim(),
        role: usersDetail.value.role
    })
  })

  if (res.status === 200) {
    router.push({ name: 'ListDetail' })
  } else {
    alert('Error To Edit Please try again')
    console.log("error, cannot be edited")
  }

}

//GETById
const getListBookingById = async () => {
  const res = await fetch(`${url}/user/${id.value}`);
  if (res.status === 200) {
    usersDetail.value = await res.json()
    console.log(usersDetail.value)
  } else 
  console.log('error, cannot get editdetails')
}

onBeforeMount(() => {getListBookingById()})

</script>

<template>
 <EditUser @EditUser="editUser"></EditUser>
</template>

<style scoped>
</style>