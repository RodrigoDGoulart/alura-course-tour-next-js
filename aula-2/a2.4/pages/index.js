import NextLink from 'next/link';
import { Box, Text, Image } from '@skynexui/components';

export async function getStaticProps() {
  const API_URL = `https://pokeapi.co/api/v2/pokemon-species/`;
  // const post = dados.posts.find((currentPost) => currentPost.id === id);
  const items = await fetch(API_URL).then((res) => res.json());

  return {
    props: {
      posts: items.results.map((poke, index) => ({
        id: index + 1,
        title: poke.name,
        content: `Veja mais sobre o ${poke.name}`
      }))
    },
    // o next refaz o staticProps a cada x segundos. Muito útil para sites que serão vistos por muitas pessoas, sendo muitas requisições. Invés de ser uma requisição para cada acesso, é feito 1 requisição a cada x segundos
    revalidate: 10,
  };
}

export default function HomeScreen(props) {
  const infos = {
    nome: 'Mario Souto',
    githubUser: 'omariosouto',
  }
  const posts = props.posts;

  return (
    <Box
      styleSheet={{
        flexDirection: 'column',
        margin: '32px auto',
        maxWidth: '800px',
        paddingHorizontal: '16px',
      }}
    >
      <Image
        src={`https://github.com/${infos.githubUser}.png`}
        styleSheet={{
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          margin: '0 auto',
          border: '2px solid #F9703E',
        }}
      />
      <Text
        variant="heading1"
        tag="h1"
        styleSheet={{ color: '#F9703E', justifyContent: 'center' }}
      >
        {infos.nome}
      </Text>
      
      <Box styleSheet={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        marginTop: '16px',
        gridGap: '16px',
      }}>
        {posts.map(({ title, content, id }) => (
          <Post key={id} title={title} content={content} id={id} />
        ))}
      </Box>
    </Box>
  )
}

function Post({ title, content, id }) {
  return (
    <Box 
      styleSheet={{
        flexDirection: 'column',
        border: '1px solid #F9703E',
        padding: '16px',
        boxShadow: '1px 1px 5px 0 rgba(255,69,0,0.2)',
        transition: '.3s',
        borderRadius: '4px',
        hover: {
          boxShadow: '1px 1px 5px 5px rgba(255,69,0,0.2)',
        }
      }}
    >
      <NextLink href={`posts/${id}`} passHref>
        <Text
          tag="a"
          variant="heading4"
          styleSheet={{ display:' block', color: '#F9703E', marginBottom: '8px' }}
        >
          {title}
        </Text>
      </NextLink>
      <Text>
        {content.substring(0, 140)}...
      </Text>
    </Box>
  );
}
