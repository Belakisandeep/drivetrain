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
