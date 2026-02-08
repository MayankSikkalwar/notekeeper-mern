
function Footer() {
  return (
    <footer className="border-t border-white/5 bg-slate-950/80 py-6">
      <div className="text-center text-xs text-slate-500">
        © {new Date().getFullYear()}{" "}
        <span className="font-display text-slate-300">NoteKeeper</span>. All
        rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
