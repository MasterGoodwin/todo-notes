import index from "./pages/Index.vue";
import edit from "./pages/Edit.vue";

const routes = [
    { path: '/', name: 'index', component: index },
    { path: '/note/:id', name: 'edit', component: edit },
];

export default routes;