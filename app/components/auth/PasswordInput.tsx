'use client';

import React, { useState } from 'react';
import {
	TextField,
	InputAdornment,
	IconButton,
	SxProps,
	Theme,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

interface PasswordInputProps {
	label: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	error?: boolean;
	helperText?: string;
	placeholder?: string;
	required?: boolean;
	id?: string;
	name?: string;
	sx?: SxProps<Theme>;
	onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export default function PasswordInput({
	label,
	value,
	onChange,
	error = false,
	helperText,
	placeholder,
	required = false,
	id,
	name,
	sx,
	onBlur,
}: PasswordInputProps) {
	const [showPassword, setShowPassword] = useState(false);

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	};

	return (
		<TextField
			id={id}
			name={name}
			label={label}
			type={showPassword ? 'text' : 'password'}
			value={value}
			onChange={onChange}
			onBlur={onBlur}
			error={error}
			helperText={helperText}
			placeholder={placeholder}
			required={required}
			fullWidth
			variant='outlined'
			sx={{ ...sx }}
			InputProps={{
				endAdornment: (
					<InputAdornment position='end'>
						<IconButton
							aria-label='toggle password visibility'
							onClick={handleClickShowPassword}
							edge='end'
							size='small'
						>
							{showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
						</IconButton>
					</InputAdornment>
				),
			}}
		/>
	);
}
