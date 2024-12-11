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
var u = 'https://javeed.bangdb.com:18080/stream/a1carparts_ClickStream/event';
_paq.push(['setTrackerUrl', u], ['setSiteId', 'a1carparts']);
})();
var _mtm = window._mtm = window._mtm || [];
_mtm.push({'mtm.startTime': (new Date().getTime()), 'event': 'mtm.Start'});
      `}
        </Script>

        <Script
          id="BDB_CONTAINERS"
          src="https://cdn.bangdb.com/tm/KpG4GoZiM6Py/matomo.js"
          strategy="afterInteractive"
        />
        <Script
          id="BDB_CONTAINERS"
          src="https://cdn.bangdb.com/tm/KpG4GoZiM6Py/2a26dd9955e64802ab869f3a9d922581/mastercontainer.js"
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
