import "./global.css";
import Footer from "@/components/footer";
import SearchBar from "@/components/searchBar";
import StoreProvider from "@/app/StoreProvider";


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
