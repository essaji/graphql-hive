import 'regenerator-runtime/runtime';
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import { extractCritical } from '@emotion/server';
// don't remove this import ; it will break the built app ; but not the dev app :)
import '@/config/frontend-env';

export default class MyDocument extends Document<{
  ids: Array<string>;
  css: string;
  frontendEnv: typeof import('@/config/frontend-env')['env'];
}> {
  static async getInitialProps(ctx: DocumentContext) {
    const { env: frontendEnv } = await import('@/config/frontend-env');
    const initialProps = await Document.getInitialProps(ctx);
    const page = await ctx.renderPage();
    const styles = extractCritical(page.html);

    return {
      ...initialProps,
      ...page,
      ...styles,
      frontendEnv,
    };
  }

  render() {
    const { ids, css } = this.props;

    return (
      <Html className="dark">
        <Head>
          <style
            data-emotion-css={ids.join(' ')}
            dangerouslySetInnerHTML={{
              __html:
                css +
                // we setup background via style tag to prevent white flash on initial page loading
                `html {background: #0b0d11}`,
            }}
          />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap"
            rel="stylesheet"
          />
          <link rel="shortcut icon" href="/just-logo.svg" />
          <script
            id="force-dark-mode"
            dangerouslySetInnerHTML={{ __html: "localStorage['chakra-ui-color-mode'] = 'dark';" }}
          />
          <script
            type="module"
            dangerouslySetInnerHTML={{
              __html: `globalThis["__frontend_env"] = ${JSON.stringify(
                (this.props as any).frontendEnv,
              )}`,
            }}
          />
        </Head>
        <body className="bg-transparent font-sans text-white">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
