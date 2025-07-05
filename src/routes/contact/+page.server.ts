import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { PageServerLoad } from './$types';
import { contactFormSchema } from '$lib/schema';

export const load: PageServerLoad = async () => {
	return {
		contactForm: await superValidate(zod(contactFormSchema))
	};
};
