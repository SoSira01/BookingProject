<script setup>
    import { ref } from 'vue'
    defineEmits(['match'])
    
     const prop = defineProps({
        matchUser: {
            type: Array,
            require: true,
            default: []
        },
     })
    
    const matchUserPassword = ref({email : "",password:""})
    
     function validEmail(e) {
          var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return re.test(e)
    }
    
    </script>
    
    <template>
    
        <div class="mt-40">
            <div class="grid grid-cols-1 w-1/2 ml-auto mr-auto drop-shadow ">
                <form class="bg-white rounded-lg px-10 pt-7 pb-8" @keyup.enter="$emit('match', matchUserPassword)">
                    <!-- <h3 class="text-4xl font-semibold text-base-100 mb-2">Match User Password</h3> -->
                    <h3 class="text-4xl font-semibold text-base-100 mb-2">Login</h3>
    
                     <!--email-->
                        <div class="text-neutral pt-3 pl-5">
                            <label class="block text-base-100 text-sm font-bold mb-1" for="password">Email</label>
                            <span v-if="matchUserPassword.email.length <= 50">
                                <span v-if="!matchUserPassword.email" class="text-xs text-error italic">This field is required.</span>
                                <span v-if="!validEmail(matchUserPassword.email)" class="text-xs text-error italic" >Valid email required</span> 
                                <input type="email" required 
                                name="email" id="email" 
                                v-model="matchUserPassword.email" 
                                class="bg-gray-50 border border-gray-300  text-sm rounded-lg block w-full p-2.5"
                                placeholder="--- Ex. Somsri.ra@kmutt.ac.th ---">
                            </span>
                            <span v-else="matchUserPassword.email.length > 50">
                            <span class="text-xs text-error italic">You cannot add more than 50 character.</span> 
                                <input type="email" required 
                                name="email" id="email" 
                                v-model="matchUserPassword.email" 
                                class="bg-gray-50 border-2 border-rose-500 text-sm rounded-lg block w-full p-2.5"
                                placeholder="--- Ex. Somsri.ra@kmutt.ac.th ---">
                            </span>
                                <span class="text-xs">{{matchUserPassword.email.length}}/50</span>
                        </div>
                        
                        <!-- password -->
                        <div class="flex-1 text-neutral pt-3 pl-5">
                            <label class="block text-base-100 text-sm font-bold mb-1">Password</label>
                               <span v-if="matchUserPassword.password.length > 0 && matchUserPassword.password.length < 8">
                                    <span class="text-xs text-error italic">
                                        You cannot add less than 8 characters.
                                    </span>
                               </span>
                               <span v-if="matchUserPassword.password.length > 14">
                                    <span class="text-xs text-error italic">
                                        You cannot add more than 14 characters.
                                    </span> 
                               </span>
                               <!-- <span v-if="Password.length <= 14 && Password.length >= 8"></span> -->
                               <input type="password" name="password" id="password" v-model="matchUserPassword.password"
                                        class="bg-gray-50 border border-gray-300  text-sm rounded-lg block w-full p-2.5"
                                        onkeypress="@click"
                                        placeholder="--- Please input your password ---" required>
                               
                                    <!-- <span class="text-xs">{{Password.length}}/14</span> -->
    
                            </div>
    
                    <button
                        class="pt-3 pl-5 w-full rounded-lg text-sm px-10 py-2.5 text-center mt-5 btn btn-warning drop-shadow-xl"
                        type="button" data-modal-toggle="add-form" @click="$emit('match', matchUserPassword)">
                        Login
                    </button>
    \
                </form>
            </div>
        </div>
    </template>
    
    <style scoped>
    
    </style>