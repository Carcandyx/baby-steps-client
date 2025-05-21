'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
	Box,
	Typography,
	Button,
	Grid,
	Paper,
	Card,
	CardContent,
	Avatar,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
	IconButton,
	CircularProgress,
} from '@mui/material';
import { layout } from '@/app/styles';
import NavBar from '@/app/components/appNavBar';
import { authService } from '@/app/services/api/authService';
import {
	babyService,
	ExtendedBaby,
	BabyTask,
} from '@/app/services/api/babyService';
import {
	ArrowBackIos as ArrowBackIcon,
	ArrowForwardIos as ArrowForwardIcon,
	Circle as CircleIcon,
} from '@mui/icons-material';

// Remove mock tasks data since we'll load from API
// const UPCOMING_TASKS = [ ... ];

export default function Dashboard() {
	const router = useRouter();
	const [user] = useState(authService.getCurrentUser());
	const [babies, setBabies] = useState<ExtendedBaby[]>([]);
	const [isLoading, setLoading] = useState(true);
	const [currentMonth, setCurrentMonth] = useState(new Date());

	// Tasks state
	const [tasks, setTasks] = useState<BabyTask[]>([]);
	const [tasksLoading, setTasksLoading] = useState(false);

	// Format current date
	const formattedDate = new Date().toLocaleDateString('es-ES', {
		weekday: 'long',
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	});

	// Capitalize first letter of date
	const capitalizedDate =
		formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

	const fetchBabies = useCallback(async () => {
		try {
			setLoading(true);
			const babiesData = await babyService.getBabies();
			setBabies(babiesData);
		} catch (error) {
			console.error('Error loading babies:', error);
		} finally {
			setLoading(false);
		}
	}, []);

	const fetchTasks = useCallback(async () => {
		try {
			setTasksLoading(true);
			const tasksData = await babyService.getAllTasks();
			setTasks(tasksData);
		} catch (error) {
			console.error('Error loading tasks:', error);
		} finally {
			setTasksLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchBabies();
		fetchTasks();
	}, [fetchBabies, fetchTasks]);

	// Get user initials for the avatar
	const getInitials = () => {
		if (!user) return 'XX';
		return `${user.firstName?.charAt(0) || ''}${
			user.lastName?.charAt(0) || ''
		}`;
	};

	const handleNavigateToBaby = (babyId: string) => {
		router.push(`/bebes/${babyId}`);
	};

	const handleViewAllBabies = () => {
		router.push('/bebes');
	};

	// Calendar functions
	const daysInMonth = (month: Date) => {
		return new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
	};

	const firstDayOfMonth = (month: Date) => {
		return new Date(month.getFullYear(), month.getMonth(), 1).getDay();
	};

	const prevMonth = () => {
		const newMonth = new Date(currentMonth);
		newMonth.setMonth(newMonth.getMonth() - 1);
		setCurrentMonth(newMonth);
	};

	const nextMonth = () => {
		const newMonth = new Date(currentMonth);
		newMonth.setMonth(newMonth.getMonth() + 1);
		setCurrentMonth(newMonth);
	};

	// Format month and year for calendar header
	const monthYearDisplay = currentMonth.toLocaleDateString('es-ES', {
		month: 'long',
		year: 'numeric',
	});
	const capitalizedMonthYear =
		monthYearDisplay.charAt(0).toUpperCase() + monthYearDisplay.slice(1);

	// Check if a task is on a specific date
	const getTasksForDate = (date: number) => {
		const fullDate = new Date(
			currentMonth.getFullYear(),
			currentMonth.getMonth(),
			date
		);

		// Filter tasks by their deadline date
		return tasks.filter((task) => {
			const taskDate = new Date(task.deadlineDate);
			return (
				taskDate.getDate() === fullDate.getDate() &&
				taskDate.getMonth() === fullDate.getMonth() &&
				taskDate.getFullYear() === fullDate.getFullYear()
			);
		});
	};

	// Get priority color for task (now using completed status)
	const getPriorityColor = (task: BabyTask) => {
		return task.completed ? 'success.main' : 'warning.main';
	};

	// Generate calendar days
	const renderCalendarDays = () => {
		const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
		const days = daysInMonth(currentMonth);
		const firstDay = firstDayOfMonth(currentMonth);
		const rows = [];
		let cells = [];

		// Day names row
		rows.push(
			<TableRow key='header'>
				{dayNames.map((day) => (
					<TableCell key={day} align='center' sx={{ p: 1 }}>
						<Typography variant='body2' sx={{ fontWeight: 'medium' }}>
							{day}
						</Typography>
					</TableCell>
				))}
			</TableRow>
		);

		// Previous month days
		const prevMonthDays = firstDay;
		for (let i = 0; i < prevMonthDays; i++) {
			cells.push(
				<TableCell
					key={`prev-${i}`}
					align='center'
					sx={{ p: 1, color: 'text.disabled', bgcolor: 'background.default' }}
				>
					<Box
						sx={{
							height: 32,
							width: 32,
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							mx: 'auto',
							borderRadius: '50%',
						}}
					>
						{new Date(
							currentMonth.getFullYear(),
							currentMonth.getMonth(),
							0
						).getDate() -
							(prevMonthDays - i - 1)}
					</Box>
				</TableCell>
			);
		}

		// Current month days
		for (let day = 1; day <= days; day++) {
			const isToday =
				new Date().getDate() === day &&
				new Date().getMonth() === currentMonth.getMonth() &&
				new Date().getFullYear() === currentMonth.getFullYear();

			const tasksForDay = getTasksForDate(day);

			cells.push(
				<TableCell
					key={`day-${day}`}
					align='center'
					sx={{
						p: 1,
						position: 'relative',
						bgcolor: 'rgba(255, 253, 231, 0.2)',
						'&:hover': {
							bgcolor: 'rgba(255, 253, 231, 0.5)',
						},
					}}
				>
					<Box
						sx={{
							height: 32,
							width: 32,
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							borderRadius: '50%',
							bgcolor: isToday ? 'primary.light' : 'transparent',
							fontWeight: isToday ? 'bold' : 'regular',
							mx: 'auto',
						}}
					>
						{day}
					</Box>
					<Box
						sx={{
							mt: 0.5,
							display: 'flex',
							justifyContent: 'center',
							gap: 0.5,
						}}
					>
						{tasksForDay.slice(0, 2).map((task, index) => (
							<CircleIcon
								key={`task-${day}-${index}`}
								sx={{
									fontSize: 8,
									color: getPriorityColor(task),
								}}
							/>
						))}
					</Box>
				</TableCell>
			);

			if ((firstDay + day) % 7 === 0 || day === days) {
				// Fill in the rest of the row with next month days if needed
				if (day === days && (firstDay + day) % 7 !== 0) {
					const nextMonthDays = 7 - ((firstDay + day) % 7);
					for (let i = 1; i <= nextMonthDays; i++) {
						cells.push(
							<TableCell
								key={`next-${i}`}
								align='center'
								sx={{
									p: 1,
									color: 'text.disabled',
									bgcolor: 'background.default',
								}}
							>
								<Box
									sx={{
										height: 32,
										width: 32,
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										mx: 'auto',
										borderRadius: '50%',
									}}
								>
									{i}
								</Box>
							</TableCell>
						);
					}
				}

				rows.push(<TableRow key={day}>{cells}</TableRow>);
				cells = [];
			}
		}

		return <TableBody>{rows}</TableBody>;
	};

	return (
		<Box sx={layout.page}>
			<NavBar userInitials={getInitials()} />
			<Box sx={{ ...layout.container, py: 4 }}>
				{/* Welcome header */}
				<Box sx={{ mb: 4 }}>
					<Typography variant='h4' component='h1' fontWeight='bold'>
						Bienvenido, {user ? user.firstName : '{firstName}'}!
					</Typography>
					<Typography variant='body1' color='text.secondary'>
						{capitalizedDate}
					</Typography>
				</Box>

				{isLoading ? (
					<Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
						<CircularProgress />
					</Box>
				) : (
					<Grid container spacing={4}>
						{/* Left Column - Babies and Calendar */}
						<Grid size={{ xs: 12, md: 8 }}>
							{/* Babies Section */}
							<Box sx={{ mb: 4 }}>
								<Box
									sx={{
										display: 'flex',
										justifyContent: 'space-between',
										alignItems: 'center',
										mb: 2,
									}}
								>
									<Typography variant='h6' fontWeight='bold'>
										{' '}
										Tus bebés ({babies.length}){' '}
									</Typography>
									<Button
										variant='text'
										onClick={handleViewAllBabies}
										sx={{
											color: 'text.secondary',
											textTransform: 'none',
											fontWeight: 'regular',
										}}
									>
										View All
									</Button>
								</Box>

								<Grid container spacing={2}>
									{babies.slice(0, 2).map((baby) => (
										<Grid size={{ xs: 12, sm: 6, md: 6 }} key={baby._id}>
											<Card
												sx={{
													borderRadius: 3,
													overflow: 'hidden',
													cursor: 'pointer',
													bgcolor:
														baby.gender === 'MALE'
															? 'rgba(167, 226, 255, 0.3)'
															: 'rgba(248, 164, 187, 0.3)',
													'&:hover': {
														boxShadow: 3,
													},
												}}
												onClick={() => handleNavigateToBaby(baby._id)}
											>
												<CardContent>
													<Box
														sx={{
															display: 'flex',
															flexDirection: 'column',
															alignItems: 'center',
															mb: 2,
														}}
													>
														<Avatar
															sx={{
																width: 80,
																height: 80,
																mb: 1,
																bgcolor: 'rgba(255, 255, 255, 0.9)',
															}}
														>
															<Typography
																variant='h5'
																component='span'
																sx={{ color: '#555' }}
															>
																☺
															</Typography>
														</Avatar>
														<Typography variant='h6' fontWeight='bold'>
															{baby.name || '-'}
														</Typography>
														<Typography variant='body2' color='text.secondary'>
															{baby.age || '-'}
														</Typography>
													</Box>

													<Box
														sx={{
															display: 'flex',
															justifyContent: 'space-around',
															mt: 2,
														}}
													>
														<Box sx={{ textAlign: 'center' }}>
															<Avatar
																sx={{
																	bgcolor: 'success.light',
																	width: 32,
																	height: 32,
																	mx: 'auto',
																	mb: 0.5,
																}}
															>
																<CircleIcon
																	sx={{ color: 'success.main', fontSize: 14 }}
																/>
															</Avatar>
															<Typography variant='caption' display='block'>
																10 ago
															</Typography>
														</Box>
														<Box sx={{ textAlign: 'center' }}>
															<Avatar
																sx={{
																	bgcolor: 'warning.light',
																	width: 32,
																	height: 32,
																	mx: 'auto',
																	mb: 0.5,
																}}
															>
																<CircleIcon
																	sx={{ color: 'warning.main', fontSize: 14 }}
																/>
															</Avatar>
															<Typography variant='caption' display='block'>
																2h ago
															</Typography>
														</Box>
														<Box sx={{ textAlign: 'center' }}>
															<Avatar
																sx={{
																	bgcolor: 'info.light',
																	width: 32,
																	height: 32,
																	mx: 'auto',
																	mb: 0.5,
																}}
															>
																<CircleIcon
																	sx={{ color: 'info.main', fontSize: 14 }}
																/>
															</Avatar>
															<Typography variant='caption' display='block'>
																4h ago
															</Typography>
														</Box>
													</Box>
												</CardContent>
											</Card>
										</Grid>
									))}
								</Grid>
							</Box>

							{/* Calendar Section */}
							<Paper sx={{ p: 3, borderRadius: 3, mb: 4 }}>
								<Box
									sx={{
										display: 'flex',
										justifyContent: 'space-between',
										alignItems: 'center',
										mb: 3,
									}}
								>
									<Typography variant='h6' fontWeight='bold'>
										{capitalizedMonthYear}
									</Typography>
									<Box>
										<IconButton size='small' onClick={prevMonth}>
											<ArrowBackIcon fontSize='small' />
										</IconButton>
										<IconButton size='small' onClick={nextMonth}>
											<ArrowForwardIcon fontSize='small' />
										</IconButton>
									</Box>
								</Box>

								<TableContainer>
									<Table aria-label='calendar'>{renderCalendarDays()}</Table>
								</TableContainer>
							</Paper>
						</Grid>

						{/* Right Column - Upcoming Tasks */}
						<Grid size={{ xs: 12, md: 4 }}>
							<Paper
								sx={{
									p: 3,
									borderRadius: 3,
									height: '100%',
									position: 'relative',
									overflow: 'hidden',
								}}
							>
								<Box
									sx={{
										display: 'flex',
										justifyContent: 'space-between',
										alignItems: 'center',
										mb: 3,
									}}
								>
									<Typography variant='h6' fontWeight='bold'>
										Tareas Próximas
									</Typography>
								</Box>

								{tasksLoading ? (
									<Box
										sx={{ display: 'flex', justifyContent: 'center', py: 4 }}
									>
										<CircularProgress size={24} />
									</Box>
								) : (
									<Box sx={{ mb: 2 }}>
										{tasks.length === 0 ? (
											<Typography
												variant='body1'
												color='text.secondary'
												align='center'
											>
												No hay tareas pendientes
											</Typography>
										) : (
											tasks.slice(0, 4).map((task) => (
												<Box
													key={task._id}
													sx={{
														py: 2,
														borderBottom: '1px solid',
														borderColor: 'divider',
														'&:last-child': { borderBottom: 'none' },
													}}
												>
													<Typography variant='subtitle2' fontWeight='medium'>
														{task.title}
													</Typography>
													<Box
														sx={{
															display: 'flex',
															alignItems: 'center',
															mt: 0.5,
														}}
													>
														<CircleIcon
															sx={{
																fontSize: 8,
																mr: 1,
																color: task.completed
																	? 'success.main'
																	: 'warning.main',
															}}
														/>
														<Typography
															variant='caption'
															color='text.secondary'
														>
															{new Date(task.deadlineDate).toLocaleDateString(
																'es-ES',
																{
																	day: 'numeric',
																	month: 'short',
																}
															)}
														</Typography>
													</Box>
												</Box>
											))
										)}
									</Box>
								)}
							</Paper>
						</Grid>
					</Grid>
				)}
			</Box>
		</Box>
	);
}
