import { RootLayout } from '@/components/RootLayout'

import '@/styles/tailwind.css'
import Script from 'next/script'

export const metadata = {
  title: {
    template: '%s - Engines & Drivetrain',
    default: 'Engines & Drivetrain - For all your car part needs.',
  },
}

export default function Layout({ children }) {
  return (
    <html lang="en" className="h-full bg-orange-400 text-base antialiased">

      <head>

        <Script id="BDB_BASE_FILE" strategy="beforeInteractive">
          {`
var _paq = (window._paq = window._paq || []);
_paq.push(['enableLinkTracking'], ['enableHeartBeatTimer', 30], ['trackAllContentImpressions']);
(function () {
var u = 'https://testbe2.bangdb.com:18080/stream/Javeedsetup_ClickStream/event';
_paq.push(['setTrackerUrl', u], ['setSiteId', 'Javeedsetup']);
})();
var _mtm = window._mtm = window._mtm || [];
_mtm.push({'mtm.startTime': (new Date().getTime()), 'event': 'mtm.Start'});      `}
        </Script>

        <Script
          id="BDB_CONTAINERS"
          src="https://cdn.bangdb.com/tm/GLD3ADUX0BH0/matomo.js"
          strategy="afterInteractive"
        />
        <Script
          id="BDB_CONTAINERS"
          src="https://cdn.bangdb.com/tm/GLD3ADUX0BH0/bead070c3fa44a438d92e55595416f28/mastercontainer.js"
          strategy="afterInteractive"
        />



</head>

      <body className="flex min-h-full flex-col">
        <RootLayout>{children}</RootLayout>
        {/* <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WS4Q9DGK" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
          }}
        /> */}
      </body>
    </html>
  )
}
