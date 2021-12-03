/* eslint-disable @next/next/no-img-element */
import { Grid } from "semantic-ui-react";
import Link from "next/link";
import styles from "./ItemList.module.css";
export default function ItemList({ list }) {
  return (
    <Grid columns={3}>
      <Grid.Row>
        {list.map((item) => (
          <Grid.Column key={item.id}>
            <Link href={`/detail/${item.id}`}>
              <a>
                <div className={styles.wrap} data-id={item.id}>
                  <img src={item.image_link} alt={item.name} className={styles.img_item} />
                  <strong className={styles.tit_item}>{item.name}</strong>
                  <span className={styles.txt_info}>
                    {item.category} {item.product_type}
                  </span>
                  <strong className={styles.num_price}>${item.price}</strong>
                </div>
              </a>
            </Link>
          </Grid.Column>
        ))}
      </Grid.Row>
    </Grid>
  );
}
