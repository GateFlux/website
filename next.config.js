/** @type {import('next').NextConfig} */
const nextConfig = {
	distDir: 'build',
	output: 'export',
	experimental: {
		optimizePackageImports: ['lucide-react'],
	},
}

module.exports = nextConfig
