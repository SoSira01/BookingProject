<script setup>
import { useRoute } from 'vue-router';
import { ref,onBeforeMount } from 'vue';
import EditUser from './EditUser.vue';
import router from '../router'

const url = 'http://intproj21.sit.kmutt.ac.th:80/ssi5/api'
// const url = 'http://intproj21.sit.kmutt.ac.th:8080/ssi5/api'

const usersDetail = ref({})
defineEmits(["EditUser"])
const props = defineProps({
    userDetail: {
        type: Object,
        default: {}
    }
})
</script>

<template>
 <EditUser @EditUser="editUser"></EditUser>
</template>

<style scoped>
</style>