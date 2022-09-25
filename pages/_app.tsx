import type { AppType } from "next/dist/shared/lib/utils";
import { trpc } from "../utils/trpc";
import "../styles/global.scss";

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};
export default trpc.withTRPC(MyApp);
