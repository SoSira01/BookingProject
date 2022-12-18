<script setup>
import { ref } from 'vue'
defineEmits(['createCate'])
const newCategory = ref({categoryName: "" ,categoryDescription: "", duration: ""})
</script>

<template>
    <div>
        <div class="mt-20">
            <div
                class="pt-5 ml-auto mr-auto right-0 left-0 top-4 z-50 flex justify-center items-center md:inset-0 drop-shadow-xl">
                <img src="/images/add.png" alt="online schedule" class="max-w-2xl">
                <form class="bg-white rounded-lg px-10 pt-7 pb-8 ">
                    <h3 class="text-4xl font-semibold text-base-100 mb-2">Add Category</h3>
                    <p class="text-sm text-neutral pl-3 mb-4">**Only Admin can create new category in OASIP-SSI5**</p>

                    <!--category name-->
                    <div class="text-neutral pt-3 pl-5">
                        <label class="block text-base-100 text-sm font-bold mb-1" for="password">Category Name</label>
                        <span v-if="newCategory.categoryName && newCategory.categoryName.length > 100" class="text-xs text-error italic"> 
                            * You add more than 100 characters </span>
                            <input type="name" required 
                            name="name" id="name" 
                            v-model="newCategory.categoryName" 
                            class="bg-gray-50 border border-gray-300  text-sm rounded-lg block w-full p-2.5">
                            <span class="text-xs">{{newCategory.categoryName.length}}/100</span>
                            
                        </div>

                        <!--duration-->
                        <div class=" flex">
                        <div class="flex-1 text-neutral pt-3 pl-5">
                            <label class="block text-base-100 text-sm font-bold mb-1" for="password">Duration : </label>
                            <span v-if="newCategory.duration >= 481" class="text-xs text-error italic"> 
                            * You add more than 480 minutes! </span>
                            <span v-if="newCategory.duration < 1" class="text-xs text-error italic"> 
                            * You must add more than 1 minutes</span>
                           <input type="number" name="duration" id="duration" v-model="newCategory.duration"
                           class="bg-gray-50 border border-gray-300  text-sm rounded-lg block w-full p-2.5"
                           placeholder="--- Please input duration ---" required>
                           
                        </div>
                    </div>

                    <!--description-->
                    <div class="text-neutral pt-3 pl-5">
                        <label class="block text-base-100 text-sm font-bold mb-1" for="password">Description : </label>
                        <span v-if="newCategory.categoryDescription && newCategory.categoryDescription.length > 500" class="text-xs text-error italic"> 
                            * You add more than 500 characters </span> 
                            <textarea class="bg-gray-50 border border-gray-300 w-full rounded-lg mt-2 p-2.5" rows="1" cols="50" name="categoryDescription" id="categoryDescription"
                                v-model="newCategory.categoryDescription"></textarea>
                         <span class="text-xs">{{newCategory.categoryDescription.length}}/500</span>
                    </div>

                    <button class="pt-3 pl-5 w-full rounded-lg text-sm px-10 py-2.5 text-center mt-5 btn btn-warning drop-shadow-xl"
                        type="button" data-modal-toggle="add-form" @click="$emit('createCate', newCategory)">
                        Create Category
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<style>
</style>