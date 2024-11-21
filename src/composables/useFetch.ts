import { ref } from 'vue';
import { AxiosResponse, isAxiosError } from 'axios';

interface UseFetchOptions<T, A extends any[]> {
	requestFunction: (...args: A) => Promise<AxiosResponse<T>>;
}

export function useFetch<T, A extends any[]>({ requestFunction }: UseFetchOptions<T, A>) {
	const isLoading = ref(false);
	const error = ref<string | null>(null);
	const data = ref<T | null>(null);

	const fetchData = async (...args: A) => {
		isLoading.value = true;
		error.value = null;

		try {
			const response = await requestFunction(...args);
			data.value = response.data;
		} catch (err: unknown) {
			if (isAxiosError(err)) {
				error.value = err.message;
			} else {
				error.value = 'Error';
			}
		} finally {
			isLoading.value = false;
		}
	};

	return {
		isLoading,
		error,
		data,
		fetchData,
	};
}