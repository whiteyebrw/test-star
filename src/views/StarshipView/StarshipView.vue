<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { getStarships } from '../../api/apiComponents.ts';
import { StarshipDto } from '../../api/apiSchemas.ts';
import { useRoute, useRouter } from 'vue-router';
import { debounce, getStarshipIdFromUrl } from '../../utils/utils.ts';
import { useFetch } from '../../composables/useFetch.ts';

const MAX_LIMIT_STARSHIPS = 10;

const router = useRouter();
const route = useRoute();

const page = ref(route.query.page ? Number(route.query.page) : 1);
const search = ref(route.query.search?.toString() ?? '');

const starships = ref<StarshipDto>({
	count: 0,
	next: null,
	previous: null,
	results: []
});

const {
	isLoading,
	fetchData,
	data,
	error
} = useFetch<StarshipDto, Parameters<typeof getStarships>>({
	requestFunction: getStarships,
});

const pageCount = computed(() => Math.ceil(starships.value.count / MAX_LIMIT_STARSHIPS));

const fetchStarships = async () => {
	await fetchData(search.value, page.value);

	if (data.value) {
		starships.value = data.value;
	}
};

const debouncedFetchStarships = debounce(fetchStarships, 300);

const onSearchInput = () => {
	page.value = 1;
};

watch([search, page], () => {
	router.push({
		query: {
			search: search.value || undefined,
			page: page.value > 1 ? page.value : undefined,
		}
	});
	debouncedFetchStarships();
});

onMounted(() => {
	fetchStarships();
});
</script>

<template>
	<v-container>
		<v-col>
			<v-row>
				<v-text-field @input="onSearchInput" v-model="search" label="Search"/>
			</v-row>

			<v-row>
				<span v-if="isLoading">Загрузка...</span>
				<span v-if="error">Ошибка: {{ error }}</span>
				<v-data-iterator
					v-else-if="starships.count"
					:loading="isLoading"
					:items-per-page="MAX_LIMIT_STARSHIPS"
					:items="starships.results"
				>
					<template v-slot:default="{ items }">
						<template v-for="item in items" :key="item.url">
							<v-card :to="`/starship/${getStarshipIdFromUrl(item.raw.url)}`" :title="item.raw.name"/>

							<br/>
						</template>
					</template>


					<template v-slot:footer>
						<v-pagination v-model="page" :length="pageCount"></v-pagination>
					</template>
				</v-data-iterator>
			</v-row>
		</v-col>
	</v-container>
</template>

<style scoped>

</style>