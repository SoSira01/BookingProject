<script setup>
import {useRoute} from 'vue-router'
//import { ref, onBeforeMount } from 'vue'
import ListDetailBooking from '../components/ListDetailBooking.vue'
//const bookdetails = ref([])
const goBack = () => appRoute()

let {params} = useRoute() 
// console.log(params.BookingId)  

//GET
// const getListBookingById = async () => {
//   const res = await fetch(`http://10.4.56.116:8080/api/booking/${id}`)
//   if (res.status === 200) {
//     bookdetails.value = await res.json()
//     console.log(bookdetails.value)
//   } else console.log('error, cannot get listNotesById')
// }

// onBeforeMount(() => {
//   getListBookingById();
// })

</script>
 
<template>
  <ListDetailBooking 
  :listDetailBooking="bookdetails"
  @Back="goBack"/>

  <div class="mt-8 text-center">
  <p class="text-4xl font-semibold">Detail List Booking</p>
  <div class="grid grid-cols-3">
  <div class="rounded-lg bg-info text-black text-left m-10 p-5 drop-shadow-xl">
  <p>BookingId : {{this.$route.params.BookingId}}</p>
  <p>startTime :{{this.$route.params.startTime}}</p> 
  <p>duration :{{this.$route.params.duration}}</p> 
  <p>categoryName :{{this.$route.params.catagoryName}}</p> 
  <p>Booking Name :{{this.$route.params.BookingName}}</p> 
  <p>Email :{{this.$route.params.email}}</p> 
  <p>Note :{{this.$route.params.note}}</p> 
   <button @click="$emit('remove', { bookingId : booking.id, categoriesId : categories.id})" 
   class="my-2 flex-row btn btn-outline btn-error btn-xs drop-shadow-xl">DELETE</button> 

   </div>
    </div>
    </div>
<!-- 
  <div class="mt-8 text-center">
        <p class="text-4xl font-semibold">Detail List Booking</p>
        <div class="grid grid-cols-3">
        <div class="rounded-lg bg-info text-black text-center m-10 p-5 drop-shadow-xl" v-for="booking in listDetailBooking" :key="listDetailBooking.id">
            <p>startTime : {{ booking.startTime}}</p> 
            <p>duration : {{booking.category.duration}} Minutes</p>
             <p>categoryName : {{booking.category.categoryName}}</p>
             <p>bookingName : {{ booking.bookingName}}</p>
             <p>Email : {{ booking.email}}</p>
             <p>Note : {{ booking.note}}</p>
            <button @click="$emit('remove', { bookingId : booking.id, categoriesId : categories.id})" class="my-2 flex-row btn btn-outline btn-error btn-xs drop-shadow-xl">DELETE</button>
            <br>
        </div>
    </div>
    </div> -->
    
</template>
 
<style scoped></style>