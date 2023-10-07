import Banner from "../components/Banner";
import Footer from "../components/Footer";
// import Experts from "./components/Experts";
import Header from "../components/Header";
// import Newlatter from "./components/Newlatter";
import Plans from "../components/Plans";
import Rent from "../components/Rent";
export default function Home() {
  return (
    <>
      <Header />
      <Banner />
      {/* <Experts /> */}
      {/* <Newlatter /> */}
      <Plans />
      <Rent />
      <Footer />
    </>
  );
}

