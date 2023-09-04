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
      <Script id="bing" strategy="lazyOnload">
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
      <body className="flex min-h-full flex-col">
        <RootLayout>{children}</RootLayout>
      </body>
    </html>
  )
}
