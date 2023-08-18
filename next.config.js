/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    async redirects() {
        return [
			{
				source: '/tutorial',
				destination: '/proximamente',
				permanent: false
			}
        ];
    },
};
