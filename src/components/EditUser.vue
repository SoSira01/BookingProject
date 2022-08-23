<script setup>
// import { ref,computed,onBeforeMount } from 'vue';
// // import { useRoute } from 'vue-router';
// // const url = 'http://intproj21.sit.kmutt.ac.th:8080/ssi5/api';

// // const usersDetail = ref({})
// defineEmits(["edit"])
// const props = defineProps({
//     editUserDetail: {
//         type: Object,
//         default: {}
//     }
// })

// const edit = computed(() => { return {
//   name: props.editUserDetail.name,
//   email: props.editUserDetail.email, 
//   role: props.editUserDetail.role} })

// let { params } = useRoute()
//GET user by Id
// const userId = ref(params.userId)
// console.log(userId.value)
// const getListUserById = async () => {
//   const res = await fetch(`${url}/user/${userId.value}`);
//   if (res.status === 200) {
//     usersDetail.value = await res.json()
//     console.log(usersDetail.value)
//   } else console.log('error, cannot get listUserById')
// }
// onBeforeMount(() => getListUserById());

//PATCH user
// const editUser = async(newEdit, e) => {
//   e.preventDefault();
//   console.log(newEdit);
//   confirmEditAction();
//   // console.log(id.value);
//   const res = await fetch(`${url}/user/${userId.value}`, {
//       method: 'PATCH',
//       headers: {
//         // 'Accept': 'application/json',
//         // 'Authorization': 'Bearer '+this.token,
//         'content-type': 'application/json'
//       },
//       body: JSON.stringify({
//         name: usersDetail.value.name.trim(),
//         email: usersDetail.value.email.trim(),
//         role: usersDetail.value.role
//       })
//     })
//     if (res.status === 200) {
//     router.push({ name: 'ListDetail' })
//     } else {
//       alert('Error To Edit Please try again')
//       console.log("error, cannot be edited")
//     }
// }
//     // .then(async response => {
//     //   const data = await response.json();
//     //   if (!response.ok || (response.status != 201 && response.status != 200)) {
//     //     const error = (data && data.message) || response.status;  
//     //     return alert(error);
//     //   } else if (response.ok || response.status == 201 || response.status == 200) {
//     //     console.log("edit complete!!");
//     //   }
//     // })
//     // .catch(error => {
//     //   this.errorMessage = error;
//     //   console.error('There was an error!', error);
//     // });
//   // if(usersDetail.role !== ""){
//   //     
//   //   console.log("be editing...");
//   //   if (res.ok 
//   //   || res.status === 201 
//   //   || res.status === 200
//   //   ) {
//   //   alert('Been edited!!');
//   //   router.push({ name: '/ListUser/:userId' });
//   //   } else  
//   //   alert('error, cannot be edited')
//   //   console.log("error, cannot be edited")
//   // // } 

import { ref, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
defineEmits(["EditUser"]);

const userData = ref({})
// const name = ref("");
// const email = ref("");
// const role = ref("");

const url = 'http://intproj21.sit.kmutt.ac.th:8080/ssi5/api'
let { params } = useRoute()
console.log(params.userId)
const id = ref(params.userId)

onBeforeMount( async () => {
    const res = await fetch(`${url}/user/${id.value}`);
    if (res.status === 200) {
    userData.value = await res.json();
    console.log("Complete!");
    }
    else 
    console.log("no detail");
});

function editUser() {
  
  if( userData.name == "" && userData.email == "" ) {
    alert('Name and Email are Null!!');
  } else {
  const requestOptions = {
    method: 'PATCH',
    headers: { 
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        "name": userData.value.name.trim(),
        "email": userData.value.email.trim(),
        "role": userData.value.role,
    })
  };
  return fetch(`${url}/user/${id.value}`, requestOptions)
    .then(async response => {
      const data = await response.json();
      console.log(data);
      console.log(data.details)
        var er=""
        for (let i = 0; i < data.details.length; i++) {
                console.log(data.details[i].errorMessage)
                er += data.details[i].errorMessage +" \n"
            }
        alert('Error To Edit : ' +"\n" + er)
      
      if (!response.ok) {
        const error = (data && data.message) || response.status;  
        return Promise.reject(error);
      } else if (response.ok || response.status == 201 || response.status == 200) {
        console.log("edit complete!!");
        alert('Edited!');
      }else{
        
      }
    })
    // .catch(error => {
    //   this.errorMessage = error;
    //   console.error('There was an error!', error);
    // }
   // );
  }
}

const confirmEditAction = () => {
    let confirmEditAction = confirm(`Do you want to edit this user detail ?`)
    if (confirmEditAction) {
        return console.log('OK...It can edit');
    }
}

let convertCreated = (dateCreated) => {
  let convertTime = new Date(dateCreated).toLocaleString('en-US', { 
    dateStyle: 'full', 
    timeStyle: 'medium',
     });
  return convertTime;
};
</script>


<template>
<div class="mt-20 pt-1 ml-auto mr-auto right-0 left-0 top-4 z-50 flex justify-center items-center md:inset-0 drop-shadow-xl">
        <form class="bg-white rounded-lg px-10 pt-10 pb-8">
          
                <h3 class="text-4xl font-semibold text-base-100 mb-1">Edit User</h3>  
                <br>
                  <!-- name -->
                   <div class="text-neutral pt-3 pl-5">
                        <label class="block text-base-100 text-sm font-bold mb-3" for="password">Name</label>
                        <input type="text" name="name" id="name" 
                         v-model="userData.name"
                         class="bg-gray-50 border border-gray-300  text-sm rounded-lg block w-full p-2.5" >
                         <!-- :placeholder="userData.name"  -->
                        <!-- v-model="usersDetail.name" -->
                    </div>
                  <!-- email -->
                    <div class="text-neutral pt-3 pl-5">
                        <label class="block text-base-100 text-sm font-bold mb-3" for="email">Email</label>
                        <input type="email" name="email" id="email" 
                         v-model="userData.email"
                         class="bg-gray-50 border border-gray-300  text-sm rounded-lg block w-full p-2.5" >
                         <!-- :placeholder="userData.email"  -->
                        <!-- v-model="usersDetail.email" -->
                    </div>
                  <!-- role -->
                    <div class="text-neutral pt-3 pl-5">
                      <label class="block text-base-100 text-sm font-bold mb-3" for="role">Role</label>
                         <select name="role" id="role" 
                         v-model="userData.role"
                                class=" select bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full">
                                <option value="" disabled selected>Please select your role</option>
                                <option value="student">Student</option>
                                <option value="lecturer">Lecturer</option>
                                <option value="admin">Admin</option>
                        </select>
                    </div>
                  <!-- createdOn -->
                    <div class="flex-1 text-neutral pt-2 pl-5">
                        <p class="block text-base-100 text-sm font-bold mb-3">CreatedOn :
                            <textarea class="w-full mt-2 rounded-lg indent-6" disabled="disabled" rows="3" cols="50">
                              {{ convertCreated(userData.createdOn) }}</textarea>
                        </p>
                    </div>
                  <!-- updatedOn -->
                    <div class="flex-1 text-neutral pt-2 pl-5">
                        <p class="block text-base-100 text-sm font-bold mb-3">UpdatedOn :
                            <textarea class="w-full mt-2 rounded-lg indent-6" disabled="disabled" rows="3" cols="50">
                              {{ convertCreated(userData.updatedOn) }}</textarea>
                        </p>
                    </div>
                
                <br>
                <button
                    @click="editUser();"
                    class="pt-2 pl-5 w-full rounded-lg text-sm px-10 py-2.5 text-center mt-2 btn btn-warning drop-shadow-xl">confirm
                    edit</button>
     
        </form>
    </div>

</template>