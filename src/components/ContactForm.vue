<script setup>
import { ref } from 'vue'
defineEmits(['send'])
let userLogin = localStorage.currentUser
const detailEmail = ref({topic: "" ,note: "",email: ""})
function validEmail(e) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(e)
    }
</script>

<template>
    <div>
        <div class="mt-20">
            <div
                class="pt-5 ml-auto mr-auto right-0 left-0 top-4 z-50 flex justify-center items-center md:inset-0 drop-shadow-xl">
                <img src="/images/add.png" alt="online schedule" class="max-w-2xl">
                <form class="bg-white rounded-lg px-10 pt-7 pb-8 ">
                    <h3 class="text-4xl font-semibold text-base-100 mb-2">Contact Admin</h3>
                    <p class="text-sm text-neutral pl-3 mb-4">You can explain your problem in this form for sending to our admin to improve later.</p>

                    <!--email-->
                    <div class="text-neutral pt-3 pl-5" v-if="!userLogin">
                        <label class="block text-base-100 text-sm font-bold mb-1" for="password">Email</label>
                        <span v-if="detailEmail.email && detailEmail.email.length > 100" class="text-xs text-error italic"> 
                        * You add more than 100 characters </span>
                        <span v-if="!validEmail(detailEmail.email)" class="text-xs text-error italic" >* Valid email required</span>
                        <input type="email" required 
                            name="email" id="email" 
                            v-model="detailEmail.email" 
                            class="bg-gray-50 border border-gray-300  text-sm rounded-lg block w-full p-2.5"
                            placeholder="--- Ex. Somsri.ra@kmutt.ac.th ---">
                            <span class="text-xs">{{detailEmail.email.length}}/100</span>

                    </div>

                    <!--Topic-->
                    <div class=" flex">
                        <div class="flex-1 text-neutral pt-3 pl-5">
                            <label class="block text-base-100 text-sm font-bold mb-1" for="password">Topic / The Problem : </label>
                            <span v-if="detailEmail.topic && detailEmail.topic.length > 100" class="text-xs text-error italic"> 
                           * You add more than 100 characters </span>
                            <input type="text" name="topic" id="topic" v-model="detailEmail.topic"
                                class="bg-gray-50 border border-gray-300  text-sm rounded-lg block w-full p-2.5"
                                placeholder="--- Please input New topic ---" required>
                                <span class="text-xs">{{detailEmail.topic.length}}/100</span>

                        </div>
                    </div>

                    <!--note-->
                    <div class="text-neutral pt-3 pl-5">
                        <label class="block text-base-100 text-sm font-bold mb-1" for="password">Description : </label>
                        <span v-if="detailEmail.note && detailEmail.note.length > 500" class="text-xs text-error italic"> 
                        * You add more than 500 characters </span> 
                        <textarea class="bg-gray-50 border border-gray-300 w-full rounded-lg mt-2 p-2.5" rows="1" cols="50" name="note" id="note"
                         v-model="detailEmail.note"></textarea>
                        <span class="text-xs">{{detailEmail.note.length}}/500</span>
                    </div>

                    <button
                        class="pt-3 pl-5 w-full rounded-lg text-sm px-10 py-2.5 text-center mt-5 btn btn-warning drop-shadow-xl"
                        type="button" data-modal-toggle="add-form" @click="$emit('send', detailEmail)">
                        Send to admin
                    </button>

                </form>
            </div>
        </div>
    </div>
</template>
 
<style>
</style>