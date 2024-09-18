import Script from 'next/script';

export function GoogleScripts() {
  return (
    <>
      {/* Script async do Google Tag Manager */}
      <Script
        src='https://www.googletagmanager.com/gtag/js?id=G-9W2W432781'
        strategy='afterInteractive'
      />
      {/* Script de inicialização do Google Analytics */}
      <Script id='gtag-init' strategy='afterInteractive'>
        {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-9W2W432781');
            `}
      </Script>
    </>
  );
}
