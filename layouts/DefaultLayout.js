//import Layout from "antd/lib/layout/layout"
import Footer from "../common/footer"

const DefaultLayout = ({ children }) => {
    return (
        <div>
            {children}
            <Footer />
        </div>
    )
}

export default DefaultLayout;