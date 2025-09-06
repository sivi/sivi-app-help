import React from 'react';
import DocItem from '@theme-original/DocItem';
import Head from '@docusaurus/Head';

export default function DocItemWrapper(props) {
  const {content: DocContent} = props;
  const {frontMatter} = DocContent;
  const {
    seo_title,
    meta_description,
    keywords,
  } = frontMatter;

  return (
    <>
      <Head>
        {seo_title && <title>{seo_title}</title>}
        {meta_description && <meta name="description" content={meta_description} />}
        {keywords && <meta name="keywords" content={Array.isArray(keywords) ? keywords.join(', ') : keywords} />}
      </Head>
      <DocItem {...props} />
    </>
  );
}
