import NavBar from "./navbar";
import Form from "./form";

export default function Home() {
  return (
    <div>
      <NavBar />
      <main className="py-20 min-h-screen">
        <Form />
      </main>
      <div className="fixed bottom-0 flex h-16 justify-center w-full bg-gradient-to-t from-white via-white dark:from-gray-800 dark:via-gray-800">
        <p className="pt-7">Copyright xy</p>
      </div>
    </div>
  );
}
