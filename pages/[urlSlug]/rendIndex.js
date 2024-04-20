import dynamic from "next/dynamic";
// import Loader from "components/Loader/Loader";
import ErrorPage from '../404';


export default ({ theme }) => {
  const Index = dynamic(
    () => import(`tutorial/${theme}.mdx`).catch(err => {
      return () => <ErrorPage />
    })
  );
  return <Index />
};
