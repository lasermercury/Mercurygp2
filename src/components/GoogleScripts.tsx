'use client';

import { useAdminStore } from '@/stores/admin-store';

/**
 * Injects Google Analytics 4, Google Tag Manager, and Google Site Verification
 * scripts based on admin panel settings stored in localStorage.
 * This component renders only <script> tags — no visual output.
 */
export default function GoogleScripts() {
  const { google, seo } = useAdminStore();

  return (
    <>
      {/* Google Site Verification */}
      {seo.googleVerification && (
        <meta
          name="google-site-verification"
          content={seo.googleVerification}
        />
      )}

      {/* Google Analytics 4 */}
      {google.gaMeasurementId && (
        <>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${google.gaMeasurementId}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${google.gaMeasurementId}');
              `,
            }}
          />
        </>
      )}

      {/* Google Tag Manager */}
      {google.gtmContainerId && (
        <>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${google.gtmContainerId}');
              `,
            }}
          />
          <noscript
            dangerouslySetInnerHTML={{
              __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${google.gtmContainerId}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
            }}
          />
        </>
      )}
    </>
  );
}
