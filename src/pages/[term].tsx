import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";

import List from "@/component/List";
import SEOHead from "@/component/SEAHead";

export const getStaticProps: GetStaticProps<{}> = async () => {
  return { props: {} };
};

export const getStaticPaths: GetStaticPaths = () => {
  const paths = [
    { params: { term: "kicap" } },
    { params: { term: "ikan" } },
    { params: { term: "sambal" } },
    { params: { term: "roti" } },
    { params: { term: "spaghetti" } },
    { params: { term: "burger" } },
    { params: { term: "cheese" } },
    { params: { term: "sup" } },
    { params: { term: "beef" } },
    { params: { term: "lamb" } },
    { params: { term: "cocktail" } },
    { params: { term: "buttermilk" } },
    { params: { term: "gulai" } },
    { params: { term: "mango" } },
    { params: { term: "puasa" } },
    //
    { params: { term: "nasi" } },
    { params: { term: "nasi-ayam" } },
    { params: { term: "nasi-lemak" } },
    { params: { term: "nasi-goreng" } },
    { params: { term: "nasi-tomato" } },
    //
    { params: { term: "ayam" } },
    { params: { term: "ayam-goreng" } },
    { params: { term: "ayam-bakar" } },
    { params: { term: "ayam-masak-bawang" } },
    { params: { term: "ayam-masak-kicap" } },
    { params: { term: "ayam-masak-merah" } },
    { params: { term: "ayam-black-pepper" } },
    //
    { params: { term: "daging" } },
    { params: { term: "kari-daging" } },
    { params: { term: "daging-black-pepper" } },
    { params: { term: "daging-masak-kicap" } },
    //
    { params: { term: "kek" } },
    { params: { term: "kek-batik" } },
    { params: { term: "kek-pisang" } },
    //
    { params: { term: "telur" } },
    { params: { term: "telur-kicap" } },
    { params: { term: "kambing" } },
    { params: { term: "kambing-perap" } },
    { params: { term: "kerabu" } },
    { params: { term: "kerabu-maggi" } },
    { params: { term: "chicken" } },
    { params: { term: "chicken-chop" } },
    { params: { term: "mee" } },
    { params: { term: "mee-kari" } },
    { params: { term: "puding" } },
    { params: { term: "puding-roti" } },
    { params: { term: "kurma" } },
    { params: { term: "kurma-ayam" } },
    //
    { params: { term: "sos-black-pepper" } },
  ];
  return {
    paths,
    fallback: "blocking",
  };
};

function Term() {
  const router = useRouter();

  const term = router.query.term;
  if (!term) return null;

  const cleanTerm = String(term).replaceAll("-", " ");

  const capitalizeFirstChar = (str: string) =>
    str.split("")[0].toUpperCase() + str.substring(1);

  const capitalizeTerm = cleanTerm
    .split(" ")
    .map((word) => capitalizeFirstChar(word))
    .join(" ");

  return (
    <div>
      <SEOHead
        title={`${capitalizeTerm} | Koleksi Resepi Khairulaming | ResepiKA.com`}
        description="Koleksi resepi daripada account @khairulaming di Instagram."
        path="/"
        ogPath="/og.png"
      />
      <List term={cleanTerm} />
    </div>
  );
}

export default Term;
