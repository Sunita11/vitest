import { useEffect, useState } from "react";

import styles from "./style.module.css";
type Review = {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
};
type Dimension = {
  width: number;
  height: number;
  depth: number;
};
type Meta = {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
};
type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: Dimension;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: Meta;
  images: string[];
  thumbnail: string;
};
const Card = () => {
  const [data, setData] = useState<Product[]>([]);
  const [searchedItem, setSearchedItem] = useState<Product | null>(null);
  useEffect(() => {
    async function getData() {
      try {
        const result = await fetch("https://dummyjson.com/products").then(
          (resp) => resp.json()
        );
        if (result) {
          setData(result.products);
        }
      } catch (err) {
        console.error(err);
      }
    }
    if (!data.length) {
      getData();
    }
  }, []);

  const onSerachHandler = (e: any) => {
    const val = e.target.value;
    if (val?.length > 2) {
      const filteredData = data?.filter(
        (prod: any) =>
          prod.title
            .replace(/\s+/g, "")
            .toLowerCase()
            .includes(val.toLowerCase()) === true
      );
      console.log("filteredData: ", filteredData);
      if (filteredData) {
        setSearchedItem(filteredData[0]);
      }
    } else {
      searchedItem && setSearchedItem(null);
    }
  };

  const getRating = (rating: number) => {
    const rateStar = [];
    if (rating) {
      const floorValue = Math.floor(rating);
      const decVal = rating - floorValue;
      const addHalfStar = decVal > 0.45 ? true : false;
      for (let i = 0; i < floorValue; i++) {
        rateStar.push(
          <li className={styles.starItem}>
            <label
              style={{
                position: "relative",
                listStyle: "none",
              }}
              className={styles.starWrapper}
            >
              <i
                style={{ content: "*", position: "absolute" }}
                className={styles.star}
              ></i>
            </label>
          </li>
        );
      }
      if (addHalfStar) {
        rateStar.push(
          <li className={`${styles.starItem} ${styles.starItemHalf}`}>
            <label
              style={{
                position: "relative",
                listStyle: "none",
              }}
              className={styles.starWrapper}
            >
              <i
                style={{ content: "*", position: "absolute" }}
                className={styles.star}
              ></i>
            </label>
          </li>
        );
      }
    }
    return <ul className={styles.starOuterWrapper}>{rateStar}</ul>;
  };

  const CarComp = (props: { data: Product }) => {
    const { title, description, rating } = props.data;
    return (
      <div className={styles.cardWrapper}>
        <span className={styles.titleCard}>{title ?? "No title"}</span>
        {description && <p>{description}</p>}
        {rating && getRating(rating)}
      </div>
    );
  };

  console.log("searchedItem: ", searchedItem);
  return (
    <div>
      <div>
        <label htmlFor="search">
          <input
            id="search"
            placeholder="Search here"
            name="search"
            onChange={onSerachHandler}
          />
        </label>
      </div>
      <div className={styles.cardOuterWrapper}>
        {searchedItem && <CarComp data={searchedItem} />}
        {!searchedItem &&
          data.length > 0 &&
          data?.map((item: Product) => (
            <CarComp key={item.title} data={item} />
          ))}
      </div>
    </div>
  );
};

export default Card;
