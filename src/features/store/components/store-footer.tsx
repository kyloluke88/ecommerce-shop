import { GRABIT_CONTAINER_CLASS } from "@/features/store/constants/layout";

export function StoreFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div
        className={`${GRABIT_CONTAINER_CLASS} flex flex-col items-start justify-between gap-3 px-3 py-10 text-sm text-slate-500 sm:flex-row sm:items-center`}
      >
        <p>© 2026 Grabit Store UI migration for Next.js</p>
        <p>Built with React components, no jQuery</p>
      </div>
    </footer>
  );
}
