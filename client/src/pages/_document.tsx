import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head></Head>

        <body className="min-h-screen bg-white text-gray-700 font-serif">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
