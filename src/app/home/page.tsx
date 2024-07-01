"use client";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
const AllPageLayout = dynamic(
  () => import("@/components/layouts/allPage.layout")
);
const Navigator = dynamic(
  () => import("@/components/home/navigator/navigator.component")
);
// const AllPageLayout = dynamic(() => import('@/components/layouts/allPage.layout'))

const Page: NextPage = (req, res) => {
  return (
    <AllPageLayout>
      <Head>
        <title>Home</title>
      </Head>
      <Navigator current={1} />
    </AllPageLayout>
  );
};

export default Page;
