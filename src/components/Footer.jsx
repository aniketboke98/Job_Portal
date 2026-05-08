export default function Footer() {
  return (
    <footer id="main-footer" className="mt-auto border-t border-blue-500/20 bg-slate-900/60 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-slate-400">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold bg-gradient-to-r from-blue-400 to-sky-300 bg-clip-text text-transparent">
            JobVault
          </span>
          . All rights reserved.
        </p>
        <p className="text-xs text-slate-500">
          Built with React + TailwindCSS
        </p>
      </div>
    </footer>
  );
}
