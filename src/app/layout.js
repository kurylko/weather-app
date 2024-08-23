'use client';

import "./global.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import StoreProvider from "./../state/StoreProvider";


export default function RootLayout({children}) {
    return (
        <html lang="en">
        <head>
            <title>{'MD'}</title>
            <meta name="description" content={'MDD'}/>
            <link rel="icon" href="/favicon.ico" sizes="any"/>
        </head>
        <body>
       <StoreProvider>
        <Header/>
        <main>{children}</main>
       </StoreProvider>
        <Footer/>
        </body>
        </html>
    );
}
