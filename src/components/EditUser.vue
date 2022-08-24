<script setup>
import { ref, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
defineEmits(["EditUser"]);

const userDataEdit = {};
const userData = ref({});

// const url = 'http://intproj21.sit.kmutt.ac.th:8080/ssi5/api'
const url = 'http://intproj21.sit.kmutt.ac.th:80/ssi5/api'

let { params } = useRoute()
// console.log(params.userId)
const id = ref(params.userId)

// GET user for comparison
const getUser = async () => {
  const response = await fetch(`${url}/user/${id.value}`)
  if (response.status === 200) {
    userDataEdit.value = await response.json()
    console.log(userDataEdit.value)
    console.log("can GET user for comparison")
  } else console.log('error, cannot get user data for comparison')
}

getUser();

// GET user
onBeforeMount( async () => {
    const res = await fetch(`${url}/user/${id.value}`);
    console.log(res.details)
    console.log(res.data)
    console.log(userDataEdit.value)
    if (res.status === 200) {
    userData.value = await res.json();
    console.log("Completely GET!");
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
  if (userData.value.name == userDataEdit.value.name && 
      userData.value.email == userDataEdit.value.email &&
      userData.value.role == userDataEdit.value.role) {
        alert('Have not new edited')
  } 
  
  // case : to change one or more values
  else {
    confirmEditAction();
    const dataBody = {}
    // alert("bef-dataBody.value : "+dataBody);

    // check name
    if(userData.value.name != userDataEdit.value.name) {
      dataBody["name"] = userData.value.name.trim();
      // alert("dataBody.value.name : "+dataBody.value);
    }
    // check email
    if(userData.value.email != userDataEdit.value.email) {
      dataBody["email"] = userData.value.email.trim();
      // alert("dataBody.value.email : "+dataBody.value);
    }
    // check role
    if(userData.value.role != userDataEdit.value.role) {
      dataBody["role"] = userData.value.role;
      // alert("dataBody.value.role : "+dataBody.value);
    }

    const requestOptions = {
            method: 'PATCH',
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataBody)
        };
    
    return fetch(`${url}/user/${id.value}`, requestOptions)
      .then(async response => {
        const data = await response.json();
        console.log(data);
        console.log(data.details);
        console.log("Before show error")
      })
      .finally(async error => {
        const data = await error.json();
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
  let convertTime = new Date(dateCreated).toLocaleString('en-US', { 
    dateStyle: 'full', 
    timeStyle: 'medium',
     });
  return convertTime;
}

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