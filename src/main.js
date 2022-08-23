import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/main.css'

// en ajoutant axios à l'objet "window", on le rend disponible dans tous nos composants
window.axios = axios.create({baseURL: 'http://localhost:8080/api/'});

/* 
*  on ajoute un interceptor avant la requête
* il va cherhcer le JWT qu'on a stocké dans le localStorage après login
* et va rajouter une ent^te Authorization: Bearer <<valeur_token>> à chaque requête HTTP
*
*/
window.axios.interceptors.request.use(
request => {
const jwt = localStorage.getItem("jwt");
console.log("jwt",jwt);
if ( jwt!= null){
request.headers['Authorization'] = `Bearer ${jwt}`
}
return request;
}
);

const app = createApp(App)

app.use(router)

app.mount('#app')
