type ComingSoonPageProps = {
  title: string;
  description: string;
};

export function ComingSoonPage({ title, description }: ComingSoonPageProps) {
  return (
    <main className="mx-auto min-h-[70vh] px-3 py-12 min-[576px]:max-w-[540px] min-[768px]:max-w-[720px] min-[992px]:max-w-[960px] min-[1200px]:max-w-[1140px] min-[1400px]:max-w-[1320px] min-[1600px]:max-w-[1600px]">
      <div className="rounded-2xl border border-slate-200 bg-white p-8">
        <p className="text-sm uppercase tracking-[0.2em] text-emerald-600">Migration in progress</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">{title}</h1>
        <p className="mt-3 text-slate-600">{description}</p>
      </div>
    </main>
  );
}
