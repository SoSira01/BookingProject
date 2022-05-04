<script setup>
import {useRoute} from 'vue-router'
import {ref} from 'vue'
import EditBooking from '../components/EditBooking.vue' 
import router from "../router";

const url = 'http://intproj21.sit.kmutt.ac.th:80/ssi5/api'
// const url = '  http://202.44.9.103:8080/ssi5/api'
// //EDIT
const editing = ref({});           
// // const toEditMode = (editNote) => {    
// //  console.log(editNote)
// //  editingNote.value = editNote
// // }

let {params} = useRoute() 
console.log(params.BookingIdEdit)  

const id = ref(params.BookingIdEdit) 

//PUT (edit)
const editBooking = async (newedit) => {   
  console.log(newedit) 
  const res = await fetch(`${url}/booking/${id.value}` , {
    method : 'PUT', 
    headers : {
      'content-type' : 'application/json'
    },
    body: JSON.stringify({
      id : id.value,
      startTime: new Date(newedit.startTime).toISOString(),
      note: newedit.note,
    }) 
  })
console.log(await res.json())
  if(res.status === 200){
    const edited = await res.json()
    editing.value.push(edited)
    // editing.value = editing.value.map(
    // (note) => note.id === edited.id ? {...note, noteDetail : editedNote.noteDetail} : note
    // )
    // router.push({name: 'ListDetail'})
    console.log('edited success')
  }else{
    console.log('error, cannot be edited')
  }

  editing.value = {}   
}
</script>
 
<template>
 <EditBooking
 :eventForedit = "editing"
    @edit ="editBooking"
  />
</template>
 
<style>

</style>