'use client';
import React from 'react';
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	TextField,
	Button,
	Box,
	Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

interface TaskModalProps {
	open: boolean;
	onClose: () => void;
	onSubmit: (taskData: TaskFormValues) => void;
	isSubmitting?: boolean;
}

export interface TaskFormValues {
	title: string;
	description: string;
	deadlineDate: Date | null;
}

const validationSchema = Yup.object({
	title: Yup.string().required('El título es requerido'),
	description: Yup.string(),
	deadlineDate: Yup.date().nullable().required('La fecha límite es requerida'),
});

const TaskModal: React.FC<TaskModalProps> = ({
	open,
	onClose,
	onSubmit,
	isSubmitting = false,
}) => {
	const formik = useFormik<TaskFormValues>({
		initialValues: {
			title: '',
			description: '',
			deadlineDate: new Date(), // Default to today
		},
		validationSchema,
		onSubmit: (values) => {
			onSubmit(values);
			formik.resetForm();
		},
	});

	const handleClose = () => {
		formik.resetForm();
		onClose();
	};

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			maxWidth='sm'
			fullWidth
			PaperProps={{
				sx: {
					borderRadius: 4,
					p: 1,
				},
			}}
		>
			<Box
				sx={{
					bgcolor: 'primary.light',
					p: 2,
					mb: 2,
					borderRadius: '16px 16px 0 0',
				}}
			>
				<DialogTitle sx={{ p: 0, color: 'text.primary', fontWeight: 'bold' }}>
					Añadir Nueva Tarea
				</DialogTitle>
			</Box>

			<form onSubmit={formik.handleSubmit}>
				<DialogContent sx={{ px: 3 }}>
					<Box sx={{ mb: 3 }}>
						<Typography variant='body2' sx={{ mb: 1 }}>
							Título de la Tarea
						</Typography>
						<TextField
							fullWidth
							id='title'
							name='title'
							placeholder='Ingresa el título de la tarea'
							value={formik.values.title}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.title && Boolean(formik.errors.title)}
							helperText={formik.touched.title && formik.errors.title}
							sx={{
								bgcolor: 'rgba(255, 246, 217, 0.5)',
								'& .MuiOutlinedInput-root': {
									borderRadius: 2,
								},
							}}
						/>
					</Box>

					<Box sx={{ mb: 3 }}>
						<Typography variant='body2' sx={{ mb: 1 }}>
							Fecha Límite
						</Typography>
						<DatePicker
							value={formik.values.deadlineDate}
							onChange={(newValue) => {
								formik.setFieldValue('deadlineDate', newValue);
							}}
							format='dd/MM/yyyy'
							slotProps={{
								textField: {
									fullWidth: true,
									id: 'deadlineDate',
									name: 'deadlineDate',
									placeholder: 'DD/MM/AAAA',
									error:
										formik.touched.deadlineDate &&
										Boolean(formik.errors.deadlineDate),
									helperText:
										formik.touched.deadlineDate &&
										(formik.errors.deadlineDate as string),
									sx: {
										bgcolor: 'rgba(255, 246, 217, 0.5)',
										'& .MuiOutlinedInput-root': {
											borderRadius: 2,
										},
									},
								},
								popper: {
									sx: {
										zIndex: 1500,
									},
								},
							}}
						/>
					</Box>

					<Box sx={{ mb: 3 }}>
						<Typography variant='body2' sx={{ mb: 1 }}>
							Descripción (opcional)
						</Typography>
						<TextField
							fullWidth
							multiline
							rows={4}
							id='description'
							name='description'
							placeholder='Proporciona detalles sobre la tarea'
							value={formik.values.description}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={
								formik.touched.description && Boolean(formik.errors.description)
							}
							helperText={
								formik.touched.description && formik.errors.description
							}
							sx={{
								bgcolor: 'rgba(255, 246, 217, 0.5)',
								'& .MuiOutlinedInput-root': {
									borderRadius: 2,
								},
							}}
						/>
					</Box>
				</DialogContent>

				<DialogActions sx={{ px: 3, pb: 3, justifyContent: 'center', gap: 2 }}>
					<Button
						onClick={handleClose}
						variant='outlined'
						sx={{
							borderRadius: 30,
							px: 4,
							borderColor: 'rgba(0,0,0,0.2)',
							color: 'text.primary',
						}}
						disabled={isSubmitting}
					>
						Cancelar
					</Button>
					<Button
						type='submit'
						variant='contained'
						sx={{
							borderRadius: 30,
							px: 4,
							bgcolor: 'primary.main',
							color: 'white',
							position: 'relative',
						}}
						disabled={isSubmitting}
					>
						{isSubmitting ? 'Guardando...' : 'Guardar'}
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
};

export default TaskModal;
