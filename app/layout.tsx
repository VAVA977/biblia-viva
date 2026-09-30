import type { Metadata, Viewport } from 'next';
import './globals.css';
export const metadata: Metadata={title:'Bíblia Viva',description:'Conheça · Entenda · Memorize · Conecte',applicationName:'Bíblia Viva',manifest:'/manifest.webmanifest',appleWebApp:{capable:true,title:'Bíblia Viva',statusBarStyle:'default'}};
export const viewport: Viewport={width:'device-width',initialScale:1,maximumScale:1,themeColor:'#f6f4ee'};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="pt-BR"><body>{children}</body></html>;}
