import type { GetServerSideProps } from "next";
import Head from "next/head";
import Layout from "../components/layout";
import { useSession } from "next-auth/react";
import Landing from "../components/LandingPage";
import { Tab } from "@headlessui/react";
import { fetchCategories } from "../utils/fetchCategories";
import { fetchProducts } from "../utils/fetchProducts";
import Product from "../components/Product";

const Home = ({ categories, products }: Props) => {
  const showProducts = (proIndex: number) => {
    const x = products.products.filter(
      (item) => item.category._ref === categories[proIndex]._id
    );
    return x.map((item) => {
      return <Product products={item} />;
    });
  };
  const product_category = categories;
  const product_item = products;
  const { data: session } = useSession();
  return (
    <div className="">
      <Head>
        <title>Practice Task</title>
      </Head>
      <Layout>
        <Landing />
        <section className="relative z-40  bg-black text-[#fff]">
          <div className="space-y-10 py-16">
            <h1 className="text-center text-4xl font-medium tracking-wide text-white md:text-5xl">
              This is main
            </h1>
            <Tab.Group>
              <Tab.List className="flex justify-center">
                {product_category.map((category) => (
                  <Tab
                    key={category._id}
                    id={category._id}
                    className={({ selected }) =>
                      `whitespace-nowrap rounded-t-lg py-3 px-5 text-sm font-light outline-none md:py-4 md:px-6 md:text-base ${
                        selected
                          ? "borderGradient bg-[#35383C] text-white"
                          : "border-b-2 border-[#35383C] text-[#747474]"
                      }`
                    }
                  >
                    {category.title}
                  </Tab>
                ))}
              </Tab.List>
              <Tab.Panels className="mx-auto  max-w-fit pt-10 pb-24 sm:px-4">
                <Tab.Panel className="tabPanel">{showProducts(0)}</Tab.Panel>
                <Tab.Panel className="tabPanel">{showProducts(1)}</Tab.Panel>
                <Tab.Panel className="tabPanel">{showProducts(2)}</Tab.Panel>
                <Tab.Panel className="tabPanel">{showProducts(3)}</Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </section>
      </Layout>
    </div>
  );
};

export default Home;

// backend code

export const getServerSideProps: GetServerSideProps = async () => {
  const categories = await fetchCategories();
  const products = await fetchProducts();
  return {
    props: {
      categories,
      products,
    },
  };
};
