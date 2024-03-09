import * as React from "react";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

import Layout from "../../components/layout";
import Seo from "../../components/seo";

type BlogPostProps = {
  data: {
    mdx: {
      frontmatter: {
        title: string;
        date: string;
        hero_image_alt: string;
        hero_image_credit_link: string;
        hero_image_credit_text: string;
        hero_image: { childImageSharp: { gatsbyImageData: any } };
      };
    };
  };
  children: JSX.Element;
};
const BlogPost: React.FC<BlogPostProps> = ({ data, children }) => {
  const { hero_image, title, date, hero_image_alt } = data.mdx.frontmatter;
  const image = getImage(hero_image);
  return (
    <Layout pageTitle={title}>
      <p>Posted: {date}</p>
      {image && <GatsbyImage image={image} alt={hero_image_alt} />}
      {children}
    </Layout>
  );
};

export const query = graphql`
  query ($id: String) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        hero_image_alt
        hero_image_credit_link
        hero_image_credit_text
        hero_image {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    }
  }
`;

export const Head: React.FC<BlogPostProps> = ({ data }) => (
  <Seo title={data.mdx.frontmatter.title} />
);

export default BlogPost;
