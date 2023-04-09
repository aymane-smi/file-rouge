import { ApolloProvider } from '@apollo/client'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import client from '../lib/apollo'

export default function App({ Component, pageProps }: AppProps) {
  return <ApolloProvider client={client}>
    <Component {...pageProps} />
  </ApolloProvider>
}
