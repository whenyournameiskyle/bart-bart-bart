import Document, { Html, Head, Main, NextScript } from 'next/document'
import styled from '@emotion/styled'

class MyDocument extends Document {
  static async getInitialProps (ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }
  render () {
    return (
      <Html>
        <Head>
          <style jsx>{`
            :global(body) {
              background-color: #333;
              color: #ddd;
              height: 100%;
              margin: 0;
              text-align: center;
            }
          `}
          </style>
        </Head>
        <AppBody>
          <Main />
          <NextScript />
        </AppBody>
      </Html>
    )
  }
}


const AppBody = styled.div`
  color: #ddd;
  font-family: Helvetica, sans-serif;
  font-size: 1.5rem;
  height: 100%;
  margin: 0 auto;
  max-width: 50rem;
  text-align: center;

  @media(max-width: 768px) {
    font-size: 1.6rem;
  }

  @media(max-width: 368px) {
    font-size: 1.8rem;
  }
`

export default MyDocument
