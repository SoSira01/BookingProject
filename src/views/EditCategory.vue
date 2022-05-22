<script setup>
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import EditForCat from '../components/EditForCat.vue'
import router from "../router";

//const url = 'http://intproj21.sit.kmutt.ac.th:80/ssi5/api'
const url = '  http://202.44.9.103:8080/ssi5/api'

let { params } = useRoute()
console.log(params.CategoryId)

const id = ref(params.CategoryId)

//validate duraiton
const durationTime = ref('')

const durationNotNull = (dn) => {
  if(dn !== undefined && dn.length !== 0){
    return true;
  }
  return false
}

const durationValid = (dn) => {
  if(dn > 480 || dn < 1){
    return true;
  }
  return false
}

//EDIT
const editValue = ref({});

//PATCH
const editCategory = async (editing, e) => {
  e.preventDefault();
  console.log(editing)
  //validate duration here
  if(!durationNotNull(editing)){
    alert("cannot be empty")
    return
  }else if (!durationNotNull(editing)){
    alert("you can add number only between 1 - 480")
    return
  }

  const res = await fetch(`${url}/category/${id.value}`, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      categoryName: editing.categoryName,
      duration: editing.duration,
      categoryDescription: editing.categoryDescription
    })
  })
  if (res.status === 200) {
    router.push({ name: 'CategoryList' })
  } else {
    alert('Error To Edit Please try again')
    console.log("error, cannot be edited")
  }

}
//GETById
const getListCategoryById = async () => {
  const res = await fetch(`${url}/category/${id.value}`);
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