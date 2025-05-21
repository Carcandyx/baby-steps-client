/**
 * Standardized style constants for the BabySteps application
 * Use these instead of inline sx properties to maintain consistency
 */

// Spacing
export const spacing = {
	xs: '0.5rem', // 8px
	sm: '1rem', // 16px
	md: '1.5rem', // 24px
	lg: '2rem', // 32px
	xl: '3rem', // 48px
	xxl: '4rem', // 64px
};

// Responsive breakpoints to match MUI
export const breakpoints = {
	xs: 0,
	sm: 600,
	md: 900,
	lg: 1200,
	xl: 1536,
};

// Text styles
export const text = {
	pageTitle: {
		fontSize: '1.5rem',
		fontWeight: 700,
		marginBottom: spacing.sm,
		'@media (min-width: 600px)': {
			fontSize: '2rem',
		},
	},
	sectionTitle: {
		fontSize: '1.25rem',
		fontWeight: 600,
		marginBottom: spacing.xs,
	},
	subtitle: {
		fontSize: '1rem',
		color: 'text.secondary',
		marginBottom: spacing.md,
	},
	gradient: {
		background: 'linear-gradient(90deg, #7B74BC 0%, #A095FF 100%)',
		WebkitBackgroundClip: 'text',
		WebkitTextFillColor: 'transparent',
	},
};

// Card styles
export const card = {
	default: {
		borderRadius: '16px',
		boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.08)',
		overflow: 'hidden',
	},
	content: {
		padding: spacing.md,
	},
	hover: {
		transition: 'all 0.2s ease-in-out',
		'&:hover': {
			transform: 'translateY(-4px)',
			boxShadow: '0px 12px 24px rgba(0, 0, 0, 0.12)',
		},
	},
};

// Button styles
export const button = {
	rounded: {
		borderRadius: '30px',
		padding: `8px ${spacing.md}`,
		transition: 'all 0.2s ease-in-out',
	},
	hover: {
		'&:hover': {
			transform: 'translateY(-2px)',
			boxShadow: '0px 6px 10px rgba(0, 0, 0, 0.15)',
		},
	},
};

// Form styles
export const form = {
	container: {
		maxWidth: '450px',
		width: '100%',
		marginLeft: 'auto',
		marginRight: 'auto',
	},
	input: {
		marginBottom: spacing.sm,
	},
};

// Layout styles
export const layout = {
	page: {
		display: 'flex',
		flexDirection: 'column',
		minHeight: '100vh',
	},
	container: {
		maxWidth: '1200px',
		width: '95%',
		marginLeft: 'auto',
		marginRight: 'auto',
		paddingTop: spacing.lg,
		paddingBottom: spacing.lg,
	},
	authBackground: {
		minHeight: '100vh',
		background: 'linear-gradient(135deg, #E8E7FF 0%, #FAF8E9 100%)',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		padding: `${spacing.sm} 0`,
	},
	authBackgroundFullWidth: {
		minHeight: '100vh',
		background: 'linear-gradient(135deg, #E8E7FF 0%, #FAF8E9 100%)',
		display: 'flex',
		flexDirection: { xs: 'column', md: 'row' },
		alignItems: 'stretch',
		width: '100%',
	},
	authContainer: {
		borderRadius: '16px',
		overflow: 'hidden',
		width: '95%',
		maxWidth: '1200px',
		minHeight: { xs: 'auto', md: '85vh' },
		display: 'flex',
		flexDirection: { xs: 'column', md: 'row' },
		boxShadow: '0 12px 40px rgba(0,0,0,0.12)',
	},
	authSidePanel: {
		flex: { xs: '1', md: '0 0 45%' },
		backgroundColor: 'primary.light',
	},
	authSidePanelFullWidth: {
		flex: { xs: '1', md: '0 0 60%' },
		backgroundColor: 'primary.light',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	authFormPanel: {
		flex: { xs: '1', md: '0 0 55%' },
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		padding: { xs: spacing.md, sm: spacing.lg, md: spacing.xl },
		backgroundColor: 'background.default',
	},
	authFormPanelFullWidth: {
		flex: { xs: '1', md: '0 0 40%' },
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		padding: { xs: spacing.md, sm: spacing.lg, md: spacing.xl },
		backgroundColor: 'background.paper',
	},
};

// Element styles
export const elements = {
	logo: {
		width: { xs: '50px', md: '65px' },
		height: { xs: '50px', md: '65px' },
		filter: 'drop-shadow(0px 4px 8px rgba(0,0,0,0.1))',
		marginBottom: spacing.sm,
	},
	illustration: {
		width: { xs: '60%', md: '75%' },
		maxWidth: '320px',
		aspectRatio: '1',
		filter: 'drop-shadow(0px 8px 16px rgba(0,0,0,0.08))',
		transform: 'scale(1.05)',
		marginTop: { xs: spacing.xs, md: spacing.sm },
		marginBottom: spacing.lg,
	},
	avatar: {
		backgroundColor: 'secondary.main',
		color: 'secondary.contrastText',
		fontWeight: 'bold',
	},
	divider: {
		width: '100%',
		marginTop: spacing.md,
		marginBottom: spacing.md,
		position: 'relative',
	},
	dividerText: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		backgroundColor: 'background.default',
		padding: `0 ${spacing.sm}`,
		color: 'text.secondary',
		fontWeight: 500,
	},
};
