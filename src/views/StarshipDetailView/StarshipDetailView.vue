<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { StarshipDetailDto } from '../../api/apiSchemas.ts';
import { useRoute } from 'vue-router';
import { getDetailStarship } from '../../api/apiComponents.ts';
import { typedKeys } from '../../utils/utils.ts';
import { useFetch } from '../../composables/useFetch.ts';

const route = useRoute();

const starshipId = computed(() => Number(route.params.starshipId));

const {
	isLoading,
	fetchData,
	data: starship,
	error
} = useFetch<StarshipDetailDto, Parameters<typeof getDetailStarship>>({
	requestFunction: getDetailStarship,
});

const keysOfStarship = computed(() => {
	return starship.value ? typedKeys(starship.value) : [];
});

onMounted(() => {
	fetchData(starshipId.value);
});
</script>

<template>
	<span v-if="error">Ошибка: {{ error }}</span>
	<v-card v-else :loadind="isLoading">
		<v-list v-if="starship" lines="one">
			<v-list-item
				v-for="key in keysOfStarship"
				:key="key"
				:title="key"
				:subtitle="starship[key].toString()"
			></v-list-item>
		</v-list>
	</v-card>
</template>

<style scoped>

</style>