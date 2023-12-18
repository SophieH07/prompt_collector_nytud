import NavBar from "./layout/navbar";
import Form from "./answer-form";
import Footer from "./layout/footer";

export default function Home() {
  return (
    <div>
      <NavBar text='' />
      <main className="py-20 min-h-screen">
        <Form />
      </main>
      <Footer />
    </div>
  );
}
