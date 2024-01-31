function MyApp({ Component, pageProps }) {
  console.log("renderização _app.tsx");
  return (
    <>
      <style>{`
        * {
          font-family: sans-serif; 
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
