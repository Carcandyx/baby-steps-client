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
	FormControl,
	FormControlLabel,
	RadioGroup,
	Radio,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

interface AddBabyModalProps {
	open: boolean;
	onClose: () => void;
	onSubmit: (babyData: BabyFormValues) => void;
	isSubmitting?: boolean;
}

export interface BabyFormValues {
	name: string;
	birthDate: Date | null;
	gender: 'boy' | 'girl';
	weight: string;
}

const validationSchema = Yup.object({
	name: Yup.string().required('El nombre es requerido'),
	birthDate: Yup.date()
		.nullable()
		.required('La fecha de nacimiento es requerida'),
	gender: Yup.string()
		.oneOf(['boy', 'girl'])
		.required('El género es requerido'),
	weight: Yup.number()
		.positive('El peso debe ser mayor que 0')
		.nullable()
		.transform((value) => (isNaN(value) ? null : value)),
});

const AddBabyModal: React.FC<AddBabyModalProps> = ({
	open,
	onClose,
	onSubmit,
	isSubmitting = false,
}) => {
	const formik = useFormik<BabyFormValues>({
		initialValues: {
			name: '',
			birthDate: null,
			gender: 'boy',
			weight: '',
		},
		validationSchema,
		onSubmit: (values) => {
			// No API call here, just pass values to parent
			onSubmit(values);
			formik.resetForm();
			onClose();
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
					Agregar Nuevo Bebé
				</DialogTitle>
			</Box>

			<form onSubmit={formik.handleSubmit}>
				<DialogContent sx={{ px: 3 }}>
					<Typography variant='h6' sx={{ mb: 2, fontWeight: 'medium' }}>
						Información Básica
					</Typography>

					<Box sx={{ mb: 3 }}>
						<Typography variant='body2' sx={{ mb: 1 }}>
							Nombre del Bebé
						</Typography>
						<TextField
							fullWidth
							id='name'
							name='name'
							placeholder='Ingresa el nombre del bebé'
							value={formik.values.name}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.name && Boolean(formik.errors.name)}
							helperText={formik.touched.name && formik.errors.name}
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
							Fecha de Nacimiento
						</Typography>
						<DatePicker
							value={formik.values.birthDate}
							onChange={(newValue) => {
								formik.setFieldValue('birthDate', newValue);
							}}
							format='dd/MM/yyyy'
							slotProps={{
								textField: {
									fullWidth: true,
									id: 'birthDate',
									name: 'birthDate',
									placeholder: 'DD/MM/AAAA',
									error:
										formik.touched.birthDate &&
										Boolean(formik.errors.birthDate),
									helperText:
										formik.touched.birthDate &&
										(formik.errors.birthDate as string),
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
							Género
						</Typography>
						<FormControl component='fieldset'>
							<RadioGroup
								row
								name='gender'
								value={formik.values.gender}
								onChange={formik.handleChange}
							>
								<FormControlLabel
									value='boy'
									control={<Radio color='primary' />}
									label='Niño'
								/>
								<FormControlLabel
									value='girl'
									control={<Radio color='primary' />}
									label='Niña'
								/>
							</RadioGroup>
						</FormControl>
					</Box>

					<Typography variant='h6' sx={{ mb: 2, mt: 3, fontWeight: 'medium' }}>
						Información Adicional
					</Typography>

					<Box sx={{ mb: 3 }}>
						<Typography variant='body2' sx={{ mb: 1 }}>
							Peso al Nacer (gramos)
						</Typography>
						<TextField
							fullWidth
							id='weight'
							name='weight'
							placeholder='Ingresa el peso en gramos'
							type='number'
							value={formik.values.weight}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.weight && Boolean(formik.errors.weight)}
							helperText={formik.touched.weight && formik.errors.weight}
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

export default AddBabyModal;
