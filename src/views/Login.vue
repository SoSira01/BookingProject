<script setup>
    import route from 'color-convert/route'
    import { ref } from 'vue'
    import router from '../router'
    import LoginUser from '../components/LoginUser.vue'
    
    const url = `${import.meta.env.VITE_APP_BASE_URL}`
  
    const matchUserPass = ref([])
    const textComplete = ref({})
    let emailToken = ""
    
    // Post User and Password
    const matchUser = async (matchUser) => {
        if(localStorage.currentUserToken || localStorage.currentUser){
          alert("Please Logout Before!")
        } else {
          const res = await fetch(`${url}/login`,
          {
              method: "POST",
              headers: { 
                "content-type": "application/json"
               },
              body: JSON.stringify({
                      email: matchUser.email.trim(),
                      password: matchUser.password
              })
          })
    
          if (res.status == 200) {
              emailToken = matchUser.email.trim()
              textComplete.value = await res.json()
              let roleString = textComplete.value.role
              roleString = roleString.substr(1,roleString.length-2)
              localStorage.setItem('currentUser',matchUser.email.trim())
              localStorage.setItem('currentUserToken',textComplete.value.token)
              localStorage.setItem('currentUserRefreshToken',textComplete.value.refreshToken)
              localStorage.setItem('currentUserRole',roleString)
              alert(textComplete.value.title)
              router.push({ name: "Home" }).then(() => location.reload())
          } else {
              const textError = await res.json()
              var error=""
              for (let i = 0; i < textError.details.length; i++) 
                {
                  console.log(textError.details[i].errorMessage)
                  error += textError.details[i].errorMessage +" \n"
                }
              alert('Error To Login : ' + error)
          }
        }
        
    }
    
    </script>
    
    <template>
    
      <LoginUser 
      :matchUser="matchUserPass"
      @match ="matchUser"
      />
    
    </template>
    
    <style scoped>
    </style>