export const buildQueryString = (params: Record<string, any>): string => {
	const esc = encodeURIComponent;
	return Object.keys(params)
		.filter(k => params[k] !== null && params[k] !== undefined && params[k] !== "")
		.map(k => esc(k) + "=" + esc(params[k]))
		.join("&");
};

export const debounce = (fn: Function, ms: number) => {
	let timeoutId: ReturnType<typeof setTimeout>;
	return function (this: any, ...args: any[]) {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => fn.apply(this, args), ms);
	};
};

export const getStarshipIdFromUrl = (url: string) => {
	return url.split('/').slice(-2, -1);
}

export function typedKeys<T extends object>(obj: T): Array<keyof T> {
	return Object.keys(obj) as Array<keyof T>;
}