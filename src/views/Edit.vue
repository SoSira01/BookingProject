<script setup>
import { useRoute } from 'vue-router'
import { ref,onBeforeMount } from 'vue'
import EditBooking from '../components/EditBooking.vue'
import router from "../router"
import jwt_decode from 'jwt-decode'
const url = `${import.meta.env.VITE_APP_BASE_URL}`
// const url = 'http://intproj21.sit.kmutt.ac.th:8080/ssi5/api'
// const url = 'http://intproj21.sit.kmutt.ac.th:80/ssi5/api'
// const url = 'http://localhost:8080/api'
// const url = '  http://202.44.9.103:8080/ssi5/api'

//EDIT
const editdetails = ref({});
let files = ref([])
let formEdit = new FormData()

let { params } = useRoute()
console.log(params.BookingIdEdit)

const id = ref(params.BookingIdEdit)

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

//PATCH (edit)
const editBooking = async (newedit, e) => {
  e.preventDefault();  //prevent to refresh page

  // check file
  let listFileElem = document.querySelector("#listfile")
  if(listFileElem.getAttribute("name") == "edit"
  && (listFileElem.innerHTML != "" || editdetails.value.fileName == null)
  ) {
      if(files[0] == undefined) { files[0] = null }
      formEdit.append("file",files[0])
      // alert(`File FormData Status: ${formEdit.get("file") != null}`)
  }

  let dataBody = {}

  // check start-time
  if(newedit != undefined && newedit.startTime != null) {
    dataBody.startTime = new Date(newedit.startTime).toISOString();
    // alert("start time : "+dataBody.startTime);
  } else {console.log(newedit+" :: start-time : null / undefined")}
  // check note
  if(newedit != undefined && newedit.note != null && newedit.note != "") {
    dataBody.note = newedit.note;
    // alert("note : "+dataBody.note);
  } else {console.log(newedit+" :: note : null / undefined")}

  const blob = new Blob([JSON.stringify(dataBody)], {
        type: 'application/json'
  });

  formEdit.append("booking",blob)

  let requestOptions = {
          method: 'PATCH',
          headers: { Authorization: getCurrentUserToken() },
          body: formEdit
      };

  if(dataBody.startTime != undefined 
    || (newedit.note != undefined && newedit.note != "") 
    || ( formEdit.get("file") != null )) {

    const res = await fetch(`${url}/booking/${id.value}`, requestOptions )
      if (res.status === 200) {
        alert('Edit completely!!')
        router.push({ name: 'ListDetail',params: {BookingId: editdetails.value.id } })
      } else {
        let response = await res.json()
        alert('Error To Edit Please try again \n'+response.message)
        console.log("error, cannot be edited")
      }

    console.log(formEdit.get("file"))
    return console.log("Condition to Edit :: true")

  }else{
    return console.log("Condition to Edit :: false")
  }

}

//GETById
const getListBookingById = async () => {
  const res = await fetch(`${url}/booking/${id.value}`,{headers: { 'Authorization': getCurrentUserToken() }});
  if (res.status === 200) {
    editdetails.value = await res.json()
    console.log(editdetails.value)
  } else 
  console.log('error, cannot get editdetails')
}

onBeforeMount(() => {getListBookingById()})

//Update File Attachment
const handleFileUpload = (event) => {
    event.preventDefault()
    console.log(event.target.files) // print : show files
    if(event.target.files[0] && event.target.files[0].size <= 10*1024*1024) {
        files[0] = event.target.files[0]

        // for list new file to edit
        let listFileElem = document.querySelector("#listfile") 
        let listFile = document.createAttribute('p')
        listFile.value = event.target.files[0].name
        listFileElem.style.display = "block"
        listFileElem.innerHTML = listFile.value
        
        document.querySelector("#fileAttach").style.display = "none" // hidden previous's file in OASIP
        document.querySelector("#nolistfile").style.display = "none" // hidden message "No Any New Attachment"
        document.querySelector("#showNewFile").style.display = "block" // show part of listing file attachment
        document.querySelector("#listfilebtn").style.display = "block" // show button to remove file later

        console.log("add selected file in attachment list")
        console.log(files[0])
    } 
    if(event.target.files[0] && event.target.files[0].size > 10*1024*1024) {
        alert(`The file size cannot be larger than 10 MB.\n Can not attach ${event.target.files[0].name}`)
    } 

    console.log("finish process :: attach file") // print : to confirm finish working 
}

//Reset Attachment
const resetFile = (e) => {
  // alert("1: "+editdetails.value.fileName)
  editdetails.value.fileName = null
  // alert("2: "+editdetails.value.fileName)
  // alert("2 boolean 1: "+(editdetails.value.fileName==null))
  // alert("2 boolean 2: "+(editdetails.value.fileName==""))
  // alert(document.querySelector("#noCurrentFile"))
  e.preventDefault()
}

</script>
 
<template>
  <EditBooking :editBook="editdetails" 
  @edit="editBooking" @updateFile="handleFileUpload"
  @delete="resetFile"/>
</template>
 
<style>
</style>