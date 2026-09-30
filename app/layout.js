import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AppProviders from "@/components/AppProviders";
export const runtime = 'edge';
export const metadata={title:"7thSky — Cinema Above the Ordinary",description:"Discover movies, series and stories curated for the next level of entertainment.",icons:{icon:"/7thsky-icon.svg"}};
export default function RootLayout({children}){return <html lang="en" data-theme="dark"><body className="min-h-screen"><AppProviders><Navbar/><main>{children}</main><Footer/></AppProviders>
  
  <script src="https://cdn.zanderio.ai/widget/loader.js" data-id="wdg_cBIiKSjSO1gmKJn6Uc5jbV1R" defer></script>
  </body></html>}
