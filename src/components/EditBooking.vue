<script setup>
import {computed,ref } from "vue";
defineEmits(['edit'])

const props = defineProps({
    editBook: {
        type: Object,
        require: true
    }
})

const edit = computed(() => {return {startTime: new Date(props.editBook.startTime).toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'medium' }) , note: props.editBook.note}})
const editBooking = ref({note: ""})

var today = new Date()
var nowtime = today.toISOString().substring(0, 16) 

const toEditFile = (filename) => {
    let editInp = document.querySelector("#inputEditFile")
    if (editInp.style.display === "none") { editInp.style.display = "block" } 
    else { editInp.style.display = "none" }
    
    if(filename != null){
        let editBtn = document.querySelector("#editbtn")
        console.log(editBtn.innerHTML)
        if (editBtn.innerHTML == "Edit File" || editBtn.innerHTML == null) { editBtn.innerHTML = "Close Edit File" }
        else { editBtn.innerHTML = "Edit File" } 

    }

    if(filename == null){
        let addBtn = document.querySelector("#addbtn")
        console.log(addBtn.innerHTML)
        if (addBtn.innerHTML == "Add File" || addBtn.innerHTML == null) { addBtn.innerHTML = "Close Add File" }
        else { addBtn.innerHTML = "Add File" }
    }
    
}

const toRemoveFile = (event) => {
    document.querySelector("#listfile").style.display = "none"
    document.querySelector("#listfilebtn").style.display = "none"
    document.querySelector("#nolistfile").style.display = "block"
    document.querySelector("#fileAttach").style.display = "block"

    // console.log("bef remove : "+document.querySelector("#listfile").innerHTML)
    document.querySelector("#listfile").innerHTML = null
    // console.log("aft remove : "+document.querySelector("#listfile").innerHTML)
    // document.querySelector("#listfile").getAttribute("name") = "empty"
    console.log(document.querySelector("#listfile"))
    console.log("remove selected file out of attachment list")
    event.preventDefault()
}

const confirmAction = (editBooking, startTime, note) => {
    let set = new String()
    let file = document.querySelector("#listfile")
    let nofile = document.querySelector("#nolistfile")
    let nocurfile = document.querySelector("#noCurrentFile")
    console.log("New File : "+file.innerHTML)
    if(startTime != undefined){
        let newdate = new Date(startTime).toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'medium' })
        set +=  ` New Start Time : ${newdate} \n`;
    } 
    if(note != "") set += `  New Note : ${note} \n`;
    if(nocurfile == null) set += ` [Delete Previous Attachment] } \n`;
    if(file.innerHTML != "" && nofile.style.display == "none") set += ` New Attachment : ${file.innerHTML} \n`;
    
    // Alert/Confirm
    if (props.editBook.fileName == file.innerHTML) {
        alert("File name must not duplicate or different from before! \n*Please reset file or change file name, before try again*")
        return {}
    }
    if(startTime == undefined && note == "" 
        && ((props.editBook.fileName != null) 
        && (file.innerHTML == "" && nofile.style.display != "none"))){
        alert("There's not any new detail.\nPlease check before submit again.")
        return {} 
    }
    if(startTime != undefined || note != "" 
        || (((file.innerHTML != "" && nofile.style.display == "none")
        || props.editBook.fileName != file.innerHTML) || props.editBook.fileName == null)
        ){
        let confirmAction = confirm(`Do you want to edit this booking? \n ${set}`)
        if (confirmAction) { 
            file.setAttribute("name","edit")
            return editBooking
        }
        if (!confirmAction) {
            file.setAttribute("name","empty")
            return {}
        }
        else { return {} }
    }
    else { return {} }
}

</script>
 
<template>
    <div>
    <div
        class="mt-20 pt-1 ml-auto mr-auto right-0 left-0 top-4 z-50 flex justify-center items-center md:inset-0 drop-shadow-xl">
        <form class="bg-white rounded-lg px-10 pt-10 pb-8">
            <img src="/images/edit.png" alt="online schedule" class="max-w-sm float-left m-5 mt-20">
            <div class="float-right mt-5">
                <h3 class="text-4xl font-semibold text-base-100 mb-1">Edit Event</h3>
                <p class="text-sm text-neutral pl-3">You can edit booking clinic that you want.</p>
                <!-- editBook : {{editBook}} -->
                <br>
                <!-- editBooking : {{editBooking}} -->
                <div class=" flex">
                    <div class="flex-1 text-neutral pt-2 pl-5">
                        <p class="block text-base-100 text-sm font-bold mb-3">bookingName :
                            <span>{{ editBook.bookingName }}</span>
                        </p>
                    </div>
                </div>
                    <div class="flex-1 text-neutral pt-2 pl-5">
                        <p class="block text-base-100 text-sm font-bold mb-3">email : 
                            <span>{{ editBook.email }}</span>
                        </p>
                    </div>
                    
                    <div class="flex-1 text-neutral pt-2 pl-5">
                        <p class="block text-base-100 text-sm font-bold mb-3">categoryDescription :
                            <textarea class="w-full mt-2 rounded-lg indent-6" disabled="disabled" rows="3" cols="50">{{ editBook.categoryDescription }}</textarea>
                        </p>
                    </div>
                    <div class="flex-1 text-neutral pt-2 pl-5">
                        <p class="block text-base-100 text-sm font-bold mb-3">categoryDuration :
                            <span>{{ editBook.categoryDuration }}</span></p>
                    </div>

                    <div class="flex-1 text-neutral pt-2 pl-5">
                        <label class="block text-base-100 text-sm font-bold mb-3" for="password">Event start time</label>
                        <p>{{edit.startTime}}</p>
                        <span v-if = "editBooking.startTime < nowtime" class="text-error text-xs italic">* must be a future date</span>
                        <input type="datetime-local" name="startTime" id="startTime" v-model="editBooking.startTime"
                            class="bg-gray-50 border border-gray-300 text-sm rounded-lg  block w-full p-2.5">
                    </div>
                
                <div class="flex-1 text-neutral pt-2 pl-5">
                    <label class="block text-base-100 text-sm font-bold mb-3" for="password">Note</label>
                    <span v-if="editBooking.note.length >= 500" class="block text-xs text-error italic">* You cannot add more than 500 characters</span>
                    <textarea class="bg-gray-50 border border-gray-300 w-full rounded-lg mt-1 p-2.5" rows="auto" cols="50" name="note" id="note" :placeholder="edit.note"
                     v-model="editBooking.note"></textarea>
                    <span class="text-xs">{{editBooking.note.length}}/500</span>

                </div>

                <!-- Attachment -->
                    <p id="fileAttach">
                        <p class="flex-1 text-neutral pt-2 pl-5 block text-base-100 text-sm font-bold"> File : </p>
                        <p v-if="editBook.fileName != null" class="flex-1 text-neutral pt-2 pl-5 block text-base-100 text-sm">
                            {{ editBook.fileName }}</p>
                        <p v-else id="noCurrentFile" class="flex-1 text-neutral pt-2 pl-5 block text-base-100 text-sm">
                             No File Attachment </p>
                        <p class="flex-row btn btn-outline btn-secondary btn-base-100 btn-xs drop-shadow-xl mr-3 ml-6" 
                            @click="toEditFile(editBook.fileName)">
                            <p v-if="editBook.fileName != null" id="editbtn">Edit File</p>
                            <p v-if="editBook.fileName == null" id="addbtn">Add File</p>
                        </p>
                        <p class="flex-row btn btn-base-100 btn-xs drop-shadow-xl mr-3" 
                        v-if="editBook.fileName != null" @click="$emit('delete',$event)"> Reset File </p>
                    </p>
                    <!-- Edit Attachment :: add new file -->
                    <div id="inputEditFile" class="flex-1 text-neutral pt-2 pl-5" style="display: none;">
                        <label for="file" class="block text-base-100 text-sm font-bold mb-1 mt-3 pb-2.5">Select your new file:</label>
                        <input type="file" id="file" name="file" class="text-sm text-neutral pl-3 mb-4"
                        v-on:change="$emit('updateFile',$event)"/>
                        <br>

                        <div id="showNewFile" style="display: none;">
                        <p class="block text-base-100 text-sm font-bold"> New Seleted File : </p>
                        <div id="nolistfile" style="display: block;">
                            <p class="block text-base-100 text-sm"> No Any New Attachment </p>
                        </div>
                        
                        <div id="listfile" class="block text-base-100 text-sm m-2" name="empty" style="display: none;"></div>
                        <button id="listfilebtn" class="btn btn-xs drop-shadow-xl m-2" 
                            @click="toRemoveFile" style="display: none;"> Remove </button>
                        </div>

                    </div>
                    <!-- Attachment -->

                <br>
                <button
                    @click="$emit('edit', confirmAction(editBooking, editBooking.startTime, editBooking.note), $event)"
                    class="pt-2 pl-5 w-full rounded-lg text-sm px-10 py-2.5 text-center mt-2 btn btn-warning drop-shadow-xl">confirm
                    edit</button>


            </div>
        </form>
    </div>
</div>
</template>
 
<style>
</style>