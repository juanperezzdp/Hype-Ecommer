import Navbar from "../../components/Navbar/Navbar";
import Products from "../../components/Products/Products";

function IndexCamas() {
  return (
    <>
      <Navbar />
      <Products props={"camas"} />
    </>
  );
}

export default IndexCamas;
