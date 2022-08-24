<script setup>
import { ref } from 'vue'

defineEmits(['add'])

 const prop = defineProps({
    addUser: {
        type: Array,
        require: true,
        default: []
    },
 })

const NewUser = ref({name: "" ,email : "",role:"student",password:"",checkPassword:""})

 function validEmail(e) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(e)
}

</script>

<template>
    <div>
        <div class="mt-20">
            <div class="grid grid-cols-1 w-1/2 ml-auto mr-auto drop-shadow ">
                <form class="bg-white rounded-lg px-10 pt-7 pb-8">
                    <h3 class="text-4xl font-semibold text-base-100 mb-2">Add User</h3>

                    <!--name-->
                        <div class="flex-1 text-neutral pt-3 pl-5">
                        <label class="block text-base-100 text-sm font-bold mb-1">Name</label>
                           <span v-if="NewUser.name.length <= 100">
                                <!-- <span class="text-xs text-error italic">Name must have unique</span> -->
                                <span v-if="!NewUser.name" class="text-xs text-error italic">This field is required.</span>
                                <!-- v-validate="'required|unique'" -->
                                <input type="text" name="name" id="name" v-model="NewUser.name"
                                    class="bg-gray-50 border border-gray-300  text-sm rounded-lg block w-full p-2.5"
                                    placeholder="--- Please input new username ---" required>
                           </span>
                           <span v-else="NewUser.name.length > 100">
                                <span class="text-xs text-error italic">You cannot add more than 100 character.</span> 
                                <input type="text" name="name" id="name" v-model="NewUser.name"
                                    class="bg-gray-50 border-2 border-rose-500 text-sm rounded-lg block w-full p-2.5">
                           </span>
                                <span class="text-xs">{{NewUser.name.length}}/100</span>

                        </div>
                    
                    <!--email-->
                    <div class="text-neutral pt-3 pl-5">
                        <label class="block text-base-100 text-sm font-bold mb-1" for="password">Email</label>
                        <span v-if="NewUser.email.length <= 50">
                            <span v-if="!NewUser.email" class="text-xs text-error italic">This field is required.</span>
                            <span v-if="!validEmail(NewUser.email)" class="text-xs text-error italic" >   Valid email required</span> 
                            <input type="email" required 
                            name="email" id="email" 
                            v-model="NewUser.email" 
                            class="bg-gray-50 border border-gray-300  text-sm rounded-lg block w-full p-2.5"
                            placeholder="--- Ex. Somsri.ra@kmutt.ac.th ---">
                        </span>
                        <span v-else="NewUser.email.length > 50">
                        <span class="text-xs text-error italic">You cannot add more than 50 character.</span> 
                            <input type="email" required 
                            name="email" id="email" 
                            v-model="NewUser.email" 
                            class="bg-gray-50 border-2 border-rose-500 text-sm rounded-lg block w-full p-2.5"
                            placeholder="--- Ex. Somsri.ra@kmutt.ac.th ---">
                        </span>
                            <span class="text-xs">{{NewUser.email.length}}/50</span>
                    </div>

                    <!--role-->
                    <div class="text-neutral pt-3 pl-5">
                        <label class="block text-base-100 text-sm font-bold mb-1" for="role">
                                Role</label>
                            <select name="category" id="category" v-model="NewUser.role"
                                class=" select bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full">
                                <option value="" disabled selected>Please select your role</option>
                                <option value="student">Student</option>
                                <option value="lecturer">Lecturer</option>
                                <option value="admin">Admin</option>

                                <!-- <option :value="NewUser" v-for="(roleDetail, index) in NewUser"
                                    :key="index"> {{ roleDetail.role }}
                                </option> -->
                            </select>
                    </div>

                    <!-- password -->
                    <div class="flex-1 text-neutral pt-3 pl-5">
                        <label class="block text-base-100 text-sm font-bold mb-1">Password</label>
                           <span v-if="NewUser.password.length > 0 && NewUser.password.length < 8">
                                <span class="text-xs text-error italic">
                                    You cannot add less than 8 characters.
                                </span>
                           </span>
                           <span v-if="NewUser.password.length > 14">
                                <span class="text-xs text-error italic">
                                    You cannot add more than 14 characters.
                                </span> 
                           </span>
                           <!-- <span v-if="Password.length <= 14 && Password.length >= 8"></span> -->
                           <input type="password" name="password" id="password" v-model="NewUser.password"
                                    class="bg-gray-50 border border-gray-300  text-sm rounded-lg block w-full p-2.5"
                                    placeholder="--- Please input your password ---" required>
                           
                                <!-- <span class="text-xs">{{Password.length}}/14</span> -->

                        </div>

                    <!-- confirm password -->
                    <div class="flex-1 text-neutral pt-3 pl-5">
                        <label class="block text-base-100 text-sm font-bold mb-1">Confirm Password</label>

                        
                        <div v-if=" !NewUser.checkPassword.length || (NewUser.checkPassword.length > 0 && NewUser.checkPassword != NewUser.password) ">
                                <input type="password" name="password" id="password" v-model="NewUser.checkPassword"
                                    class="bg-gray-50 border-2 border-red-300  text-sm rounded-lg block w-full p-2.5"
                                    placeholder="--- Please confirm your password ---" required>
                            </div>
                            <div v-if="NewUser.checkPassword == NewUser.password && NewUser.checkPassword.length
                                && NewUser.checkPassword.length >= 8 
                                && NewUser.checkPassword.length <= 14">
                                <input type="password" name="password" id="password" v-model="NewUser.checkPassword"
                                    class="bg-gray-50 border-2 border-green-300  text-sm rounded-lg block w-full p-2.5"
                                    placeholder="--- Please confirm your password ---" required>
                            </div>
                            
                
                        
                            <span v-show="NewUser.checkPassword.length > 0 && NewUser.checkPassword.length < 8">
                                <span class="text-xs text-error italic">
                                    You cannot add less than 8 characters.
                                </span>
                           </span>
                           <span v-show="NewUser.checkPassword.length > 14">
                                <span class="text-xs text-error italic">
                                    You cannot add more than 14 characters.
                                </span> 
                            </span><br/>
                            
                        
                            <span v-show="NewUser.checkPassword == NewUser.password  
                                && NewUser.checkPassword.length >= 8 
                                && NewUser.checkPassword.length <= 14" 
                                class="text-xs text-success italic">
                                    *The password matched!    
                            </span>
                            <span v-show="NewUser.checkPassword.length >= NewUser.password.length
                                            && NewUser.checkPassword != NewUser.password" 
                                class="text-xs text-error italic">
                                    *The password DOES NOT match.      
                            </span>

                        <!-- <input type="password" name="password" id="password" v-model="NewUser.checkPassword"
                                    class="bg-gray-50 border-2 border-gray-300  text-sm rounded-lg block w-full p-2.5"
                                    placeholder="--- Please confirm your password ---" required>  -->

                    </div>


                    <button
                        class="pt-3 pl-5 w-full rounded-lg text-sm px-10 py-2.5 text-center mt-5 btn btn-warning drop-shadow-xl"
                        type="button" data-modal-toggle="add-form" @click="$emit('add', NewUser)">
                        
                        Add
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>