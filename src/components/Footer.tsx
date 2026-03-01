export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto max-w-6xl px-6 py-10 text-center text-sm text-white/70">
        &copy; {year} All Rights Reserved By{" "}
        <span className="text-white">The Hungry Gentleman Inc.</span>
      </div>
    </footer>
  );
}
