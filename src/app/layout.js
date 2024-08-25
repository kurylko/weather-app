'use client';

import "./global.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import StoreProvider from "./../state/StoreProvider";
import { Manrope } from '@next/font/google';

const manrope = Manrope({
    subsets: ['latin'],
    weight: ['400', '500', '700'],
});


export default function RootLayout({children}) {
    return (
        <html lang="en">
        <head>
            <title>{'MD'}</title>
            <meta name="description" content={'MDD'}/>
            <link rel="icon" href="/favicon.ico" sizes="any"/>
        </head>
        <body className={manrope.className}>
       <StoreProvider>
        <Header/>
        <main>{children}</main>
       </StoreProvider>
        <Footer/>
        </body>
        </html>
    );
}
