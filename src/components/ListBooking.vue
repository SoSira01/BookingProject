<script setup>
defineEmits(['remove','details'])

defineProps({
    listBooking : {
        type : Array,
        require : true,
        default: []
    }
})

const confirmAction = (bookingId,bookingName) => {
    let confirmAction =  confirm(`Do you want to delete booking: ${bookingName}`)
    if(confirmAction) {
        return bookingId
    }
}

</script>

<template>
<div class="mt-8 text-center">
        <p class="text-4xl font-semibold text-white">List Booking</p>
        <br>
        <!-- <p>{{noSchedule()}}</p> -->
        <p v-show="listBooking == ''">No schedule event</p>
        <!-- <p v-if="listBooking == '' ">No schedule event</p> -->
    <div class="grid grid-cols-1 w-7/12 ml-auto mr-auto">
        <div class="rounded-lg bg-gray-50 text-neutral m-10 p-8 drop-shadow-xl text-left" v-for="booking in listBooking" :key="listBooking.id">
    
            <p><span class="font-bold text-lg m-2 text-base-100">Booking name :  </span>{{ booking.bookingName}}</p>
            <p><span class="font-bold text-lg m-2 text-base-100">Event category name :  </span>{{booking.categoryName}}</p> 
            <p><span class="font-bold text-lg m-2 text-base-100">Event start time :  </span>{{ new Date(booking.startTime).toLocaleString('en-GB',{dateStyle: 'full', timeStyle: 'medium'})}}</p>            
            <p><span class="font-bold text-lg m-2 text-base-100">Duration : </span>{{booking.categoryDuration}} minutes</p>      
           <p class="mt-5 flex-row btn btn-neutral btn-xs drop-shadow-xl mr-3 ml-2">
                
             <router-link :to="{name: 'ListDetail' , 
               params:{ 
                BookingId: booking.id} 
                }">
                Details
            </router-link></p>
            <button @click="$emit('remove', confirmAction(booking.id,booking.bookingName))" class="my-2 flex-row btn btn-outline btn-error btn-xs drop-shadow-xl">DELETE</button>
            <br>
        </div>
    </div>

</div>
</template>

<style>
</style>