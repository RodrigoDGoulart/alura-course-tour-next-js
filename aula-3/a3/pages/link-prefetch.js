import Link from 'next/link';


export default function LinkPrefetchPage() {
  return (
    <div>
      <li>
        <Link href="/"  prefetch={false}>
          <a>
            Home
          </a>
        </Link>
      </li>
      {/* prefetch-false - vai pré-carregar a página ao posicionar mouse no link. O padrão é prefecth-true, pré-carregando todas as páginas relacionadas aos links */}
      {/* talvez afete o desempenho com prefetchs-true */}
      <li>
        <Link href="/sobre" prefetch={false}>
          <a>
            Sobre
          </a>
        </Link>
      </li>
      <li>
        <Link href="/link-prefetch">
          <a>
            Link Prefetch
          </a>
        </Link>
      </li>
    </div>
  )
}
