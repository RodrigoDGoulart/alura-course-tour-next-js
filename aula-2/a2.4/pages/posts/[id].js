import NextLink from "next/link";
import { Box, Text } from "@skynexui/components";
import { useRouter } from "next/router";

export async function getStaticPaths() {
  // URL informada da aula não está funcionando, foi usado PokeAPI para estudo
  // const API_URL = "https://fakeapi-omariosouto.verce.app/api/posts";
  const API_URL = "https://pokeapi.co/api/v2/pokemon-species";
  const DADOS_API = await fetch(API_URL).then((res) => res.json());

  const paths = DADOS_API.results.map((item, index) => ({
    params: {
      id: `${index + 1}`,
    },
  }));

  return {
    paths: [],
    fallback: "blocking", // false or 'blocking'
  };
}

export async function getStaticProps(context) {
  const id = context.params.id;
  console.log('gerou', id);

  const API_URL = `https://pokeapi.co/api/v2/pokemon-species/${id}/`;
  // const post = dados.posts.find((currentPost) => currentPost.id === id);
  const pokemon = await fetch(API_URL).then((res) => res.json());

  return {
    props: {
      id: id,
      title: pokemon.name,
      date: new Date().toLocaleDateString("pt-BR"),
      content: [
        ...new Set(
          pokemon.flavor_text_entries
            .filter((item) => item.language.name === "en")
            .map((item) => item.flavor_text)
        ),
      ].join(" "),
    },
  };
}

export default function PostByIdScreen(props) {
  // console.log(props);
  const router = useRouter();
  // console.log(router);
  const post = {
    title: props.title,
    date: props.date,
    content: props.content,
  };

  if (router.isFallback) {
    return "Essa página não existe!";
  }

  return (
    <Box
      styleSheet={{
        flexDirection: "column",
        margin: "32px auto",
        maxWidth: "700px",
        paddingHorizontal: "16px",
      }}
    >
      {/* Cabeçalho */}
      <Text
        variant="heading2"
        tag="h1"
        styleSheet={{
          color: "#F9703E",
          justifyContent: "center",
          lineHeight: "1.2",
        }}
      >
        {post.title}
      </Text>
      <Text
        styleSheet={{
          color: "#F9703E",
          justifyContent: "center",
          borderBottom: "1px solid #F9703E",
          paddingVertical: "16px",
          marginVertical: "16px",
        }}
      >
        {post.date}
      </Text>

      {/* Área de Conteudo */}
      <Box
        styleSheet={{
          flexDirection: "column",
        }}
      >
        <Text>{post.content}</Text>

        {post.video && (
          <iframe
            style={{ marginTop: "32px", minHeight: "400px" }}
            src={post.video}
          />
        )}
      </Box>

      {/* Rodapé */}
      <Box
        styleSheet={{
          marginTop: "16px",
          paddingVertical: "16px",
          borderTop: "1px solid #F9703E",
          color: "#F9703E",
        }}
      >
        <NextLink href="/" passHref>
          <Text tag="a" styleSheet={{ hover: { textDecoration: "underline" } }}>
            Voltar para a home
          </Text>
        </NextLink>
      </Box>
    </Box>
  );
}
