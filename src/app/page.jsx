"use client";
import Image from "next/image";
import styles from "./page.module.css";
import Button from "@/components/Button/Button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <h1 className={styles.title}>
          Better design for your digital products.
        </h1>
        <p className={styles.desc}>
          Turning your Idea into Reality. We bring together the teams from the
          global tech industry.
        </p>
        <div className={styles.button}>
          <Button text="See my works" url="portfolio" />
        </div>
      </div>
      <div className={styles.swiper}>
        <Swiper
          pagination={true}
          modules={[Autoplay, Pagination]}
          className={styles.swiper}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
        >
          <SwiperSlide>
            <Image
              fill={true}
              src="/home2.jpg"
              alt="home picture"
              className={styles.image}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              fill={true}
              src="/home3.jpg"
              alt="home picture"
              className={styles.image}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              fill={true}
              src="/home.png"
              alt="home picture"
              className={styles.image}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              fill={true}
              src="/home6.jpg"
              alt="home picture"
              className={styles.image}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              fill={true}
              src="/home7.jpg"
              alt="home picture"
              className={styles.image}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              fill={true}
              src="/home4.jpg"
              alt="home picture"
              className={styles.image}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              fill={true}
              src="/home1.jpg"
              alt="home picture"
              className={styles.image}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              fill={true}
              src="/home9.jpg"
              alt="home picture"
              className={styles.image}
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}
