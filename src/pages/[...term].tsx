import { useRouter } from "next/router";

import List from "@/components/List";
import SEOHead from "@/components/SEAHead";
import { resepi } from "@/data";

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
      <List term={cleanTerm} resepi={resepi} />
    </div>
  );
}

export default Term;
