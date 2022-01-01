import Document, { Head, Html, Main, NextScript } from 'next/document';

class Document_ extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="shortcut icon" href="#" type="image/x-icon" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin=""
          />
          <link
            href="https://fonts.googleapis.com/css2?family=M+PLUS+Code+Latin:wght@300;400;700&display=swap"
            rel="stylesheet"
          />
        </Head>

        <body className="min-h-screen text-gray-700 bg-white font-sans">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document_;
