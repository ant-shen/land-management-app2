import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login.vue';
import SignUp from './views/SignUp.vue';
import Dashboard from './views/Dashboard.vue';
import OwnerDetails from './views/OwnerDetails.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', component: Login },
    { path: '/signup', component: SignUp },
    { path: '/dashboard', component: Dashboard },
    { path: '/owner/:id', component: OwnerDetails },
  ],
});
