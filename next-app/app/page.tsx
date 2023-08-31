import NavBar from "./layout/navbar";
import Form from "./form";
import Footer from "./layout/footer";

export default function Home() {
  return (
    <div>
      <NavBar />
      <main className="py-20 min-h-screen">
        <Form />
      </main>
      <Footer />
    </div>
  );
}
