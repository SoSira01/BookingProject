<script setup>
import AllCategory from '../components/AllCategory.vue';
import { ref, onBeforeMount } from 'vue'

const url = '  http://202.44.9.103:8080/ssi5/api'
const cat = ref([])

//GET
const getAllListCategory = async () => {
    const res = await fetch(`${url}/category`)
  if (res.status === 200) {
    cat.value = await res.json()
    console.log(cat.value)
  } else console.log('error, cannot get Category List')
}
onBeforeMount(() => {
  getAllListCategory();
})


</script>
 
<template>
<AllCategory :AllCategory="cat" />
</template>
 
<style>

</style>