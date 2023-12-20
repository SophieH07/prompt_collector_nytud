"use client"
import NavBar from "./layout/navbar";
import Footer from "./layout/footer";

export default function Home() {
  return (
    <div>
      <NavBar />
      <main className="py-20 min-h-screen">
        <div className="flex justify-center">

        <a className="text-2xl" 
        href="/question">Kérdés validálás</a>
        </div>
        <div className="flex justify-center">

        <a className="text-2xl"
         href="/answer">Válasz validálás</a>
        </div>
      </main>
      <Footer />
    </div>
  );
}
