'use client';

import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
	Box,
	Button,
	Grid,
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
	SignupRequest,
	AuthError,
} from '@/app/services/api/authService';
import { useRouter } from 'next/navigation';

interface SignUpFormProps {
	onToggleForm: () => void;
	translations: {
		firstName: string;
		lastName: string;
		emailSignup: string;
		passwordSignup: string;
		passwordRequirements: string;
		confirmPassword: string;
		createAccountButton: string;
		alreadyHaveAccount: string;
		logIn: string;
	};
}

interface SignUpValues {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	confirmPassword: string;
}

const SignUpForm: React.FC<SignUpFormProps> = ({
	onToggleForm,
	translations,
}) => {
	const theme = useTheme();
	const router = useRouter();
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	// Validation schema
	const validationSchema = Yup.object({
		firstName: Yup.string().required('El nombre es requerido'),
		lastName: Yup.string().required('El apellido es requerido'),
		email: Yup.string()
			.email('Correo electrónico inválido')
			.required('El correo electrónico es requerido'),
		password: Yup.string()
			.min(8, 'La contraseña debe tener al menos 8 caracteres')
			.matches(/[0-9]/, 'La contraseña debe contener al menos un número')
			.matches(
				/[!@#$%^&*]/,
				'La contraseña debe contener al menos un carácter especial'
			)
			.required('La contraseña es requerida'),
		confirmPassword: Yup.string()
			.oneOf([Yup.ref('password')], 'Las contraseñas deben coincidir')
			.required('Confirmar contraseña es requerido'),
	});

	// Initialize formik
	const formik = useFormik<SignUpValues>({
		initialValues: {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
		validationSchema,
		onSubmit: async (values) => {
			try {
				setError(null);
				setLoading(true);

				const signupData: SignupRequest = {
					firstName: values.firstName,
					lastName: values.lastName,
					email: values.email,
					password: values.password,
				};

				await authService.signup(signupData);

				// Redirect to dashboard or home page after successful registration
				router.push('/dashboard');
			} catch (error) {
				console.error('Signup error:', error);
				if (error instanceof AuthError) {
					setError(error.message);
				} else if (error instanceof Error) {
					setError(error.message);
				} else {
					setError('Error durante el registro. Por favor, inténtalo de nuevo.');
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
			sx={{ mt: spacing.md }}
		>
			{error && (
				<Alert severity='error' sx={{ mb: 2 }}>
					{error}
				</Alert>
			)}

			<Grid container spacing={spacing.sm}>
				<Grid size={{ xs: 12, sm: 6 }}>
					<TextField
						label={translations.firstName}
						name='firstName'
						fullWidth
						value={formik.values.firstName}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.firstName && Boolean(formik.errors.firstName)}
						helperText={
							formik.touched.firstName && formik.errors.firstName
								? String(formik.errors.firstName)
								: undefined
						}
						required
						sx={form.input}
						disabled={loading}
					/>
				</Grid>
				<Grid size={{ xs: 12, sm: 6 }}>
					<TextField
						label={translations.lastName}
						name='lastName'
						fullWidth
						value={formik.values.lastName}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.lastName && Boolean(formik.errors.lastName)}
						helperText={
							formik.touched.lastName && formik.errors.lastName
								? String(formik.errors.lastName)
								: undefined
						}
						required
						sx={form.input}
						disabled={loading}
					/>
				</Grid>
			</Grid>

			<TextField
				label={translations.emailSignup}
				name='email'
				type='email'
				fullWidth
				margin='normal'
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
				label={translations.passwordSignup}
				name='password'
				value={formik.values.password}
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				error={formik.touched.password && Boolean(formik.errors.password)}
				helperText={
					formik.touched.password && formik.errors.password
						? String(formik.errors.password)
						: translations.passwordRequirements
				}
				required
				sx={form.input}
				disabled={loading}
			/>

			<PasswordInput
				label={translations.confirmPassword}
				name='confirmPassword'
				value={formik.values.confirmPassword}
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				error={
					formik.touched.confirmPassword &&
					Boolean(formik.errors.confirmPassword)
				}
				helperText={
					formik.touched.confirmPassword && formik.errors.confirmPassword
						? String(formik.errors.confirmPassword)
						: undefined
				}
				required
				sx={{ ...form.input, mt: spacing.sm }}
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
				{loading ? 'Creando cuenta...' : translations.createAccountButton}
			</Button>

			<Box sx={{ mt: spacing.md, textAlign: 'center' }}>
				<Typography variant='body2' color='text.secondary' component='span'>
					{translations.alreadyHaveAccount}{' '}
				</Typography>
				<Link
					component='button'
					onClick={onToggleForm}
					underline='hover'
					color='primary'
					disabled={loading}
				>
					{translations.logIn}
				</Link>
			</Box>
		</Box>
	);
};

export default SignUpForm;
