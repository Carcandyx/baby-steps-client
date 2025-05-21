'use client';

import * as React from 'react';
import {
	AppBar,
	Toolbar,
	Typography,
	Button,
	Box,
	Avatar,
	useTheme,
	Menu,
	MenuItem,
	ListItemIcon,
	ListItemText,
} from '@mui/material';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LogoutOutlined } from '@mui/icons-material';
import { authService } from '@/app/services/api/authService';

interface NavBarProps {
	userInitials?: string;
}

export default function NavBar({ userInitials = 'JS' }: NavBarProps) {
	const theme = useTheme();
	const pathname = usePathname();
	const router = useRouter();
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	// Helper to determine if a link is active
	const isActive = (path: string) => {
		return pathname === path || pathname?.startsWith(`${path}/`);
	};

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleLogout = () => {
		authService.logout();
		router.push('/login');
		handleClose();
	};

	return (
		<AppBar
			position='static'
			sx={{
				backgroundColor: theme.palette.primary.light,
				boxShadow: 'none',
				color: theme.palette.text.primary,
				padding: '0.5rem 1rem',
			}}
		>
			<Toolbar sx={{ justifyContent: 'space-between', padding: { xs: 0 } }}>
				{/* Logo */}
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						marginRight: { xs: 1, md: 4 },
					}}
					component={Link}
					href='/dashboard'
				>
					<Typography
						variant='h6'
						component='div'
						sx={{
							fontWeight: 'bold',
							display: 'flex',
							alignItems: 'center',
							gap: 1,
							textDecoration: 'none',
							color: 'inherit',
						}}
					>
						BabySteps
					</Typography>
				</Box>

				{/* Navigation Links */}
				<Box
					sx={{
						display: 'flex',
						flexGrow: 1,
						justifyContent: { xs: 'space-between', md: 'center' },
						gap: { xs: 0, md: 4 },
					}}
				>
					<Button
						component={Link}
						href='/dashboard'
						sx={{
							color: isActive('/dashboard')
								? theme.palette.primary.dark
								: 'inherit',
							fontWeight: isActive('/dashboard') ? 'bold' : 'medium',
							'&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' },
						}}
					>
						Resumen
					</Button>
					<Button
						component={Link}
						href='/bebes'
						sx={{
							color: isActive('/bebes')
								? theme.palette.primary.dark
								: 'inherit',
							fontWeight: isActive('/bebes') ? 'bold' : 'medium',
							'&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' },
						}}
					>
						Bebés
					</Button>
				</Box>

				{/* User Profile */}
				<Avatar
					onClick={handleClick}
					sx={{
						bgcolor: theme.palette.secondary.main,
						color: theme.palette.secondary.contrastText,
						cursor: 'pointer',
						marginLeft: { xs: 1, md: 4 },
					}}
				>
					{userInitials}
				</Avatar>
				<Menu
					anchorEl={anchorEl}
					open={open}
					onClose={handleClose}
					onClick={handleClose}
					transformOrigin={{ horizontal: 'right', vertical: 'top' }}
					anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
					PaperProps={{
						sx: {
							mt: 1,
							width: 200,
							boxShadow: '0px 2px 8px rgba(0,0,0,0.15)',
							borderRadius: 2,
						},
					}}
				>
					<MenuItem onClick={handleLogout}>
						<ListItemIcon>
							<LogoutOutlined fontSize='small' />
						</ListItemIcon>
						<ListItemText>Cerrar sesión</ListItemText>
					</MenuItem>
				</Menu>
			</Toolbar>
		</AppBar>
	);
}
