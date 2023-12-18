import NavBar from "./layout/navbar";
import Form from "./form";
import Data from "./data";
// import Footer from "./layout/footer";

export default function Home() {
  return (
    <div>
      <NavBar />
      <main className="py-20 min-h-screen">
        <Data />
        <Form />
      </main>
      {/* <Footer /> */}
    </div>
  );
}
