import '../common/styles/typography.scss'
import '../common/styles/common.scss'
import '../common/styles/main.scss'
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
