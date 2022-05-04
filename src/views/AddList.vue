<script setup>
import { ref} from 'vue'
import NewBooking from '../components/NewBooking.vue'
import router from '../router'
const url = 'http://intproj21.sit.kmutt.ac.th:80/ssi5/api'
//const url = '  http://202.44.9.103:8080/ssi5/api'
const Categorydetails = ref([])

// POST 
const addBooking = async (newBookingEvent) => {
    console.log(newBookingEvent)
    const res = await fetch(`${url}/booking`,
        {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                bookingName: newBookingEvent.bookingName,
                startTime: new Date(newBookingEvent.startTime).toISOString(),
                email: newBookingEvent.email,
                note: newBookingEvent.note,
                categoryId:newBookingEvent.categoryid
            })
        })
    console.log(await res.json())

    if (res.status === 200) {
        alert('add new booking complete')
        router.push({ name: 'List' })
    } else console.log("cannot add new booking")
    
}

// const getListCategoryById = async () => {
//   const res = await fetch(`${url}/Category/${id.value}`);
//   if (res.status === 200) {
//     Categorydetails.value = await res.json()
//     console.log(Categorydetails.value)
//   } else console.log('error, cannot get Categorydetails')
// }

//   getListCategoryById();

</script>
 
<template>
    <div>
        <NewBooking 
        :categoryDetails="Categorydetails"
        @AddList="addBooking" />
    </div>
</template>
 
<style>
</style>