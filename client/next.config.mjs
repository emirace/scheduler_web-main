import path from 'path'
import { fileURLToPath } from 'url'

/** @type {import('next').NextConfig} */
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const nextConfig = {
  sassOptions: {
    additionalData: `
      @import "@/styles/utils/mixins.scss";
      @import "@/styles/utils/variables.scss";
    `,
    includePaths: [path.join(__dirname, 'src/styles')],
  },
  reactStrictMode: false,
}

export default nextConfig
