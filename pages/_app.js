import '../styles/globals.css'
import {layouts} from '../layouts'

function MyApp({ Component, pageProps }) {
  const Layout = layouts['DefaultLayout'];
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
