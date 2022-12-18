<script setup>
import { ref, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
// import authHeader from '../../authen/authen_service';
import jwt_decode from 'jwt-decode';
defineEmits(["EditUser"]);

const userDataEdit = {};
const userData = ref({});

const url = `${import.meta.env.VITE_APP_BASE_URL}`

let { params } = useRoute()
// console.log(params.userId)
const id = ref(params.userId)
const idUser = params.userId

//Get currentUserToken from Localstorage
const getCurrentUserToken = () => {
  if(localStorage.currentUser && localStorage.currentUserToken) {
    let token = jwt_decode(localStorage.currentUserToken)
    if(token.exp*1000 < Date.now()) {
        return `Bearer ${localStorage.currentUserRefreshToken}`
    }
    return `Bearer ${localStorage.currentUserToken}`
  }
  if(localStorage.currentUser && localStorage.userRefreshToken) {
    return `Bearer ${localStorage.userRefreshToken}`
  }
}

// GET user for comparison
const getUser = async () => {
  const response = await fetch(`${url}/users/${id.value}`, { 
    method: "GET",
    headers: { Authorization : getCurrentUserToken()} 
  })
  if (response.status === 200) {
    userDataEdit.value = await response.json()
    // console.log(userDataEdit.value)
    // alert(userDataEdit.value)
    console.log("can GET user for comparison")
  } else console.log('error, cannot get user data for comparison')
}

getUser();

// GET user
onBeforeMount( async () => {
    const res = await fetch(`${url}/users/${id.value}`, 
    { 
      method: "GET", 
      headers: { Authorization : getCurrentUserToken()} 
    });
    // console.log(res.details)
    // console.log(res.data)
    // console.log(userDataEdit.value)
    if (res.status === 200) {
    userData.value = await res.json();
    console.log("Completely GET!");
    // alert(userData.value)
    // console.log(userData.value)
    } else {
    console.log("no detail");
    }
});


// Edit user (PATCH)
function editUser() {

  // case : name & email are null 
  if( userData.value.name == "" || userData.value.email == "" ) {
    // alert(`Name and Email are Null!! : ${userDataEdit.value.name}, ${userData.value.name}`);
    alert(`Name and Email are Null!! : ${userDataEdit.value}, ${userData.value}`);
  } 

  // case : have nothing to update
  if (userData.value.name.trim() == userDataEdit.value.name && 
      userData.value.email.trim() == userDataEdit.value.email &&
      userData.value.role == userDataEdit.value.role) {
        alert('Not have new edited')
  } 
  
  // case : to change one or more values
  else {
    confirmEditAction();
    let dataBody = {}
    // alert("bef-dataBody.value : "+dataBody);
    // console.log("bef-dataBody.value : "+dataBody);

    // check name
    if(userData.value.name.trim() != userDataEdit.value.name.trim()) {
      dataBody.name = userData.value.name.trim();
      // alert("dataBody.value.name : "+dataBody.name);
      // console.log("dataBody.value.name : "+dataBody.value);
    }
    // check email
    if(userData.value.email.trim() != userDataEdit.value.email.trim()) {
      dataBody.email = userData.value.email.trim();
      // alert("dataBody.value.email : "+dataBody.email);
      // console.log("dataBody.value.email : "+dataBody.value);
    }
    // check role
    if(userData.value.role != userDataEdit.value.role) {
      dataBody.role = userData.value.role;
      // alert("dataBody.value.role : "+dataBody.role);
      // console.log("dataBody.value.role : "+dataBody.value);
    }

    let requestOptions = {
            method: 'PATCH',
            headers: { 
                'Content-Type': 'application/json',
                Authorization: getCurrentUserToken()
            },
            body: JSON.stringify(dataBody)
        };
    
    return fetch(`${url}/users/${idUser}`, requestOptions)
      .then(async response => {
        const data = await response.json()
        console.log(data)
        console.log(data.details)
      })
      .finally(async error => {
        const data = await error.json()
        var er=""
        for (let i = 0; i < data.details.length; i++) 
          {
            console.log(data.details[i].errorMessage)
            er += data.details[i].errorMessage +" \n"
          }
        alert('Error To Edit : ' +"\n" + er)
      })
  }

  // return router.push({ name: 'ListUser'})
}  

const confirmEditAction = () => {
    let confirmEditAction = confirm(`Do you want to edit this user detail ?`)
    if (confirmEditAction) {
        return console.log('OK...It can edit');
    }
}

let convertCreated = (dateCreated) => {
  let convertTime = new Date(dateCreated).toLocaleString('en-US',{ dateStyle: 'full', timeStyle: 'medium' });
  return convertTime;
}

</script>


<template>
<div class="mt-20 w-1/2 pt-1 ml-auto mr-auto items-center drop-shadow-xl">
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
                            <textarea class="w-full mt-2 rounded-lg" disabled="disabled" rows="3" cols="50">
                            {{ convertCreated(userData.createdOn) }}
                              </textarea>
                        </p>
                    </div>
                  <!-- updatedOn -->
                    <div class="flex-1 text-neutral pt-2 pl-5">
                        <p class="block text-base-100 text-sm font-bold mb-3">UpdatedOn :
                            <textarea class="w-full mt-2 rounded-lg" disabled="disabled" rows="3" cols="50">
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