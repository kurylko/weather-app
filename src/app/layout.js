'use client';

import "./global.css";
import Footer from "@/components/footer";
import SearchBar from "@/components/searchBar";
import StoreProvider from "@/app/StoreProvider";


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
        <SearchBar/>
        <main>{children}</main>
       </StoreProvider>
        <Footer/>
        </body>
        </html>
    );
}
