<script setup>
defineEmits(['remove','back'])

defineProps({
    listDetailBooking : {
        type : Array,
        require : true,
        default: []
    }
})
/* list-all : date starttime duration catagoryname bookingName
   detail : date starttime duration catagoryName bookingName email notes */
</script>


<template>
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
            <button @click="$emit('back')" class="my-2 flex-row btn btn-outline btn-error btn-xs drop-shadow-xl">Back</button>
            <button @click="$emit('remove', { bookingId : booking.id, categoriesId : booking.category.id})" class="my-2 flex-row btn btn-outline btn-error btn-xs drop-shadow-xl">DELETE</button>

            <br>
        </div>
    </div>
    </div>


</template>

<style>
</style>