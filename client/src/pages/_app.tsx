import { config } from '@fortawesome/fontawesome-svg-core'
import type { AppProps } from 'next/app'

import '@/styles/reset.scss'
import '@/styles/globals.scss'
import '@fortawesome/fontawesome-svg-core/styles.css'

import { inter } from '@/styles/fonts'

config.autoAddCss = false

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </>
  )
}
