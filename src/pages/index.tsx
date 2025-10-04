import { InferGetServerSidePropsType } from "next";

import List from "@/components/List";
import SEOHead from "@/components/SEAHead";
import { resepi } from "@/data";

export const getStaticProps = async () => {
  return {
    props: {
      resepi,
    },
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
