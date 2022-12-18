<script setup>
defineEmits(['edit','checkStatus'])

const prop = defineProps({
    allcategory: {
        type: Array,
        require: true,
        default: []
    }
})
console.log(prop.allcategory);
let localUserRole = localStorage.currentUserRole
</script>
 
<template>
    <div class="mt-20">
        <p class="text-4xl font-semibold text-white text-center">Category List</p>
        <br>

        <div class="grid grid-cols-1 w-7/12 ml-auto mr-auto">
            <div v-if="allcategory == ''" class="text-center mt-4 ">
                <span class="text-sm">No Scheduled Events</span>
            </div>
            <div v-else class=" rounded-lg bg-gray-50 text-neutral m-5 p-8 drop-shadow-xl text-left"
                v-for="(allCat, index) in allcategory" :key="index">
                <p><span class="font-bold text-lg text-base-100">Category Name : </span>{{ allCat.categoryName }}</p>

                <p><span class="font-bold text-lg  text-base-100">Duration : </span>{{ allCat.duration }}</p>

                <p v-if="allCat.categoryDescription != null"><span
                        class="font-bold text-lg text-base-100">Description : </span>{{ allCat.categoryDescription }}
                </p>
                <p v-else><span class="font-bold text-lg  text-base-100">Description : </span>No description</p>

                <router-link class="mt-5 flex-row btn btn-base-100 btn-xs drop-shadow-xl mr-3" :id="'edit'+allCat.id"
                    v-if="localUserRole == 'lecturer' || localUserRole == 'admin'" style="visibility: hidden;"
                    :to="{
                        name: 'EditCategory',
                        params: { CategoryId: allCat.id } 
                    }">Edit
                </router-link>
                
                <router-link class="mt-5 flex-row btn btn-warning btn-base-100 btn-xs drop-shadow-xl mr-3" 
                    v-if="localUserRole == 'lecturer'" :id="'linkToCate'+allCat.id" style="visibility: hidden;"
                    :to="{
                        name: 'List',
                        query: { filterCateId: allCat.id }
                    }">
                    See Booking In This
                </router-link>
            </div>
        </div>
    </div>
</template>
 
<style>
</style>