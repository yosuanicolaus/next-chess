import "../styles/globals.css";
import type { AppType } from "next/dist/shared/lib/utils";
import { AuthProvider } from "../lib/contexts/auth";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
};

export default MyApp;
