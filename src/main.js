import { createApp } from 'vue';
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.css';
import { createRouter, createWebHistory } from 'vue-router';
import ProjectList from './components/pages/ProjectList';
import ProjectShow from './components/pages/ProjectShow';
import ShowMovies from './components/pages/ShowMovies';
  
  
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: ProjectList },
    { path: '/show/:id', component: ProjectShow },
    { path: '/showMovies/:id', component: ShowMovies },
  ],
});
  
createApp(App).use(router).mount('#app');