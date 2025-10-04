import { useRouter } from "next/router";

import List from "@/components/List";
import SEOHead from "@/components/SEAHead";
import { resepi } from "@/data";

function Term() {
  const router = useRouter();
  const term = router.asPath.replace("/", "");
  const cleanTerm = String(term).replaceAll("-", " ");

  return (
    <div>
      <SEOHead
        title="Koleksi Resepi Khairulaming | ResepiKA.com"
        description="Koleksi resepi daripada account @khairulaming di Instagram."
        path="/"
        ogPath="/og.png"
      />
      <List term={cleanTerm} resepi={resepi} />
    </div>
  );
}

export default Term;
