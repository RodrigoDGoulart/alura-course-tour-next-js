import { useRouter } from "next/dist/client/router";
import Link from 'next/link';

export default function Post() {
  const router = useRouter();

  return (
    <div>
      <h1>Página de post</h1>
      <h4>Post: {router.query.id}</h4>
      <Link href='/'>Home</Link>
    </div>
  );
}
