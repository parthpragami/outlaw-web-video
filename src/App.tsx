import {type PropsWithChildren} from 'react'
import './App.css'
import { BrowserRouter as Router } from 'react-router-dom';
import meetingConfig from "./meetingConfig.ts";
import {GlobalStyles, LoggerProvider, NotificationProvider} from "amazon-chime-sdk-component-library-react";
import {AppStateProvider, useAppState} from "./providers/AppStateProvider.tsx";
import {ThemeProvider} from "styled-components";
import {demoDarkTheme, demoLightTheme} from "./theme/demoTheme.ts";
import Notifications from "./containers/Notifications.tsx";
import ErrorProvider from "./providers/ErrorProvider.tsx";
import MeetingProviderWrapper from "./containers/MeetingProviderWrapper";

console.log({
    "import.meta.env.API_URL": import.meta.env.VITE_API_URL,
    "import.meta.env.VITE_REACT_NATIVE_APP": import.meta.env.VITE_REACT_NATIVE_APP,
})
function App() {
  return (
    <>
        <Router>
            <LoggerProvider logger={meetingConfig.logger}>
                <AppStateProvider>
                    <Theme>
                        <NotificationProvider>
                            <Notifications />
                            <ErrorProvider>
                                <MeetingProviderWrapper />
                            </ErrorProvider>
                        </NotificationProvider>
                    </Theme>
                </AppStateProvider>
            </LoggerProvider>
        </Router>
        </>
  )
}


const Theme: React.FC<PropsWithChildren> = ({ children }) => {
    const { theme } = useAppState();

    return (
        <ThemeProvider theme={theme === 'light' ? demoLightTheme : demoDarkTheme}>
            <GlobalStyles />
            {children}
        </ThemeProvider>
    );
};

export default App
