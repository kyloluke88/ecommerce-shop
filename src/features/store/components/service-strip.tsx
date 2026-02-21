import { Card } from "@/components/ui/card";
import { serviceItems } from "@/features/store/data/home-data";

export function ServiceStrip() {
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {serviceItems.map((item) => (
        <Card key={item.id} className="p-5">
          <p className="text-sm font-semibold text-slate-900">{item.title}</p>
          <p className="mt-1 text-sm text-slate-500">{item.description}</p>
        </Card>
      ))}
    </section>
  );
}
