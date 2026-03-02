/** @type {import('next').NextConfig} */
const nextConfig = {
	distDir: 'build',
	output: 'export',
	trailingSlash: true,
	experimental: {
		optimizePackageImports: ['lucide-react'],
	},
}

module.exports = nextConfig
