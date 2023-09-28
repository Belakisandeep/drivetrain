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
_paq.push(['trackPageView']);
_paq.push(['enableLinkTracking']);
_paq.push(['enableHeartBeatTimer']);
_paq.push(['trackAllContentImpressions']);
(function () {
  var u = 'https://javeed.bangdb.com:18080/stream/used_engines_drivetrain/Data';
  _paq.push(['setTrackerUrl', u]);
  _paq.push(['setSiteId', 'used-engines-drivetrain.us']);
  var d = document,
    s = d.getElementsByTagName('script')[0];
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = 'https://cdn.bangdb.com/tm/KpG4GoZiM6Py/matomo.js';
    s.parentNode.insertBefore(script, s);
})();
      `}
        </Script>

        <Script id="LOCATION" strategy="beforeInteractive">
          {`  
        async function getLocationData() {
    try {
      const response = await fetch(
        "https://pro.ip-api.com/json/?fields=66846719&key=jNFaThIJUJUwHcp"
      );
      const jsonData = await response.json();
      window._mtm.push({ ip: JSON.stringify(jsonData) });
      window._mtm.push({ event: "ip" });
    } catch (err) {
      console.log(err);
    }
  }

  getLocationData();`}
        </Script>

        <Script id="BDB_CONTAINERS" strategy="beforeInteractive">
          {`  var _mtm = window._mtm = window._mtm || [];
  _mtm.push({'mtm.startTime': (new Date().getTime()), 'event': 'mtm.Start'});
  var d = document,
  s = d.getElementsByTagName('script')[0];
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.async = true;
  script.src = 'https://cdn.bangdb.com/tm/KpG4GoZiM6Py/3fbcc18fe6f44f56934d055112a2bb88/mastercontainer.js';
  s.parentNode.insertBefore(script, s);`}
        </Script>

        <Script id="bing" strategy="afterInteractive">
          {`(function(w,d,t,r,u)
          {
              var f,n,i;
              w[u]=w[u]||[],f=function()
              {
                  var o={ti:"97063818", enableAutoSpaTracking: true};
                  o.q=w[u],w[u]=new UET(o),w[u].push("pageLoad")
              },
              n=d.createElement(t),n.src=r,n.async=1,n.onload=n.onreadystatechange=function()
              {
                  var s=this.readyState;
                  s&&s!=="loaded"&&s!=="complete"||(f(),n.onload=n.onreadystatechange=null)
              },
              i=d.getElementsByTagName(t)[0],i.parentNode.insertBefore(n,i)
          })
          (window,document,"script","//bat.bing.com/bat.js","uetq");`}
        </Script>

        <Script id="gt" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WS4Q9DGK');`}
        </Script>
      </head>

      <body className="flex min-h-full flex-col">
        <RootLayout>{children}</RootLayout>
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WS4Q9DGK" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
          }}
        />
      </body>
    </html>
  )
}
