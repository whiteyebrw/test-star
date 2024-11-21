import { RouteRecordRaw } from 'vue-router';

const StarshipView = () => import('../views/StarshipView/StarshipView.vue');
const StarshipDetailView = () => import('../views/StarshipDetailView/StarshipDetailView.vue');

export const routes: Readonly<RouteRecordRaw[]> = [
	{ path: '/starship', component: StarshipView },
	{ path: '/starship/:starshipId', component: StarshipDetailView },
];

