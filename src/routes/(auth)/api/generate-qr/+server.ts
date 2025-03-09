import { validateToken } from '$lib/utils';
import { json, type RequestHandler } from '@sveltejs/kit';
import { QRPay, BanksObject } from 'vietnam-qr-pay';

export const POST: RequestHandler = async ({ request }) => {
	const token = request.headers.get('Authorization');
	try {
		validateToken(token);
	} catch {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}
	const { amount = 100000, bankNumber = '00000118899', description = '' } = await request.json();
	const qrPay = QRPay.initVietQR({
		bankBin: BanksObject.tpbank.bin,
		bankNumber: bankNumber, // Số tài khoản
		amount: amount, // Số tiền,
		purpose: description // Nội dung chuyển tiền
	});

	return new Response(qrPay.build());
};
