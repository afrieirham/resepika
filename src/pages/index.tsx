import List from "@/components/List";
import SEOHead from "@/components/SEAHead";
import { GetStaticProps, InferGetServerSidePropsType } from "next";

export type Resepi = {
  title: string;
  postUrl: string;
  thumbnail: string;
};

export const getStaticProps: GetStaticProps<{
  resepi: Resepi[];
}> = async () => {
  const resepiRes = await fetch("https://api.resepika.com/resepi");
  const resepi: Resepi[] = await resepiRes.json();

  return {
    props: {
      resepi,
    },
    // revalidate every 1 minute
    revalidate: 60 * 1,
  };
};

export default function Home({
  resepi,
}: InferGetServerSidePropsType<typeof getStaticProps>) {
  return (
    <div>
      <SEOHead
        title="Koleksi Resepi Khairulaming | ResepiKA.com"
        description="Koleksi resepi daripada account @khairulaming di Instagram."
        path="/"
        ogPath="/og.png"
      />
      <List term="" resepi={resepi} />
    </div>
  );
}
