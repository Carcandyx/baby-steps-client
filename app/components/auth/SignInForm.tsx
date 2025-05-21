'use client';

import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
	Box,
	Button,
	Link,
	TextField,
	Typography,
	useTheme,
} from '@mui/material';
import PasswordInput from './PasswordInput';
import { button, form, spacing } from '@/app/styles';

interface SignInFormProps {
	onToggleForm: () => void;
	translations: {
		email: string;
		password: string;
		loginButton: string;
		noAccount: string;
		signUp: string;
	};
}

interface SignInValues {
	email: string;
	password: string;
}

const SignInForm: React.FC<SignInFormProps> = ({
	onToggleForm,
	translations,
}) => {
	const theme = useTheme();

	// Validation schema
	const validationSchema = Yup.object({
		email: Yup.string()
			.email('Correo electrónico inválido')
			.required('El correo electrónico es requerido'),
		password: Yup.string().required('La contraseña es requerida'),
	});

	// Initialize formik
	const formik = useFormik<SignInValues>({
		initialValues: {
			email: '',
			password: '',
		},
		validationSchema,
		onSubmit: (values) => {
			console.log('Login submitted', values);
			// Add login logic here
		},
	});

	return (
		<Box
			component='form'
			onSubmit={formik.handleSubmit}
			sx={{ mt: spacing.lg }}
		>
			<TextField
				label={translations.email}
				type='email'
				fullWidth
				margin='normal'
				name='email'
				value={formik.values.email}
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				error={formik.touched.email && Boolean(formik.errors.email)}
				helperText={
					formik.touched.email && formik.errors.email
						? String(formik.errors.email)
						: undefined
				}
				required
				sx={form.input}
			/>

			<PasswordInput
				label={translations.password}
				value={formik.values.password}
				onChange={formik.handleChange}
				name='password'
				onBlur={formik.handleBlur}
				error={formik.touched.password && Boolean(formik.errors.password)}
				helperText={
					formik.touched.password && formik.errors.password
						? String(formik.errors.password)
						: undefined
				}
				required
				sx={form.input}
			/>

			<Button
				type='submit'
				fullWidth
				variant='contained'
				size='large'
				sx={{
					...button.rounded,
					...button.hover,
					mt: spacing.md,
					mb: spacing.sm,
					bgcolor: theme.palette.primary.main,
					'&:hover': {
						...button.hover['&:hover'],
						bgcolor: theme.palette.primary.dark,
					},
				}}
			>
				{translations.loginButton}
			</Button>

			<Box sx={{ mt: spacing.md, textAlign: 'center' }}>
				<Typography variant='body2' color='text.secondary' component='span'>
					{translations.noAccount}{' '}
				</Typography>
				<Link
					component='button'
					onClick={onToggleForm}
					underline='hover'
					color='primary'
				>
					{translations.signUp}
				</Link>
			</Box>
		</Box>
	);
};

export default SignInForm;
