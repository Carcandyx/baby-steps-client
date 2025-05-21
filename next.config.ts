import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	/* config options here */
	redirects: async () => {
		return [
			{
				source: '/',
				destination: '/theme-example',
				permanent: false,
			},
		];
	},
};

export default nextConfig;
