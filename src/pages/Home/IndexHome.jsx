import Sofa from "../../components/Products/Sofa";
import Navbar from "../../components/Navbar/Navbar";
import ImgCarousel from "../../components/ImgCarousel/ImgCarousel";
import Img1 from "../../img/Salahome.jpg";
import Img2 from "../../img/Dormitorio.jpg";
import Img3 from "../../img/Sofahome.jpg";
import Img4 from "../../img/sala.png";
import ImgMobile1 from "../../img/img responsive/Salahome.jpg";
import ImgMobile2 from "../../img/img responsive/Dormitorio.jpg";
import ImgMobile3 from "../../img/img responsive/Sofa-reponsive.jpg";
import ImgMobile4 from "../../img/img responsive/sala.png";

function IndexHome() {
  const img = [Img1, Img2, Img3, Img4];
  const imgMobile = [ImgMobile1, ImgMobile2, ImgMobile3, ImgMobile4];
  const slideDuration = 5000;

  return (
    <div>
      <Navbar />
      <ImgCarousel
        img={img}
        slideDuration={slideDuration}
        imgMobile={imgMobile}
      />
      <Sofa />
    </div>
  );
}

export default IndexHome;
