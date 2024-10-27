import { writable } from 'svelte/store';


export const userID = writable(null);

export const isAdmin = writable(false)