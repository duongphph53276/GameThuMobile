import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <>
    <Helmet>
        <title>Trang chủ</title>
        <meta name="description" content="Đây là trang chủ của website." />
        <link rel="icon" href="/favicon.ico" />
      </Helmet>
    <div>Home</div>
    </>
  )
}

export default Home