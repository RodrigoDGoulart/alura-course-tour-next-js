import { useRouter } from "next/dist/client/router";

export default function Comentarios() {
  const router = useRouter();

  return (
    <div>
      <h1>Comentários do post {router.query.id}</h1>
    </div>
  );
}
