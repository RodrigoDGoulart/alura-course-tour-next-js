export default function MyApp({ Component, PageProps }) {
  return (
    <div>
      <h1>cabeçalho</h1>
      <style>{`
        * {
          font-family: sans-serif;
        }
      `}</style>
      <Component {...PageProps} />
    </div>
  );
}
