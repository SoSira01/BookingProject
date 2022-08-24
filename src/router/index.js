import {createRouter,createWebHistory} from 'vue-router'
import NotFound from '../views/NotFound.vue'
import Home from '../views/Home.vue'
import List from '../views/List.vue'
import ListDetail from '../views/ListDetail.vue'
import AddList from '../views/AddList.vue'
import AboutUs from '../views/AboutUs.vue'
import Edit from '../views/Edit.vue'
import CategoryList from '../views/CategoryList.vue'
import EditCategory from '../views/EditCategory.vue'
import ListUser from '../views/ListUser.vue'
import ListUserDetail from '../views/ListUserDetail.vue'
import AddUser from '../views/AddUser.vue'
import EditUser from '../components/EditUserDetail.vue'
import Login from '../views/Login.vue'
import MatchUserPwd from '../views/MatchPwd.vue'
import jwt_decode from 'jwt-decode'
import { ref } from 'vue'

const history = createWebHistory('/ssi5/')
const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/List',
        name: 'List',
        component: List
    },
    {
        path: '/List/:BookingId',
        name: 'ListDetail',
        component: ListDetail
    },
    {
        path: '/AddList',
        name: 'AddList',
        component: AddList
    },
    {
        path: '/List/:BookingId/edit/:BookingIdEdit',
        name: 'Edit',
        component: Edit
    },
    {
        path: '/CategoryList/editCategory/:CategoryId',
        name: 'EditCategory',
        component: EditCategory
    },
    {
        path: '/AboutUs',
        name: 'AboutUs',
        component: AboutUs
    },
    {
        path: '/CategoryList',
        name: 'CategoryList',
        component: CategoryList
    },
    {
        path: '/ListUser',
        name: 'ListUser',
        component: ListUser
    },
    {
        path: '/NewUser',
        name: 'NewUser',
        component: AddUser
    },
    {
        path: '/ListUser/:userId/EditUser/:userId',
        name: 'EditUser',
        component: EditUser
    },
    {
        path: '/ListUser/:userId',
        name: 'ListUserDetail',
        component: ListUserDetail
    },
    {
        path: '/Login',
        name: 'Login',
        component: Login
    },
    {
        path: '/Match',
        name: 'MatchUserPassword',
        component: MatchUserPwd
    },
    {
        path: '/:catchNotMatchPath(.*)',
        name: 'NotFound',
        component: NotFound
    }
    ]
const router = createRouter({history, routes})
router.beforeEach(async (to, from, next) => {
    const publicPages = ['/','/AddList','/AboutUs','/Login'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('currentUser');
    if ( authRequired && !loggedIn ) {
      alert("Please Login before!")
      next('/Login');
    } 
    if ( loggedIn && localStorage.currentUserToken && localStorage.currentUserRefreshToken) {
      var accessToken = jwt_decode(localStorage.currentUserToken)
      var refreshToken = jwt_decode(localStorage.currentUserRefreshToken)

      if(accessToken.exp*1000 < Date.now()) {
        // const url = 'http://localhost:8080/api'
        const url = `${import.meta.env.VITE_APP_BASE_URL}`
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json')
        myHeaders.append('Authorization', `Bearer ${localStorage.currentUserRefreshToken}`)
        let response = await fetch(`${url}/refresh`,
              {
                method: "GET",
                headers: myHeaders
              }) 
        let test = await response.json()
        
        if (response.status == 200 || response.status == 401) {
            let textComplete = ref({})
            textComplete.value = test
            console.log(textComplete.value.refreshToken)
            localStorage.setItem('currentUserToken',textComplete.value.refreshToken)
            // localStorage.removeItem('currentUserRefreshToken')
            // localStorage.removeItem('currentUserToken')
            // alert("Get Refresh Token")
            location.reload()
            // next('/ListUser')
        } else { alert('Error To Get Refresh Token') }
      }

      if(refreshToken.exp*1000 < Date.now()) {
            localStorage.removeItem('currentUserRefreshToken')
            localStorage.removeItem('currentUserToken')
            localStorage.removeItem('currentUser')
      }
    }
    
    next()
    
  });
export default router 