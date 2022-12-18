<script setup>
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import EditForCat from '../components/EditForCat.vue'
import router from "../router";
import jwt_decode from 'jwt-decode'
const url = `${import.meta.env.VITE_APP_BASE_URL}`

const editValue =ref([])
let { params } = useRoute()
console.log(params.CategoryId)

const id = ref(params.CategoryId)

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

//PATCH
const editCategory = async (editing, e) => {
  e.preventDefault();
  console.log(editing)

  let editCate = {}
  if(editing != null && editing != "" && editing != undefined) {
    editCate.categoryName = editing.categoryName
    editCate.duration = editing.duration
  } else {
    console.log("error to edit the empty")
  }
  if (editing.categoryDescription == null 
      || editing.categoryDescription == "" 
      || editing.categoryDescription == undefined){
    console.log("not need to edit new empty")
  } else {
    editCate.categoryDescription = editing.categoryDescription
  }

  if(editCate.categoryName && editCate.duration){
    const res = await fetch(`${url}/category/${id.value}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'Authorization': getCurrentUserToken()
      },
      body: JSON.stringify(editCate)
    })

    if (res.status === 200) {
      router.push({ name: 'CategoryList' })
    }else  if (res.status === 400) {
      alert('error, Name is not Uniqued')
    } else  {
      alert('error, cannot be edited')
      console.log("error, cannot be edited")
    }

    return console.log("finished condition")

  } else {
    // alert("finished process")
    return console.log("finished process")
  }
}

//GETById
const getListCategoryById = async () => {
  const res = await fetch(`${url}/category/${id.value}`,{ headers: { 'Authorization': getCurrentUserToken() }});
  if (res.status === 200) {
    editValue.value = await res.json()
    console.log(editValue.value)
  } else console.log('error, cannot get editCategorydetails')
}
 getListCategoryById();

</script>
 
<template>
  <EditForCat :editCategory="editValue" @edit="editCategory" />
</template>
 
<style>
</style>