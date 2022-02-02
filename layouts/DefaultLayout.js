import Layout from "antd/lib/layout/layout"
import Footer from "../common/footer"

const DefaultLayout = ({ children }) => {
    return (
        <div style={{ minHeight: '100vh' }}>
            <Layout>
                {children}
                
            </Layout>
            <Footer />
        </div>
    )
}

export default DefaultLayout;