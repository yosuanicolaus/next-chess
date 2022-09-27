import "../styles/globals.css";
import type { AppType } from "next/dist/shared/lib/utils";
import { AuthProvider } from "../lib/contexts/auth";
import Head from "next/head";
import { Footer } from "../components/common/Footer";
import { Navbar } from "../components/common/Navbar";
import { Background } from "../components/common/Background";
import { DarkThemeProvider, useDarkTheme } from "../lib/contexts/dark-theme";
import { PropsWithChildren } from "react";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>LogiChess</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <DarkThemeProvider>
        <Wrapper>
          <Component {...pageProps} />
        </Wrapper>
      </DarkThemeProvider>
    </>
  );
};

export default MyApp;

function Wrapper({ children }: PropsWithChildren) {
  const { theme } = useDarkTheme();
  return (
    <main className={theme}>
      <Background />
      <div className="flex min-h-screen flex-col dark:text-neutral-100">
        <AuthProvider>
          <Navbar />
          <>{children}</>
          <Footer />
        </AuthProvider>
      </div>
    </main>
  );
}
