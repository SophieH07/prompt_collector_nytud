"use client";


export default function NavBar({ text }: { text: string }) {
  return (
    <div className="fixed w-screen h-16 bg-gradient-to-b from-gray-800 via-gray-800">
      <div className="pt-1 pr-5 text-white">
        {text == "question" ?
          <a href="/">Vissza</a>
        :
          <a href="/add-question" className="float-right">
          <p className="text-2xl font-bold">Új kérdés hozzáadása</p>
        </a> 
        }
      </div>
    </div>
  );
}
