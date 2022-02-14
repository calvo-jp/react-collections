import Document, { Head, Html, Main, NextScript } from 'next/document';

class Document_ extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin=""
          />
          <link
            href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@100;200;300;400;500;600;700&display=swap"
            rel="stylesheet"
          />
        </Head>

        <body className="min-h-screen text-gray-700 bg-white font-sans scroll-smooth dark:bg-slate-900 dark:text-slate-200">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document_;
