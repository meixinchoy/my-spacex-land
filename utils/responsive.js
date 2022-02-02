import MediaQuery from 'react-responsive'

export const Desktop = ({ children }) => (
    <MediaQuery minDeviceWidth={769}>
        {children}
    </MediaQuery>
)

export const Mobile = ({ children }) => (
    <MediaQuery maxDeviceWidth={768}>
        {children}
    </MediaQuery>
)