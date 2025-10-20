import { createRouter, createWebHistory } from 'vue-router';
import ProgramsList from './components/ProgramsList.vue';
import ProgramTemplate from './components/ProgramTemplate.vue';

const routes = [
  {
    path: '/',
    redirect: '/programs',
  },
  {
    path: '/programs',
    name: 'Programs',
    component: ProgramsList,
  },
  {
    path: '/program/:id',
    name: 'ProgramTemplate',
    component: ProgramTemplate,
    props: true, // This allows the :id param to be passed as a prop to the component
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
