<script setup>
import { ref } from 'vue'
import AddCategory from '../components/NewCategory.vue'
import router from '../router'
import Swal from 'sweetalert2'
import jwt_decode from 'jwt-decode'

const url = `${import.meta.env.VITE_APP_BASE_URL}`
let status = ref("")

//Get currentUserToken from Localstorage
const getCurrentUserToken = () => {
  let headerObject = {}
  if(localStorage.currentUser && localStorage.currentUserToken) {
    let token = jwt_decode(localStorage.currentUserToken)
    if(token.exp*1000 < Date.now()) {
        headerObject["Authorization"] = `Bearer ${localStorage.currentUserRefreshToken}`
    } else {
        headerObject["Authorization"] = `Bearer ${localStorage.currentUserToken}`
    }
    return headerObject
  }
  if(!localStorage.currentUser && !localStorage.currentUserToken) {
    return headerObject
  }
}

// POST 
const newCate = async (detailCate) => {
    if(detailCate.categoryDescription == ""){
        detailCate.categoryDescription = null
    }
    
    Swal.showLoading()

    const response = await fetch(`${url}/category`,
        {
            method: "POST",
            headers: { "content-type": "application/json","Authorization": getCurrentUserToken() },
            body: JSON.stringify({
                categoryName: detailCate.categoryName,
                duration: detailCate.duration,
                categoryDescription: detailCate.categoryDescription
            })
        })

    status = response.status

    if(status === 200) {
        Swal.fire({
            title:'Finished!',
            icon: 'success',
            text: 'Create new category successful!',
            showConfirmButton: true
        }).then(()=> {
            router.push({ name: 'CategoryList' }).then(() => location.reload())
        })
    } else {         
        Swal.fire({
            title:'Cancelled!',
            text: 'Cannot create new category.\nPlease try again',
            icon: 'error',
            showConfirmButton: false
        })
    }

} 

</script>
 
<template>
    <div>
        <AddCategory @createCate="newCate"/>
    </div>
</template>
 
<style>
</style>