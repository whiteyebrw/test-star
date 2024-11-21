import { api } from './index.ts';
import { StarshipDetailDto, StarshipDto } from './apiSchemas.ts';
import { AxiosResponse } from 'axios';
import { buildQueryString } from '../utils/utils.ts';

export const getStarships = (search: string, page: number): Promise<AxiosResponse<StarshipDto>> => {
	const query = buildQueryString({ search, page });
	return api.get(`/starships/?${query}`);
};

export const getDetailStarship = (starshipId: number): Promise<AxiosResponse<StarshipDetailDto>> => {
	return api.get(`/starships/${starshipId}/`);
};