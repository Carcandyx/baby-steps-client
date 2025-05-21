'use client';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { es } from 'date-fns/locale';
import React from 'react';

export default function DatePickerProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
			{children}
		</LocalizationProvider>
	);
}
