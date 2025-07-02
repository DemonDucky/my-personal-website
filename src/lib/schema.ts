import { z } from 'zod';

export const contactFormSchema = z.object({
	name: z.string().min(2, 'Tên phải có ít nhất 2 ký tự').max(50, 'Tên không được quá 50 ký tự'),
	email: z.string().email('Email không hợp lệ'),
	projectName: z
		.string()
		.min(2, 'Tên dự án phải có ít nhất 2 ký tự')
		.max(100, 'Tên dự án không được quá 100 ký tự'),
	projectDescription: z
		.string()
		.min(10, 'Mô tả dự án phải có ít nhất 10 ký tự')
		.max(1000, 'Mô tả không được quá 1000 ký tự')
});

export type ContactFormSchema = typeof contactFormSchema;
