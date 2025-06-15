"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const links = [
    { href: "/", pageName: "Home" },
    { href: "/add-log", pageName: "Add log" },
    { href: "/view-logs", pageName: "View logs" },
  ];

  const pathName = usePathname();

  return (
    <nav className="bg-purple-600 p-5 flex items-center justify-between">
      <div>
        <Link href="/" aria-label="Homepage">
          <span className="text-xl font-bold text-white">Health Tracker</span>
        </Link>
      </div>
      <ul className="flex space-x-4">
        {links.map((link, index) => (
          <li key={index}>
            <Link
              className={`${
                pathName === link.href
                  ? "font-extrabold underline"
                  : "font-normal"
              } text-white`}
              href={link.href}
            >
              {link.pageName}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
