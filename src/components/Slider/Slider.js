import SwiperCore, { Pagination, Autoplay } from "swiper";
import Media from "react-media";
import { useHistory } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";
import "swiper/components/pagination/pagination.scss";
import "./Slider.css";

SwiperCore.use([Pagination, Autoplay]);

const Slider = () => {
  const history = useHistory();

  const handleRoute = (URL) => {
    history.push(URL);
  };
  return (
    <Media query={{ maxWidth: 767 }}>
      {(matches) =>
        matches ? (
          <Swiper
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            navigation
            spaceBetween={0}
            slidesPerView={1}
            pagination={{ clickable: true }}
            style={{ marginBottom: "55px" }}
          >
            <SwiperSlide className="SliderOpacity">
              <img
                alt="First Slider"
                className="SliderImage"
                src={`${process.env.REACT_APP_STORAGE_BASE_URL}/Snuggs%20Landing%20Photos%2FSnuggs1Mobile.jpg?alt=media`}
              />
              <h1 className="SliderFirstHeader">
                Snuggs Monk Wearable Blankets
              </h1>
              <h3 className="SliderSecondHeader">
                Super Soft &amp; Comfy Wearable Blankets
              </h3>
              <button
                onClick={() => handleRoute("collections/snuggs-monk-blanket")}
                className="SliderShopNow"
              >
                Shop now!
              </button>
            </SwiperSlide>
            <SwiperSlide className="SliderOpacity">
              <img
                alt="Second Slider"
                className="SliderImage"
                src={`${process.env.REACT_APP_STORAGE_BASE_URL}/Snuggs%20Landing%20Photos%2FSnuggs2Mobile.jpg?alt=media`}
              />
              <h1 className="SliderFirstHeader">
                Snuggs Wearable Blanket Hoodie
              </h1>
              <h3 className="SliderSecondHeader">Comfiest Homewear Products</h3>
              <button
                onClick={() =>
                  handleRoute("/collections/snuggs-blanket-hoodie")
                }
                className="SliderShopNow"
              >
                Shop now!
              </button>
            </SwiperSlide>
            <SwiperSlide className="SliderOpacity">
              <img
                alt="Third Slider"
                className="SliderImage"
                src={`${process.env.REACT_APP_STORAGE_BASE_URL}/Snuggs%20Landing%20Photos%2FSnuggs3Mobile.jpg?alt=media`}
              />
              <h1 className="SliderFirstHeader">
                Snuggs Wearable Blanket Onesie
              </h1>
              <h3 className="SliderSecondHeader">As Comfy As It Gets</h3>
              <button
                onClick={() =>
                  handleRoute("/collections/snuggs-blanket-onesie-adults")
                }
                className="SliderShopNow"
              >
                Shop now!
              </button>
            </SwiperSlide>
          </Swiper>
        ) : (
          <Swiper
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            navigation
            spaceBetween={0}
            slidesPerView={1}
            pagination={{ clickable: true }}
            style={{ marginBottom: "55px" }}
          >
            <SwiperSlide className="SliderOpacity">
              <img
                alt="First Slider"
                className="SliderImage"
                src={`${process.env.REACT_APP_STORAGE_BASE_URL}/Snuggs%20Landing%20Photos%2FSnuggs1Web.jpg?alt=media`}
              />
              <h1 className="SliderFirstHeader">
                Snuggs Monk Wearable Blankets
              </h1>
              <h3 className="SliderSecondHeader">
                Super Soft &amp; Comfy Wearable Blankets
              </h3>
              <button
                onClick={() => handleRoute("/collections/snuggs-monk-blanket")}
                className="SliderShopNow"
              >
                Shop now!
              </button>
            </SwiperSlide>
            <SwiperSlide className="SliderOpacity">
              <img
                alt="Second Slider"
                className="SliderImage"
                src={`${process.env.REACT_APP_STORAGE_BASE_URL}/Snuggs%20Landing%20Photos%2FSnuggs2Web.jpg?alt=media`}
              />
              <h1 className="SliderFirstHeader">
                Snuggs Wearable Blanket Hoodie
              </h1>
              <h3 className="SliderSecondHeader">Comfiest Homewear Products</h3>
              <button
                onClick={() =>
                  handleRoute("/collections/snuggs-blanket-hoodie")
                }
                className="SliderShopNow"
              >
                Shop now!
              </button>
            </SwiperSlide>
            <SwiperSlide className="SliderOpacity">
              <img
                alt="Third Slider"
                className="SliderImage"
                src={`${process.env.REACT_APP_STORAGE_BASE_URL}/Snuggs%20Landing%20Photos%2FSnuggs3Web.jpg?alt=media`}
              />
              <h1 className="SliderFirstHeader">
                Snuggs Wearable Blanket Onesie
              </h1>
              <h3 className="SliderSecondHeader">As Comfy As It Gets</h3>
              <button
                onClick={() =>
                  handleRoute("/collections/snuggs-blanket-onesie-adults")
                }
                className="SliderShopNow"
              >
                Shop now!
              </button>
            </SwiperSlide>
          </Swiper>
        )
      }
    </Media>
  );
};

export default Slider;
