'use client';
import Consumer from "@/components/consumer/consumer";
import Updater from "@/components/updater/updater";
import styles from "./page.module.css";

import ReduxProvider from "@/store/reduxProvider";

export default function Home() {

  return (
    <ReduxProvider>
      <main className={styles.main}>
        <Consumer/>
        <Updater />
        <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tincidunt, odio vel sodales placerat, metus purus scelerisque tortor, ut suscipit nulla urna vel neque. Etiam scelerisque quam in felis convallis, in facilisis diam tempor. Phasellus tincidunt mattis quam at consequat. Praesent ultricies cursus enim et tempus. Mauris consequat metus id gravida mattis. Nam enim enim, consequat a sagittis dictum, sodales nec risus. Nunc viverra, sapien at tristique lacinia, leo sem pulvinar mauris, sit amet malesuada ex orci quis mauris. Nulla facilisi. Donec at urna nisi. Sed dignissim rutrum libero in rhoncus.

Ut libero tortor, tincidunt id nisl id, consequat sollicitudin dolor. Nam tempus nunc vitae elit lobortis, euismod tristique felis interdum. In ac elit ac massa tempus ultrices. Etiam a condimentum lacus, a sagittis ex. Integer purus purus, tincidunt id sapien vehicula, iaculis laoreet mauris. Nunc turpis nunc, suscipit eget quam ac, vestibulum interdum elit. Cras et quam a risus consequat hendrerit. Praesent fermentum hendrerit nisl et sodales. Nullam mollis elit neque, vel laoreet arcu volutpat quis. Donec blandit feugiat urna. Cras est neque, malesuada ac bibendum ut, aliquam eu urna. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla a pharetra tortor. Praesent ac est sem. Lorem ipsum dolor sit amet, consectetur adipiscing elit.

In eget massa semper, blandit nibh nec, eleifend elit. Proin massa dolor, bibendum aliquam magna eu, lobortis mattis elit. Donec arcu sem, auctor vitae dolor sit amet, mollis fringilla nunc. Nulla lobortis massa id diam consequat, vitae venenatis urna faucibus. Aenean accumsan condimentum turpis quis pulvinar. Donec ultrices, metus eget maximus vulputate, nunc eros malesuada magna, id lacinia mi eros ut arcu. Phasellus id aliquam velit. Donec id arcu ac libero iaculis auctor. Donec ultricies nec mauris rhoncus ornare. Nunc rhoncus, est eu pretium ultricies, magna eros volutpat lectus, eu interdum nulla lectus in eros. Proin dapibus eleifend faucibus. Curabitur facilisis, sapien quis sagittis elementum, nulla velit facilisis dui, et pellentesque nisi neque eget velit. Curabitur tincidunt arcu id libero semper elementum. Nulla at sem volutpat, tincidunt neque id, lacinia mi.

Proin egestas eros vitae justo condimentum, at pellentesque nisi consequat. Nulla dapibus elementum justo eget sodales. Donec et ex odio. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vehicula mi vel pretium molestie. Pellentesque congue euismod leo in rutrum. Aenean ut dapibus quam, sed volutpat purus. Ut eget ultricies nisi, a aliquam leo. Praesent in nulla interdum, rutrum neque eget, viverra ex. Proin consectetur eget tellus quis auctor. Mauris a ipsum quis neque finibus accumsan. Morbi at odio enim. Aliquam vulputate neque lacus, eget volutpat justo tempus et. Sed scelerisque a arcu id pretium. Quisque sagittis, diam nec luctus suscipit, nibh dui eleifend orci, id bibendum justo metus non ipsum. Morbi commodo ex et pellentesque convallis.

Nulla facilisi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nam porta aliquet nisl, in dictum lacus lobortis sed. Morbi consequat eu justo eget cursus. Mauris tempor blandit imperdiet. Suspendisse nec tellus sit amet nisl fermentum aliquet. Sed enim velit, sodales quis convallis mollis, dignissim in quam. Vivamus eros turpis, pretium sit amet est sit amet, faucibus eleifend risus.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tincidunt, odio vel sodales placerat, metus purus scelerisque tortor, ut suscipit nulla urna vel neque. Etiam scelerisque quam in felis convallis, in facilisis diam tempor. Phasellus tincidunt mattis quam at consequat. Praesent ultricies cursus enim et tempus. Mauris consequat metus id gravida mattis. Nam enim enim, consequat a sagittis dictum, sodales nec risus. Nunc viverra, sapien at tristique lacinia, leo sem pulvinar mauris, sit amet malesuada ex orci quis mauris. Nulla facilisi. Donec at urna nisi. Sed dignissim rutrum libero in rhoncus.

Ut libero tortor, tincidunt id nisl id, consequat sollicitudin dolor. Nam tempus nunc vitae elit lobortis, euismod tristique felis interdum. In ac elit ac massa tempus ultrices. Etiam a condimentum lacus, a sagittis ex. Integer purus purus, tincidunt id sapien vehicula, iaculis laoreet mauris. Nunc turpis nunc, suscipit eget quam ac, vestibulum interdum elit. Cras et quam a risus consequat hendrerit. Praesent fermentum hendrerit nisl et sodales. Nullam mollis elit neque, vel laoreet arcu volutpat quis. Donec blandit feugiat urna. Cras est neque, malesuada ac bibendum ut, aliquam eu urna. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla a pharetra tortor. Praesent ac est sem. Lorem ipsum dolor sit amet, consectetur adipiscing elit.

In eget massa semper, blandit nibh nec, eleifend elit. Proin massa dolor, bibendum aliquam magna eu, lobortis mattis elit. Donec arcu sem, auctor vitae dolor sit amet, mollis fringilla nunc. Nulla lobortis massa id diam consequat, vitae venenatis urna faucibus. Aenean accumsan condimentum turpis quis pulvinar. Donec ultrices, metus eget maximus vulputate, nunc eros malesuada magna, id lacinia mi eros ut arcu. Phasellus id aliquam velit. Donec id arcu ac libero iaculis auctor. Donec ultricies nec mauris rhoncus ornare. Nunc rhoncus, est eu pretium ultricies, magna eros volutpat lectus, eu interdum nulla lectus in eros. Proin dapibus eleifend faucibus. Curabitur facilisis, sapien quis sagittis elementum, nulla velit facilisis dui, et pellentesque nisi neque eget velit. Curabitur tincidunt arcu id libero semper elementum. Nulla at sem volutpat, tincidunt neque id, lacinia mi.

Proin egestas eros vitae justo condimentum, at pellentesque nisi consequat. Nulla dapibus elementum justo eget sodales. Donec et ex odio. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vehicula mi vel pretium molestie. Pellentesque congue euismod leo in rutrum. Aenean ut dapibus quam, sed volutpat purus. Ut eget ultricies nisi, a aliquam leo. Praesent in nulla interdum, rutrum neque eget, viverra ex. Proin consectetur eget tellus quis auctor. Mauris a ipsum quis neque finibus accumsan. Morbi at odio enim. Aliquam vulputate neque lacus, eget volutpat justo tempus et. Sed scelerisque a arcu id pretium. Quisque sagittis, diam nec luctus suscipit, nibh dui eleifend orci, id bibendum justo metus non ipsum. Morbi commodo ex et pellentesque convallis.

Nulla facilisi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nam porta aliquet nisl, in dictum lacus lobortis sed. Morbi consequat eu justo eget cursus. Mauris tempor blandit imperdiet. Suspendisse nec tellus sit amet nisl fermentum aliquet. Sed enim velit, sodales quis convallis mollis, dignissim in quam. Vivamus eros turpis, pretium sit amet est sit amet, faucibus eleifend risus.
        </p>
      </main>
    </ReduxProvider>

  );
}
