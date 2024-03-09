import * as React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../../components/layout";
import Seo from "../../components/seo";

type BlogPageProps = {
  data: {
    allMdx: {
      nodes: {
        frontmatter: { title: string; date: string; slug: string };
        id: string;
        excerpt: string;
      }[];
    };
  };
};
const BlogPage: React.FC<BlogPageProps> = ({ data }) => {
  return (
    <Layout pageTitle="My Blog Posts">
      {data.allMdx.nodes.map(({ id, frontmatter, excerpt }) => (
        <article key={id}>
          <h2>
            <Link to={`/blog/${frontmatter.slug}`}>{frontmatter.title}</Link>
          </h2>
          <p>Posted: {frontmatter.date}</p>
          <p>{excerpt}</p>
        </article>
      ))}
    </Layout>
  );
};

export const query = graphql`
  query {
    allMdx(sort: { frontmatter: { date: DESC } }) {
      nodes {
        frontmatter {
          date(formatString: "MMMM D, YYYY")
          title
          slug
        }
        id
        excerpt
      }
    }
  }
`;

export const Head = () => <Seo title="My Blog Posts" />;

export default BlogPage;
