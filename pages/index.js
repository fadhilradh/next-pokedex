import Layout from "../components/Layout";
import Link from "next/link";
import Image from "next/image";

export default function Home({ pokemons }) {
   return (
      <Layout title="Pokedex">
         <h1 className="text-4xl mb-8 text-center">Test</h1>
         <ul>
            {pokemons.map((pokemon, index) => (
               <li key={pokemon.name}>
                  <Link href={`/pokemon?id=${index + 1}`}>
                     <a className="flex items-center text-lg bg-gray-200 border p-4 border-gray my-2 capitalize rounded-md">
                        <Image
                           className=" mr-3"
                           src={pokemon.image}
                           alt={pokemon.name}
                           width={200}
                           height={200}
                        />
                        <p className="font-bold ml-2 text-4xl">
                           {pokemon.name}
                        </p>
                     </a>
                  </Link>
               </li>
            ))}
         </ul>
      </Layout>
   );
}

export async function getStaticProps(context) {
   try {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
      const { results } = await res.json();
      const pokemons = results.map((result, index) => {
         const paddedIndex = ("00" + (index + 1)).slice(-3);
         const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`;
         return {
            ...result,
            image,
         };
      });
      return {
         props: { pokemons },
      };
   } catch (err) {
      console.error(err);
   }
}
