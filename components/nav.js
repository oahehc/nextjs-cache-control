import React from "react";
import Link from "next/link";

export const Links = [
  { href: "/static", name: "static", desc: "" },
  { href: "/lambda", name: "lambda", desc: "" },
  { href: "/ssg", name: "ssg", desc: "" },
  { href: "/images", name: "images", desc: "page with images" },
  {
    href: "/list",
    name: "list",
    desc: "Always Revalidation",
  },
  { href: "/product", name: "product", desc: "max-age=10 with etag" },
  { href: "/tos", name: "tos", desc: "Long Term Caching" },
];

const Nav = () => (
  <nav>
    <ul>
      <li>
        <Link prefetch href="/">
          <a>Home</a>
        </Link>
      </li>
      <ul>
        {Links.map(({ href, name }) => (
          <li key={href}>
            <Link href={href}>
              <a>{name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </ul>

    <style jsx>{`
      :global(body) {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Avenir Next, Avenir,
          Helvetica, sans-serif;
      }
      nav {
        text-align: center;
      }
      ul {
        display: flex;
        justify-content: space-between;
      }
      nav > ul {
        padding: 4px 16px;
      }
      li {
        display: flex;
        padding: 6px 8px;
      }
      a {
        color: #067df7;
        text-decoration: none;
        font-size: 13px;
      }
    `}</style>
  </nav>
);

export default Nav;
