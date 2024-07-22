import {Inter} from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";

const inter = Inter({subsets: ["latin"]});

export const metadata = {
    title: "Weather App",
    description: "Weather app with productivity advices",
};

export default function RootLayout({children}) {
    return (
        <html lang="en">
        <head>
            <title>{metadata.title}</title>
            <meta name="description" content={metadata.description}/>
            <link rel="icon" href="/favicon.ico" sizes="any" />
        </head>
        <body className={inter.className}>
        <Header/>
        {children}
        <Footer/>
        </body>
        </html>
    );
}
