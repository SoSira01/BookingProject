<script setup>
  import route from 'color-convert/route'
  import { ref } from 'vue'
  import router from '../router'
  import jwt_decode from 'jwt-decode'
  import MatchPwd from '../components/MatchUserPassword.vue'
  
  // const url = 'http://intproj21.sit.kmutt.ac.th:80/ssi5/api'
  // const url = 'http://localhost:8080/api'
  // const url = 'http://202.44.9.103:8080/ssi5/api'
  // const url = 'http://intproj21.sit.kmutt.ac.th:8080/ssi5/api'
  const url = `${import.meta.env.VITE_APP_BASE_URL}`

  const matchUserPass = ref([])
  const textComplete = ref({})
  let emailToken = ""
  
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

  // Post User and Password
  const matchUser = async (matchUser) => {
        const res = await fetch(`${url}/match`,
        {
            method: "POST",
            headers: { 
              "content-type": "application/json",
              'Authorization': getCurrentUserToken()
             },
            body: JSON.stringify({
                    email: matchUser.email.trim(),
                    password: matchUser.password
            })
        })
  
        if (res.status == 200) {
            textComplete.value = await res.text()
            alert(textComplete.value)
            console.log(textComplete)
        } else {
            const textError = await res.json()
            var error=""
            for (let i = 0; i < textError.details.length; i++) 
              {
                console.log(textError.details[i].errorMessage)
                error += textError.details[i].errorMessage +" \n"
              }
            // console.log(error)
            alert('Error To Match : ' + error)
          //  console.log("cannot match user email and password")
        }
      }
  
  </script>
  
  <template>
  
    <MatchPwd
    :matchUser="matchUserPass"
    @match ="matchUser"
    />
  
  </template>
  
  <style scoped>
  </style>