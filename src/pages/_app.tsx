import "../styles/globals.css";
import type { AppType } from "next/dist/shared/lib/utils";
import { AuthProvider } from "../lib/contexts/auth";
import Head from "next/head";
import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>LogiChess</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Wrapper>
        <AuthProvider>
          <>
            <Navbar />
            <Component {...pageProps} />
            <Footer />
          </>
        </AuthProvider>
      </Wrapper>
    </>
  );
};

export default MyApp;

function Wrapper({ children }: { children: JSX.Element }) {
  return <div className="min-h-screen flex flex-col">{children}</div>;
}
