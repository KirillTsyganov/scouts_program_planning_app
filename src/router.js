import { createRouter, createWebHistory } from 'vue-router';
import ProgramsList from './components/ProgramsList.vue';
import ProgramEditor from './components/ProgramEditor.vue';

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
    name: 'ProgramEditor',
    component: ProgramEditor,
    props: true, // This allows the :id param to be passed as a prop to the component
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
