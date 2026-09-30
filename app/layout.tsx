import type { Metadata, Viewport } from 'next';
import './globals.css';
export const metadata: Metadata={title:'Bíblia Viva',description:'Conheça · Entenda · Memorize · Conecte',applicationName:'Bíblia Viva',manifest:'/manifest.webmanifest',icons:{icon:'/icons/biblia-viva-192.svg',apple:'/icons/biblia-viva-192.svg'},appleWebApp:{capable:true,title:'Bíblia Viva',statusBarStyle:'black-translucent'}};
export const viewport: Viewport={width:'device-width',initialScale:1,maximumScale:1,themeColor:'#0b1f33'};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="pt-BR"><body>{children}</body></html>;}
