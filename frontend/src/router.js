import VueRouter from 'vue-router';

import HomePage from './components/pages/HomePage.vue';
import LoginPage from './components/pages/LoginPage.vue';
import RegisterPage from './components/pages/RegisterPage.vue';
import JobPostingsListPage from './components/pages/job-postings/ListPage.vue';
import JobPostingsCreatePage from './components/pages/job-postings/CreatePage.vue';
import JobPostingsEditPage from './components/pages/job-postings/EditPage.vue';

const routes = [
  { path: '/', component: HomePage, isPublic: true },
  { path: '/login', component: LoginPage, isPublic: true, isAuthPage: true  },
  { path: '/register', component: RegisterPage, isPublic: true, isAuthPage: true },
  { path: '/job-postings', component: JobPostingsListPage, isPublic: false },
  { path: '/job-postings/create', component: JobPostingsCreatePage, isPublic: false },
  { path: '/job-postings/edit/:id', component: JobPostingsEditPage, isPublic: false },
]

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  const authRequired = routes.filter(route => !route.isPublic && route.path === to.path).length;
  const isAuthRoute = routes.filter(route => route.isAuthPage && route.path === to.path).length;
  const hasAuthToken = localStorage.getItem('access_token');

  if (authRequired && !hasAuthToken) {
    next('/login');
  } else if (hasAuthToken && isAuthRoute) {
    next('/');
  } else {
    next();
  }
});

export default router;
