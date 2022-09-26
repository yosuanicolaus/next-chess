import "../styles/globals.css";
import type { AppType } from "next/dist/shared/lib/utils";
import { AuthProvider } from "../lib/contexts/auth";
import Head from "next/head";
import { Footer } from "../components/common/Footer";
import { Navbar } from "../components/common/Navbar";
import { Background } from "../components/common/Background";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>LogiChess</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Background />
      <Wrapper>
        <AuthProvider>
          <Navbar />
          <Component {...pageProps} />
          <Footer />
        </AuthProvider>
      </Wrapper>
    </>
  );
};

export default MyApp;

function Wrapper({ children }: { children: JSX.Element }) {
  return (
    <div className="flex min-h-screen flex-col dark:text-neutral-100">
      {children}
    </div>
  );
}
