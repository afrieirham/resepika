import List from "@/components/List";
import SEOHead from "@/components/SEAHead";

export default function Home() {
  return (
    <div>
      <SEOHead
        title="Koleksi Resepi Khairulaming | ResepiKA.com"
        description="Koleksi resepi daripada account @khairulaming di Instagram."
        path="/"
        ogPath="/og.png"
      />
      <List term="" />
    </div>
  );
}
