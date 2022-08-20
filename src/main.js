import { createApp } from 'vue'
// import { useField } from 'vee-validate'
import App from './App.vue'
import router from './router'
import './index.css'

// createApp(App).use(router).mount('#app')

const app = createApp(App)
app.use(router)
app.mount('#app')

// export default {
//     setup() {
//       // Validator function
//       const isRequired = value => (value ? true : 'This field is required');
//       const { value, errorMessage } = useField('field', isRequired);
  
//       return {
//         value,
//         errorMessage,
//       };
//     },
//   };