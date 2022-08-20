<script setup>
import {ref} from "vue"
defineEmits(['remove'])

 const prop = defineProps({
    listUser: {
        type: Array,
        require: true,
        default: []
    },
 })

const confirmAction = (userId, name) => {
    let confirmAction = confirm(`Do you want to delete name: ${name}`)
    if (confirmAction) {
        return userId
    }
}

</script>

<template>
    <div class="mt-20"> 
        <p class="text-4xl font-semibold text-white text-center">List User</p>
        <br>
        <p class="btn btn-warning text-neutral btn-xs btn-outline drop-shadow-xl grid grid-cols-1 w-32 ml-auto mr-auto">
                    <router-link :to="{
                        name: 'NewUser'
                    }"> Add New User                        
                    </router-link>
        </p>
       
        <div class="grid grid-cols-1 w-7/12 ml-auto mr-auto mt-5">
            <div v-if="listUser == ''" class="text-center mt-4 ">
                <span class="text-sm">No Users</span>
                
            </div>

            <div v-else class=" rounded-lg bg-gray-50 text-neutral m-5 p-8 drop-shadow-xl text-left"
                v-for="(user, index) in listUser" :key="index">
                <p><span class="font-bold text-lg m-2 text-base-100">Name : </span>{{ user.name }}</p>
                <p><span class="font-bold text-lg m-2 text-base-100">Email :
                    </span>{{ user.email }}</p>
                <p><span class="font-bold text-lg m-2 text-base-100">Role : </span>{{ user.role }}</p>
                <p class="mt-5 flex-row btn btn-neutral btn-xs drop-shadow-xl mr-3 ml-2">

                    <router-link :to="{
                        name: 'ListUserDetail',
                        params: {
                            userId: user.id
                        }
                    }">
                        Details
                    </router-link>
                </p>
                <button @click="$emit('remove', confirmAction(user.id, user.name))"
                    class="my-2 flex-row btn btn-outline btn-error btn-xs drop-shadow-xl">DELETE</button>
                <br>
            </div>
        </div>

    </div>
</template>

<style>
</style>
