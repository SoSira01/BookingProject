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
import EditUser from '../views/EditUser.vue'
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
        path: '/CatagoryList/editCategory/:CategoryId',
        name: 'EditCategory',
        component: EditCategory
    },
    {
        path: '/AboutUs',
        name: 'AboutUs',
        component: AboutUs
    },
    {
        path: '/CatagoryList',
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
        path: '/ListUser/EditUser/:userId',
        name: 'EditUser',
        component: EditUser
    },
    {
        path: '/ListUser/:userId',
        name: 'ListUserDetail',
        component: ListUserDetail
    },
    {
        path: '/:catchNotMatchPath(.*)',
        name: 'NotFound',
        component: NotFound
    }
    ]

const router = createRouter({history, routes})
export default router
