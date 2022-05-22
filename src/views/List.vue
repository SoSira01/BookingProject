<script setup>
import { ref, onBeforeMount } from 'vue'
import ListBooking from '../components/ListBooking.vue'
//const url = 'http://intproj21.sit.kmutt.ac.th:80/ssi5/api'
const url = '  http://202.44.9.103:8080/ssi5/api'
const book = ref([])
const category = ref([])
//GET
const getListBooking = async () => {
  const res = await fetch(`${url}/booking`)
  if (res.status === 200) {
    book.value = await res.json()
    console.log(book.value)
  } else console.log('error, cannot get listNotes')
}
onBeforeMount(() => {
  getListBooking();
})
//DELETE
const removeEvent = async (deleteId) => {
  const res = await fetch(`${url}/booking/${deleteId}`, {
    method: 'DELETE'
  })
  if (res.status === 200) {
    book.value = book.value.filter((book) => { return book.id != deleteId })
    // router.push({name: 'List'})
    console.log("deleted success")
  } else {
    console.log("error, cannot delete data")
  }
}
//GET Category
const getAllListCategory = async () => {
  const res = await fetch(`${url}/category`)
  if (res.status === 200) {
    category.value = await res.json()
    console.log(category.value)
  } else console.log('error, cannot get Category List')
}
getAllListCategory();
</script>
 
<template>
  <ListBooking 
  :listBooking="book"
  :categorylist="category"
  @remove="removeEvent" />
</template>
 
<style scoped>
</style>