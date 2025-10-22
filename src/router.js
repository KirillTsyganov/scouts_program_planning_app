import { createRouter, createWebHashHistory } from 'vue-router';
import ProgramsList from './components/ProgramsList.vue';
import ProgramEditor from './components/ProgramEditor.vue';
import ActivityEditor from './components/ActivityEditor.vue';

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
  {
    path: '/program/:id/activity/:activityId',
    name: 'ActivityEditor',
    component: ActivityEditor,
    props: true,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
