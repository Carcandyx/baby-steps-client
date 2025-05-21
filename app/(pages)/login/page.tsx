'use client';

import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import SidePanel from '@/app/components/auth/SidePanel';
import SignInForm from '@/app/components/auth/SignInForm';
import SignUpForm from '@/app/components/auth/SignUpForm';
import { layout, text, form } from '@/app/styles';

// Spanish translations for static text
const translations = {
	// Login screen
	welcomeBack: 'Bienvenido de nuevo',
	loginSubtitle: 'Inicia sesión para continuar tu viaje de crianza',
	loginCTA: 'Iniciar sesión',
	email: 'Correo electrónico',
	password: 'Contraseña',
	loginButton: 'Iniciar sesión',
	noAccount: '¿No tienes una cuenta?',
	signUp: 'Regístrate',

	// Signup screen
	createAccount: 'Crea tu cuenta',
	signupSubtitle: 'Comienza tu viaje de crianza con BabySteps',
	firstName: 'Nombre',
	lastName: 'Apellido',
	emailSignup: 'Correo electrónico',
	passwordSignup: 'Contraseña',
	passwordRequirements:
		'Debe tener al menos 8 caracteres con 1 número y 1 carácter especial',
	confirmPassword: 'Confirmar contraseña',
	createAccountButton: 'Crear cuenta',
	alreadyHaveAccount: '¿Ya tienes una cuenta?',
	logIn: 'Iniciar sesión',

	// Features
	featuresTitle: 'Únete a miles de padres que confían en BabySteps',
	featuresList: [
		'Rastrea alimentaciones, sueño y cambios de pañal',
		'Nunca te pierdas citas importantes o vacunas',
		'Monitorea el crecimiento y los hitos de desarrollo',
		'Comparte actualizaciones del bebé con familiares',
	],
};

export default function LoginPage() {
	const [isLogin, setIsLogin] = useState(true);

	const toggleAuthMode = () => {
		setIsLogin(!isLogin);
	};

	return (
		<Box sx={layout.authBackgroundFullWidth}>
			{/* Left Side Panel */}
			<Box sx={layout.authSidePanelFullWidth}>
				{isLogin ? (
					<SidePanel
						subtitle={translations.loginSubtitle}
						illustration='/babies-login.svg'
					/>
				) : (
					<SidePanel
						subtitle={translations.signupSubtitle}
						illustration='/babies-signup.svg'
						features={{
							title: translations.featuresTitle,
							features: translations.featuresList,
						}}
					/>
				)}
			</Box>

			{/* Right Side - Auth Forms */}
			<Box sx={layout.authFormPanelFullWidth}>
				<Box sx={form.container}>
					{isLogin ? (
						/* Login Form */
						<>
							<Typography
								variant='h4'
								component='h1'
								gutterBottom
								fontWeight='bold'
								sx={text.pageTitle}
							>
								{translations.welcomeBack}
							</Typography>
							<Typography
								variant='body1'
								color='text.secondary'
								paragraph
								sx={text.subtitle}
							>
								{translations.loginSubtitle}
							</Typography>

							<SignInForm
								onToggleForm={toggleAuthMode}
								translations={{
									email: translations.email,
									password: translations.password,
									loginButton: translations.loginButton,
									noAccount: translations.noAccount,
									signUp: translations.signUp,
								}}
							/>
						</>
					) : (
						/* Signup Form */
						<>
							<Typography
								variant='h4'
								component='h1'
								gutterBottom
								fontWeight='bold'
								sx={text.pageTitle}
							>
								{translations.createAccount}
							</Typography>
							<Typography
								variant='body1'
								color='text.secondary'
								paragraph
								sx={text.subtitle}
							>
								{translations.signupSubtitle}
							</Typography>

							<SignUpForm
								onToggleForm={toggleAuthMode}
								translations={{
									firstName: translations.firstName,
									lastName: translations.lastName,
									emailSignup: translations.emailSignup,
									passwordSignup: translations.passwordSignup,
									passwordRequirements: translations.passwordRequirements,
									confirmPassword: translations.confirmPassword,
									createAccountButton: translations.createAccountButton,
									alreadyHaveAccount: translations.alreadyHaveAccount,
									logIn: translations.logIn,
								}}
							/>
						</>
					)}
				</Box>
			</Box>
		</Box>
	);
}
