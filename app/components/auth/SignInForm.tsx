'use client';

import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
	Box,
	Button,
	Link,
	TextField,
	Typography,
	useTheme,
	Alert,
} from '@mui/material';
import PasswordInput from './PasswordInput';
import { button, form, spacing } from '@/app/styles';
import {
	authService,
	LoginRequest,
	AuthError,
} from '@/app/services/api/authService';
import { useRouter } from 'next/navigation';

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
	const router = useRouter();
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

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
		onSubmit: async (values) => {
			try {
				setError(null);
				setLoading(true);

				const loginData: LoginRequest = {
					email: values.email,
					password: values.password,
				};

				await authService.login(loginData);

				// Redirect to dashboard or home page after successful login
				router.push('/dashboard');
			} catch (error) {
				console.error('Login error:', error);
				if (error instanceof AuthError) {
					setError(error.message);
				} else if (error instanceof Error) {
					setError(error.message);
				} else {
					setError(
						'Error durante el inicio de sesión. Por favor, inténtalo de nuevo.'
					);
				}
			} finally {
				setLoading(false);
			}
		},
	});

	return (
		<Box
			component='form'
			onSubmit={formik.handleSubmit}
			sx={{ mt: spacing.lg }}
		>
			{error && (
				<Alert severity='error' sx={{ mb: 2 }}>
					{error}
				</Alert>
			)}

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
				disabled={loading}
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
				disabled={loading}
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
				disabled={loading}
			>
				{loading ? 'Iniciando sesión...' : translations.loginButton}
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
					disabled={loading}
				>
					{translations.signUp}
				</Link>
			</Box>
		</Box>
	);
};

export default SignInForm;
