import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              function sendHeight() {
                const height = document.body.scrollHeight;
                parent.postMessage(height, '*');
              }
              window.onload = sendHeight;
              window.onresize = sendHeight;
              `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
