import * as React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";

import * as styles from "./layout.module.css";

type LayoutProps = {
  pageTitle: string;
  children: any;
};

const Layout: React.FC<LayoutProps> = ({ pageTitle, children }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <div className={styles.container}>
      <header className={styles.siteTitle}>
        {data.site.siteMetadata.title}
      </header>
      <nav>
        <ul className={styles.navLinks}>
          <li className={styles.navLinkItem}>
            <Link className={styles.navLinkText} to="/">
              Home
            </Link>
          </li>
          <li className={styles.navLinkItem}>
            <Link className={styles.navLinkText} to="/about">
              About
            </Link>
          </li>
          <li className={styles.navLinkItem}>
            <Link className={styles.navLinkText} to="/blog">
              Blog
            </Link>
          </li>
        </ul>
      </nav>
      <main>
        <h1 className={styles.heading}>{pageTitle}</h1>
        {children}
      </main>
    </div>
  );
};

export default Layout;
