export default function Footer() {
  return (
    <footer id="main-footer" className="mt-auto border-t border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm font-medium text-slate-500">
          © {new Date().getFullYear()}{" "}
          <span className="font-bold text-blue-600">
            JobVault
          </span>
          . All rights reserved.
        </p>
        <p className="text-xs font-medium text-slate-400">
          Built with React + TailwindCSS
        </p>
      </div>
    </footer>
  );
}
