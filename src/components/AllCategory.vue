<script setup>
defineProps({
    AllCategory: {
        type: Array,
        require: true,
        default: []
    }
})
</script>
 
<template>
 <div class="mt-20">
        <p class="text-4xl font-semibold text-white text-center">Category List</p>
        <br>

        <div class="grid grid-cols-1 w-7/12 ml-auto mr-auto">
            <div v-if="AllCategory == ''" class="text-center mt-4 ">
                <span class="text-sm">No Scheduled Events</span>
            </div>
             <div v-else class=" rounded-lg bg-gray-50 text-neutral m-5 p-8 drop-shadow-xl text-left"
                v-for="(allCat, index) in AllCategory" :key="index">
            <p><span class="font-bold text-lg m-2 text-base-100">Category Name :</span>{{allCat.categoryName}}</p>
            <p><span class="font-bold text-lg m-2 text-base-100">Duration :</span>{{allCat.duration}}</p>
            <p v-if="allCat.categoryDescription != '' "><span class="font-bold text-lg m-2 text-base-100">Description : </span>{{allCat.categoryDescription}}</p>
            <p v-else><span class="font-bold text-lg m-2 text-base-100">Description :</span>No description</p>
        </div>
</div>
</div>
</template>
 
<style>

</style>