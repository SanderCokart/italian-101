import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link href="/" className="brand-mark">
          Italian <span>101</span>
        </Link>
        <nav className="site-nav" aria-label="Main">
          <Link href="/speaking">Spreken</Link>
          <Link href="/#units">Units</Link>
          <Link href="/progress">Progress</Link>
        </nav>
      </div>
    </header>
  );
}
