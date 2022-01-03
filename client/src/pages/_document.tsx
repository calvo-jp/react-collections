import Document, { Head, Html, Main, NextScript } from 'next/document';

class Document_ extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="shortcut icon" href="#" type="image/x-icon" />
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
