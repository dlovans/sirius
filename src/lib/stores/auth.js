import { writable } from 'svelte/store';

export const user = writable(false);

export const isAdmin = writable(false)