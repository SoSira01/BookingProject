<script setup>
import { computed , ref } from "vue"

defineEmits(['edit'])

const props = defineProps({
    editCategory: {
        type: Object,
        default: {}
    }
})

const edit = computed(() => { return {categoryName: props.editCategory.categoryName ,categoryDescription: props.editCategory.categoryDescription, duration: props.editCategory.duration} })
const editCat = ref( {categoryName: "" ,categoryDescription: "", duration: ""})
console.log(editCat.value)

const confirmAction = (editCat,categoryName,categoryDescription,duration) => {
    console.log(categoryDescription)
    console.log(categoryDescription == null 
    || categoryDescription == "" 
    || categoryDescription == undefined)
    // alert(categoryDescription)
    if (duration > 481 || duration < 1){
        alert("you can add number only between 1 - 480")
        return {}
    }
    else if((props.editCategory.categoryName != categoryName && categoryName != "")
        && (props.editCategory.duration != duration && (duration <= 480 && duration >= 1))) {
        if(categoryDescription != "" && categoryDescription.trim() == "") {
            categoryDescription = "No description"
            editCat.categoryDescription = "No description"
        }
        let confirmAction = confirm(`Do you want to Edit:\n  Category Name: ${categoryName}\n  Duration: ${duration}\n  Description: ${categoryDescription}`)
        if (confirmAction) { return editCat }
        if (!confirmAction) { 
            categoryDescription = ""
            return {} 
        }
        else { return {} }
    } else {
        return {}
    }
}

</script>
 
<template>
<div
        class="mt-20 pt-10 ml-auto mr-auto right-0 left-0 top-4 z-50 flex justify-center items-center md:inset-0 drop-shadow-xl">
        <form class="bg-white rounded-lg px-10 pt-3 pb-8">
            <div class="float-right mt-7">
                <h3 class="text-4xl font-semibold text-base-100 mb-2">Edit Category</h3>
                <p class="text-sm text-neutral pl-3 mb-5">You can edit any category feild that you want.</p>

                <!--Category name-->
                <div class="text-neutral pt-3 pl-5">
                    <label class="block text-base-100 text-sm font-bold mb-3" for="password">Category Name :</label>
                    <span v-if="editCat.categoryName && editCat.categoryName.length > 100" class="italic text-xs text-error"> 
                        * You add more than 100 characters </span>
                    <span v-if="editCat.categoryName == null || editCat.categoryName == ''" class="italic text-xs text-error">
                        * categoryName must not be empty</span>                    
                    <input type="text" name="categoryName" id="categoryName" v-model="editCat.categoryName" :placeholder="edit.categoryName"
                        class="bg-gray-50 border border-gray-300  text-sm rounded-lg block w-full p-2.5">
                    <span class="text-xs">{{editCat.categoryName.length}}/100</span>
                </div>

                <!--duration-->
                <div class="text-neutral pt-3 pl-5">
                    <label class="block text-base-100 text-sm font-bold mb-3" for="password">Duration :</label>
                    <span v-if="editCat.duration >= 481" class="text-xs text-error italic">
                    * You add more than 480 minutes</span>
                    <span v-if="editCat.duration < 1" class="text-xs text-error italic"> 
                    * You must add more than 1 minutes</span>
                    <input type="number" name="duration" id="duration" v-model="editCat.duration" :placeholder="edit.duration"
                        class="bg-gray-50 border border-gray-300  text-sm rounded-lg block w-full p-2.5" >
                </div>

                <!--description-->
                <div class="text-neutral pt-3 pl-5">
                    <label class="block text-base-100 text-sm font-bold mb-3" for="password">description</label>
                    <span v-if="editCat.categoryDescription && editCat.categoryDescription.length > 500" class="text-xs text-error italic"> 
                        * You add more than 500 characters </span>
                    <textarea class="w-full mt-2 rounded-lg indent-6 bg-gray-50 border border-gray-300 p-2.5" rows="2" cols="50" 
                     name="description" id="description" v-model="editCat.categoryDescription"
                     :placeholder="edit.categoryDescription"></textarea>
                     <span class="text-xs">{{editCat.categoryDescription.length}}/500</span>

                </div>

                <br>
                <button @click="$emit('edit', confirmAction(editCat,editCat.categoryName,editCat.categoryDescription,editCat.duration), $event)"
                    class="pt-3 pl-5 w-full rounded-lg text-sm px-10 py-2.5 text-center mt-5 btn btn-warning drop-shadow-xl">confirm
                    edit</button>


            </div>
        </form>
    </div>
</template>
 
<style>

</style>