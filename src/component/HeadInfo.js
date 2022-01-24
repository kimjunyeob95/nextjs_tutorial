import React from "react";
import Head from "next/head";

export const HeadInfo = (props) => {
  const { title, desc } = props;
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={desc}></meta>
    </Head>
  );
};
