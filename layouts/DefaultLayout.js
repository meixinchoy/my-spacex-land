//import Layout from "antd/lib/layout/layout"
import Footer from "../common/footer"
import Header from "../common/header"

const DefaultLayout = ({ children }) => {
    return (
        <div>
            <Header />
            {children}
            <Footer />
        </div>
    )
}

export default DefaultLayout;