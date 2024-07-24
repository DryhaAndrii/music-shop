import styles from "./styles.module.scss";
import Image from "next/image";

function Banners() {
    return (
        <div className={styles.bannersWrapper}>
            <div className="container">
                <div className={styles.banners}>
                    <div className={styles.banner}>
                        <div className={styles.imageContainer}>
                            <Image src={"/images/footerBannersImages/banner1.png"} alt="banner" width={50} height={50} />
                        </div>
                        <div className={styles.textContainer}>
                            Free delivery from $3,000
                        </div>
                    </div>

                    <div className={styles.banner}>
                        <div className={styles.imageContainer}>
                            <Image src={"/images/footerBannersImages/banner2.png"} alt="banner" width={50} height={50} />
                        </div>
                        <div className={styles.textContainer}>
                            Warranty service
                        </div>
                    </div>

                    <div className={styles.banner}>
                        <div className={styles.imageContainer}>
                            <Image src={"/images/footerBannersImages/banner3.png"} alt="banner" width={50} height={50} />
                        </div>
                        <div className={styles.textContainer}>
                            Return and exchange within 14 days
                        </div>
                    </div>

                    <div className={styles.banner}>
                        <div className={styles.imageContainer}>
                            <Image src={"/images/footerBannersImages/banner4.png"} alt="banner" width={50} height={50} />
                        </div>
                        <div className={styles.textContainer}>
                            Certified goods
                        </div>
                    </div>

                    <div className={styles.banner}>
                        <div className={styles.imageContainer}>
                            <Image src={"/images/footerBannersImages/banner5.png"} alt="banner" width={50} height={50} />
                        </div>
                        <div className={styles.textContainer}>
                            We work for you 7 days a week
                        </div>
                    </div>

                    <div className={styles.banner}>
                        <div className={styles.imageContainer}>
                            <Image src={"/images/footerBannersImages/banner6.png"} alt="banner" width={50} height={50} />
                        </div>
                        <div className={styles.textContainer}>
                            We guarantee secure payment
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Banners;