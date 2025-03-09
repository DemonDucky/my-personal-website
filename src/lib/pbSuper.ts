import { PB_SUPERUSER_EMAIL, PB_SUPERUSER_PASSWORD } from '$env/static/private';
import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
import type Client from 'pocketbase';
import PocketBase from 'pocketbase';

const initPBSuper = async (): Promise<Client> => {
	const pb = new PocketBase(PUBLIC_POCKETBASE_URL);

	await pb.collection('_superusers').authWithPassword(PB_SUPERUSER_EMAIL, PB_SUPERUSER_PASSWORD);

	return pb;
};

export { initPBSuper };
