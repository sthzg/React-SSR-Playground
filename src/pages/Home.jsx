import Layout from '../layouts/Layout.jsx';

export default function Home() {
  return (
    <Layout>
      <section className="prose">
        <h1>React SSR Playground</h1>
        <p>This content is part of the SSR-rendered shell.</p>
      </section>
    </Layout>
  );
}
