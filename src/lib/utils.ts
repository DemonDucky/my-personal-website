import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { localizeHref } from '$lib/paraglide/runtime';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function localizeAndRemoveEndTrailingSlash(
	path: string,
	settings?: { locale: string }
): string {
	const localize = localizeHref(path, settings);
	return localize.length > 1 && localize.endsWith('/') ? localize.slice(0, -1) : localize;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChild<T> = T extends { child?: any } ? Omit<T, 'child'> : T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChildren<T> = T extends { children?: any } ? Omit<T, 'children'> : T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & { ref?: U | null };
