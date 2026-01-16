import HeaderScript from "@/components/header-script";
import AccessDenied from "@/components/access-denied";
import { getUserLayer } from "@/utils/get-user-layer";
import { LayerProvider } from "@/context/layer-provider";
import type { Metadata } from "next";
import { Red_Hat_Display } from "next/font/google";
import { headers, cookies } from "next/headers";
import "@/app/globals.css";

const redHatDisplay = Red_Hat_Display({
  variable: "--font-red-hat-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
});

export const metadata: Metadata = {
  title: "AMZ Reviews",
  description: "This new AMZ tool is scaring experts around the world.",
};

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  // ENVIRONMENT VERIFY
  const isProduction = process.env.NODE_ENV === 'production';

  // GET DOMAIN ID
  const cks = await cookies();
  const hdrs = await headers();
  const host = hdrs.get('x-host') || '';
  const catParam = cks.get('xcat_valid');
  const content = catParam?.value || 'new';
  const params = hdrs.get('x-params') || '';

  // GET USER LAYER
  const userLayer = await getUserLayer({ cks, hdrs });

  // BODY CLASS
  // Updated: Removed items-center and max-h-svh, added w-full for full width layout
  const bodyClassName = `flex flex-col min-w-[350px] min-h-svh w-full select-none ${redHatDisplay.variable} antialiased`;

  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://scripts.converteai.net" />
        <link rel="preconnect" href="https://cdn.converteai.net" />
        <link rel="dns-prefetch" href="https://scripts.converteai.net" />
        <link rel="dns-prefetch" href="https://cdn.converteai.net" />
        <script
          src="https://cdn.utmify.com.br/scripts/utms/latest.js"
          data-utmify-prevent-subids
          async
          defer
        ></script>
        {isProduction && <HeaderScript content={content} />}
      </head>
      <body className={bodyClassName} suppressHydrationWarning>
        {userLayer === 1 ? (
          <AccessDenied />
        ) : (
          <LayerProvider
            host={host}
            layer={userLayer}
            params={params}
            content={content}
          >
            {children}
          </LayerProvider>
        )}
      </body>
    </html>
  );

};