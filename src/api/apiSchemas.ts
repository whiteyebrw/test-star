export interface StarshipDto {
	count: number;
	next: string | null;
	previous: string | null;
	results: StarshipDetailDto[];
}

export interface StarshipDetailDto {
	MGLT: string;
	cargo_capacity: string;
	consumables: string;
	cost_in_credits: string;
	created: string;
	crew: string;
	edited: string;
	hyperdrive_rating: string;
	length: string;
	manufacturer: string;
	max_atmosphering_speed: string;
	model: string;
	name: string;
	passengers: string;
	films: string[];
	pilots: unknown[];
	starship_class: string;
	url: string;
}