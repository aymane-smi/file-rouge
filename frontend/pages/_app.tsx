import { ApolloProvider } from '@apollo/client'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import client from '../lib/apollo'
import { CartProvider } from '../lib/context'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }: AppProps) {
  return <ApolloProvider client={client}>
    <CartProvider>
      <ToastContainer />
      <Component {...pageProps} />
    </CartProvider>
  </ApolloProvider>
}
