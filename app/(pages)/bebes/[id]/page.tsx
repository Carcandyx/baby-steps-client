'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import {
	Box,
	Typography,
	Tabs,
	Tab,
	Button,
	Avatar,
	CircularProgress,
	Chip,
	Grid,
	Alert,
	TextField,
	MenuItem,
	Select,
	FormControl,
	Checkbox,
	Paper,
} from '@mui/material';
import { layout } from '@/app/styles';
import NavBar from '@/app/components/appNavBar';
import { authService } from '@/app/services/api/authService';
import {
	babyService,
	ExtendedBaby,
	BabyTask,
	CreateTaskPayload,
	UpdateTaskCompletionPayload,
} from '@/app/services/api/babyService';
import {
	Edit as EditIcon,
	ChildCareRounded,
	Add as AddIcon,
	Search as SearchIcon,
} from '@mui/icons-material';
import TaskModal, { TaskFormValues } from '@/app/components/taskModal';

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`baby-tabpanel-${index}`}
			aria-labelledby={`baby-tab-${index}`}
			{...other}
		>
			{value === index && <Box sx={{ py: 3 }}>{children}</Box>}
		</div>
	);
}

function a11yProps(index: number) {
	return {
		id: `baby-tab-${index}`,
		'aria-controls': `baby-tabpanel-${index}`,
	};
}

export default function BabyDetailsPage() {
	const params = useParams();
	const babyId = params.id as string;
	const [user] = useState(authService.getCurrentUser());
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [baby, setBaby] = useState<ExtendedBaby | null>(null);
	const [tabValue, setTabValue] = useState(0);

	// Tareas state
	const [taskFilter, setTaskFilter] = useState('all');
	const [searchTerm, setSearchTerm] = useState('');
	const [tasks, setTasks] = useState<BabyTask[]>([]);
	const [tasksLoading, setTasksLoading] = useState(false);
	const [tasksError, setTasksError] = useState<string | null>(null);
	const [taskModalOpen, setTaskModalOpen] = useState(false);
	const [isAddingTask, setIsAddingTask] = useState(false);
	const [updatingTaskIds, setUpdatingTaskIds] = useState<string[]>([]);

	const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
		setTabValue(newValue);

		// Fetch tasks data when clicking on the Tasks tab
		if (newValue === 1 && tasks.length === 0 && babyId) {
			fetchBabyTasks();
		}
	};

	const handleOpenTaskModal = () => {
		setTaskModalOpen(true);
	};

	const handleCloseTaskModal = () => {
		setTaskModalOpen(false);
	};

	const handleAddTask = async (taskData: TaskFormValues) => {
		try {
			setIsAddingTask(true);

			// Create the payload
			const payload: CreateTaskPayload = {
				title: taskData.title,
				description: taskData.description || '',
				babyId: babyId,
				deadlineDate: taskData.deadlineDate || new Date(),
			};

			// Call the API
			const newTask = await babyService.createTask(payload);

			// Update the task list with the new task
			setTasks((prevTasks) => [...prevTasks, newTask]);

			// Close modal
			handleCloseTaskModal();
		} catch (error) {
			console.error('Error creating task:', error);
			// Could show an error message here
		} finally {
			setIsAddingTask(false);
		}
	};

	const handleTaskCompletionChange = async (
		taskId: string,
		currentStatus: boolean
	) => {
		try {
			// Add task ID to updating array to show loading state
			setUpdatingTaskIds((prev) => [...prev, taskId]);

			// Create payload for API
			const payload: UpdateTaskCompletionPayload = {
				completed: !currentStatus, // Toggle status
				babyId: babyId,
			};

			// Call API to update task
			const updatedTask = await babyService.updateTaskCompletion(
				taskId,
				payload
			);

			// Update local state
			setTasks((prevTasks) =>
				prevTasks.map((task) => (task._id === taskId ? updatedTask : task))
			);
		} catch (error) {
			console.error('Error updating task completion status:', error);
			// Here you could add a notification to show the error
		} finally {
			// Remove task from updating array
			setUpdatingTaskIds((prev) => prev.filter((id) => id !== taskId));
		}
	};

	// Fetch tasks for the baby
	const fetchBabyTasks = async () => {
		try {
			setTasksLoading(true);
			setTasksError(null);

			const tasksData = await babyService.getBabyTasks(babyId);
			setTasks(tasksData);
		} catch (error) {
			console.error('Error fetching baby tasks:', error);
			setTasksError('Error al cargar las tareas del bebé');
		} finally {
			setTasksLoading(false);
		}
	};

	const fetchBabyDetails = async () => {
		try {
			setLoading(true);
			setError(null);

			// Use the getBabyById method to fetch baby details
			const foundBaby = await babyService.getBabyById(babyId);
			setBaby(foundBaby);
		} catch (error) {
			console.error('Error fetching baby details:', error);
			setError('Error al cargar los detalles del bebé');
		} finally {
			setLoading(false);
		}
	};

	// Get user initials for the avatar
	const getInitials = () => {
		if (!user) return 'XX';
		return `${user.firstName?.charAt(0) || ''}${
			user.lastName?.charAt(0) || ''
		}`;
	};

	useEffect(() => {
		fetchBabyDetails();
	}, [babyId]);

	// Filtrar tareas según los criterios
	const filteredTasks = tasks
		.filter((task) => {
			if (taskFilter === 'completed') return task.completed;
			if (taskFilter === 'pending') return !task.completed;
			return true; // 'all'
		})
		.filter((task) => {
			if (!searchTerm) return true;
			return (
				task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
				task.description?.toLowerCase().includes(searchTerm.toLowerCase())
			);
		});

	if (loading) {
		return (
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					minHeight: '100vh',
				}}
			>
				<CircularProgress />
			</Box>
		);
	}

	if (error || !baby) {
		return (
			<Box sx={layout.page}>
				<NavBar userInitials={getInitials()} />
				<Box sx={{ ...layout.container, py: 4 }}>
					<Alert severity='error'>
						{error || 'No se pudo cargar la información del bebé'}
					</Alert>
				</Box>
			</Box>
		);
	}

	// Calculate age in months for display
	const calculateAgeForDisplay = () => {
		if (!baby.birthDate) return '';
		let birthDate = baby.birthDate;
		if (typeof birthDate === 'string') {
			birthDate = new Date(birthDate);
		}

		const now = new Date();
		const monthDiff =
			now.getMonth() -
			birthDate.getMonth() +
			12 * (now.getFullYear() - birthDate.getFullYear());

		return `${monthDiff} ${monthDiff === 1 ? 'mes' : 'meses'}`;
	};

	// Format birthdate for display
	const formatBirthdate = () => {
		if (!baby.birthDate) return '';
		let birthDate = baby.birthDate;
		if (typeof birthDate === 'string') {
			birthDate = new Date(birthDate);
		}

		return birthDate.toLocaleDateString('es-ES', {
			day: 'numeric',
			month: 'long',
			year: 'numeric',
		});
	};

	const gender = baby.gender === 'MALE' ? 'Masculino' : 'Femenino';

	return (
		<Box sx={layout.page}>
			<NavBar userInitials={getInitials()} />
			<Box sx={{ ...layout.container, py: 4 }}>
				{/* Baby Header Section */}
				<Box sx={{ mb: 4, position: 'relative' }}>
					<Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
						<Avatar
							sx={{
								bgcolor: 'primary.light',
								width: 100,
								height: 100,
								mr: 3,
							}}
						>
							<ChildCareRounded sx={{ color: 'primary.main', fontSize: 70 }} />
						</Avatar>
						<Box>
							<Typography variant='h4' component='h1' fontWeight='bold'>
								{baby.name}
							</Typography>
							<Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
								<Chip
									label={calculateAgeForDisplay()}
									size='small'
									color='primary'
									sx={{ mr: 1, borderRadius: 3 }}
								/>
								<Typography variant='body1' color='text.secondary'>
									Nacido el {formatBirthdate()} • {baby.weight || '?'} •{' '}
									{gender}
								</Typography>
							</Box>
						</Box>
						<Button
							variant='outlined'
							startIcon={<EditIcon />}
							sx={{
								ml: 'auto',
								borderRadius: 30,
								px: 2,
							}}
						>
							Editar Perfil
						</Button>
					</Box>
				</Box>

				{/* Tabs Section */}
				<Box
					sx={{ width: '100%', mb: 3, borderBottom: 1, borderColor: 'divider' }}
				>
					<Tabs
						value={tabValue}
						onChange={handleTabChange}
						aria-label='baby information tabs'
						sx={{
							'& .MuiTab-root': {
								textTransform: 'none',
								fontSize: '1rem',
								fontWeight: 'medium',
								mr: 3,
								p: 0,
								minWidth: 'unset',
							},
							'& .Mui-selected': {
								color: 'primary.main',
								fontWeight: 'bold',
							},
							'& .MuiTabs-indicator': {
								height: 3,
								borderRadius: 1.5,
							},
						}}
					>
						<Tab label='General' {...a11yProps(0)} />
						<Tab label='Tareas' {...a11yProps(1)} />
						<Tab
							label={
								<Box sx={{ display: 'flex', alignItems: 'center' }}>
									Crecimiento
									<Chip
										label='Próximamente'
										size='small'
										sx={{ ml: 1, height: 20, fontSize: '0.7rem' }}
									/>
								</Box>
							}
							{...a11yProps(2)}
							disabled
						/>
						<Tab
							label={
								<Box sx={{ display: 'flex', alignItems: 'center' }}>
									Salud
									<Chip
										label='Próximamente'
										size='small'
										sx={{ ml: 1, height: 20, fontSize: '0.7rem' }}
									/>
								</Box>
							}
							{...a11yProps(3)}
							disabled
						/>
						<Tab
							label={
								<Box sx={{ display: 'flex', alignItems: 'center' }}>
									Fotos
									<Chip
										label='Próximamente'
										size='small'
										sx={{ ml: 1, height: 20, fontSize: '0.7rem' }}
									/>
								</Box>
							}
							{...a11yProps(4)}
							disabled
						/>
					</Tabs>
				</Box>

				{/* Tab Panels */}
				<TabPanel value={tabValue} index={0}>
					<Typography variant='h6' fontWeight='medium' sx={{ mb: 2 }}>
						Actividades Recientes
					</Typography>
					<Grid container spacing={3}>
						<Grid size={{ xs: 12, md: 6, lg: 4 }}>
							<Box
								sx={{
									p: 2,
									border: '1px solid',
									borderColor: 'divider',
									borderRadius: 2,
								}}
							>
								<Typography variant='subtitle1' fontWeight='bold'>
									Última Alimentación
								</Typography>
								<Typography variant='body2' color='text.secondary'>
									{baby.activities?.feeding
										? new Date(baby.activities.feeding).toLocaleString(
												'es-ES',
												{
													hour: 'numeric',
													minute: 'numeric',
													day: 'numeric',
													month: 'short',
												}
										  )
										: 'Sin registrar'}
								</Typography>
							</Box>
						</Grid>
						<Grid size={{ xs: 12, md: 6, lg: 4 }}>
							<Box
								sx={{
									p: 2,
									border: '1px solid',
									borderColor: 'divider',
									borderRadius: 2,
								}}
							>
								<Typography variant='subtitle1' fontWeight='bold'>
									Último Cambio de Pañal
								</Typography>
								<Typography variant='body2' color='text.secondary'>
									{baby.activities?.diaper
										? new Date(baby.activities.diaper).toLocaleString('es-ES', {
												hour: 'numeric',
												minute: 'numeric',
												day: 'numeric',
												month: 'short',
										  })
										: 'Sin registrar'}
								</Typography>
							</Box>
						</Grid>
						<Grid size={{ xs: 12, md: 6, lg: 4 }}>
							<Box
								sx={{
									p: 2,
									border: '1px solid',
									borderColor: 'divider',
									borderRadius: 2,
								}}
							>
								<Typography variant='subtitle1' fontWeight='bold'>
									Último Sueño
								</Typography>
								<Typography variant='body2' color='text.secondary'>
									{baby.activities?.sleep
										? new Date(baby.activities.sleep).toLocaleString('es-ES', {
												hour: 'numeric',
												minute: 'numeric',
												day: 'numeric',
												month: 'short',
										  })
										: 'Sin registrar'}
								</Typography>
							</Box>
						</Grid>
					</Grid>
				</TabPanel>

				<TabPanel value={tabValue} index={1}>
					<Box>
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'flex-start',
								mb: 3,
							}}
						>
							<Box>
								<Typography variant='h6' sx={{ fontWeight: 'bold', mb: 1 }}>
									Tareas
								</Typography>
								<Typography variant='body2' color='text.secondary'>
									Lleva un registro de tareas importantes para {baby.name}
								</Typography>
							</Box>
							<Button
								variant='contained'
								startIcon={<AddIcon />}
								onClick={handleOpenTaskModal}
								sx={{
									borderRadius: 28,
									px: 2,
									py: 1,
									bgcolor: 'primary.light',
									color: 'primary.dark',
									'&:hover': { bgcolor: 'primary.main', color: 'white' },
								}}
							>
								Añadir Tarea
							</Button>
						</Box>

						<Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
							<FormControl
								variant='outlined'
								size='small'
								sx={{
									minWidth: 120,
									bgcolor: 'background.paper',
									borderRadius: 30,
									'& .MuiOutlinedInput-root': {
										borderRadius: 30,
									},
								}}
							>
								<Select
									value={taskFilter}
									onChange={(e) => setTaskFilter(e.target.value)}
									displayEmpty
									inputProps={{ 'aria-label': 'Filtrar tareas' }}
								>
									<MenuItem value='all'>Todas las tareas</MenuItem>
									<MenuItem value='completed'>Completadas</MenuItem>
									<MenuItem value='pending'>Pendientes</MenuItem>
								</Select>
							</FormControl>

							<TextField
								placeholder='Buscar tareas...'
								variant='outlined'
								size='small'
								fullWidth
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								InputProps={{
									startAdornment: <SearchIcon color='action' sx={{ mr: 1 }} />,
									sx: {
										borderRadius: 30,
										bgcolor: 'background.paper',
									},
								}}
							/>
						</Box>

						{tasksLoading ? (
							<Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
								<CircularProgress />
							</Box>
						) : tasksError ? (
							<Alert severity='error' sx={{ mt: 2 }}>
								{tasksError}
							</Alert>
						) : (
							<Paper elevation={0} sx={{ bgcolor: 'background.default' }}>
								{filteredTasks.map((task, index) => (
									<Box
										key={task._id || index}
										sx={{
											p: 2,
											borderBottom: '1px solid',
											borderColor: 'divider',
											display: 'flex',
											alignItems: 'center',
											gap: 2,
											bgcolor: task.completed ? 'rgba(0,0,0,0.03)' : 'white',
											'&:hover': {
												bgcolor: 'rgba(0,0,0,0.02)',
											},
										}}
									>
										<Checkbox
											checked={task.completed}
											onChange={() =>
												handleTaskCompletionChange(task._id, task.completed)
											}
											disabled={updatingTaskIds.includes(task._id)}
											sx={{
												color: 'primary.main',
											}}
										/>

										<Box sx={{ flexGrow: 1 }}>
											<Typography
												variant='subtitle1'
												sx={{
													fontWeight: 'medium',
													textDecoration: task.completed
														? 'line-through'
														: 'none',
													color: task.completed
														? 'text.disabled'
														: 'text.primary',
												}}
											>
												{task.title}
											</Typography>

											{task.description && (
												<Typography
													variant='body2'
													color='text.secondary'
													sx={{
														textDecoration: task.completed
															? 'line-through'
															: 'none',
														opacity: task.completed ? 0.7 : 1,
													}}
												>
													{task.description}
												</Typography>
											)}

											<Box
												sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}
											>
												<Typography
													variant='caption'
													color='text.secondary'
													sx={{ display: 'flex', alignItems: 'center' }}
												>
													{new Date(task.deadlineDate).toLocaleDateString(
														'es-ES',
														{
															day: 'numeric',
															month: 'short',
															year: 'numeric',
														}
													)}
												</Typography>

												<Chip
													size='small'
													label={task.completed ? 'Completada' : 'Pendiente'}
													sx={{
														ml: 2,
														height: 20,
														fontSize: '0.7rem',
														bgcolor: task.completed
															? 'success.light'
															: 'warning.light',
														color: task.completed
															? 'success.dark'
															: 'warning.dark',
													}}
												/>
											</Box>
										</Box>
									</Box>
								))}

								{filteredTasks.length === 0 && (
									<Box sx={{ p: 4, textAlign: 'center' }}>
										<Typography color='text.secondary'>
											{tasks.length === 0
												? 'No hay tareas. Añade una nueva tarea usando el botón arriba.'
												: 'No se encontraron tareas con los filtros seleccionados.'}
										</Typography>
									</Box>
								)}
							</Paper>
						)}
					</Box>
				</TabPanel>

				<TabPanel value={tabValue} index={2}>
					<Box>
						<Typography variant='h6' sx={{ mb: 2, fontWeight: 'medium' }}>
							Crecimiento
						</Typography>
						<Typography variant='body1' paragraph>
							Seguimiento de altura, peso y otras medidas de crecimiento de{' '}
							{baby.name}.
						</Typography>

						<Grid container spacing={3} sx={{ mt: 2 }}>
							<Grid size={{ xs: 12, md: 6 }}>
								<Box
									sx={{
										p: 3,
										border: '1px solid',
										borderColor: 'divider',
										borderRadius: 2,
									}}
								>
									<Typography variant='subtitle1' fontWeight='bold'>
										Peso Actual
									</Typography>
									<Typography variant='h5' color='primary.main' sx={{ my: 2 }}>
										{baby.weight || 'No registrado'}
									</Typography>
								</Box>
							</Grid>
							<Grid size={{ xs: 12, md: 6 }}>
								<Box
									sx={{
										p: 3,
										border: '1px solid',
										borderColor: 'divider',
										borderRadius: 2,
									}}
								>
									<Typography variant='subtitle1' fontWeight='bold'>
										Altura Actual
									</Typography>
									<Typography variant='h5' color='primary.main' sx={{ my: 2 }}>
										{baby.height || 'No registrado'}
									</Typography>
								</Box>
							</Grid>
						</Grid>
					</Box>
				</TabPanel>

				<TabPanel value={tabValue} index={3}>
					<Box>
						<Typography variant='h6' sx={{ mb: 2, fontWeight: 'medium' }}>
							Salud
						</Typography>
						<Typography variant='body1' paragraph>
							Seguimiento de información de salud, vacunas y visitas médicas de{' '}
							{baby.name}.
						</Typography>

						<Alert severity='info' sx={{ mt: 3 }}>
							Aún no se han añadido registros de salud.
						</Alert>
					</Box>
				</TabPanel>

				<TabPanel value={tabValue} index={4}>
					<Box>
						<Typography variant='h6' sx={{ mb: 2, fontWeight: 'medium' }}>
							Fotos
						</Typography>
						<Typography variant='body1' paragraph>
							Captura y guarda momentos preciosos del crecimiento y desarrollo
							de {baby.name}.
						</Typography>

						<Alert severity='info' sx={{ mt: 3 }}>
							Aún no se han añadido fotos.
						</Alert>
					</Box>
				</TabPanel>
			</Box>

			{/* Task Modal */}
			<TaskModal
				open={taskModalOpen}
				onClose={handleCloseTaskModal}
				onSubmit={handleAddTask}
				isSubmitting={isAddingTask}
			/>
		</Box>
	);
}
