import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { contactFormSchema, type ContactFormSchema } from '$lib/schema';
import { Resend } from 'resend';
import { RESEND_API_KEY } from '$env/static/private';
import type { z } from 'zod';

const resend = new Resend(RESEND_API_KEY);

// Create email template function
const createEmailTemplate = (data: z.infer<ContactFormSchema>) => {
	return `
		<html>
			<head>
				<style>
					body {
						font-family: Arial, sans-serif;
						margin: 0;
						padding: 20px;
						color: #333;
					}
					.container {
						max-width: 600px;
						margin: 0 auto;
						border: 1px solid #eaeaea;
						border-radius: 5px;
						padding: 20px;
					}
					h1 {
						color: #333;
						margin-top: 0;
					}
					.field {
						margin-bottom: 15px;
					}
					.label {
						font-weight: bold;
						margin-bottom: 5px;
					}
					.value {
						margin: 0;
					}
				</style>
			</head>
			<body>
				<div class="container">
					<h1>Có người liên hệ mới</h1>
					<div class="field">
						<div class="label">Name:</div>
						<p class="value">${data.name}</p>
					</div>
					<div class="field">
						<div class="label">Email:</div>
						<p class="value">${data.email}</p>
					</div>
					<div class="field">
						<div class="label">Project Name:</div>
						<p class="value">${data.projectName}</p>
					</div>
					<div class="field">
						<div class="label">Project Description:</div>
						<p class="value">${data.projectDescription}</p>
					</div>
				</div>
			</body>
		</html>
	`;
};

export const load: PageServerLoad = async () => {
	return {
		contactForm: await superValidate(zod(contactFormSchema))
	};
};

export const actions: Actions = {
	contact: async (event) => {
		const form = await superValidate(event, zod(contactFormSchema));

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		try {
			// Send email using Resend
			const { error } = await resend.emails.send({
				from: 'contact@amorees.com',
				to: 'luong.tuananh.biz@gmail.com',
				subject: `[Quan Trọng] Có người liên hệ mới từ portfolio: ${form.data.name}`,
				html: createEmailTemplate(form.data)
			});

			if (error) {
				console.error('Email sending failed:', error);
				return {
					success: false,
					form,
					error: 'Failed to send email'
				};
			}

			return {
				success: true,
				form
			};
		} catch (error) {
			console.error('Email sending error:', error);
			return {
				success: false,
				form,
				error: 'An error occurred while sending the email'
			};
		}
	}
};
