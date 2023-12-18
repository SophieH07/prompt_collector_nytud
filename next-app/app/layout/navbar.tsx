"use client";

// import { useUser } from "@auth0/nextjs-auth0/client";

export default function NavBar() {
  // const { user, error, isLoading } = useUser();
  return (
    <div className="fixed w-screen h-10 bg-gray-800 flex text-white">
      <p className="pt-2 pl-4">Nyelvtudományi Kutatóközpont</p>
      {/* <div className="text-right pt-1 pr-5 text-white">
        {user ? (
          <h2>
            {user.name} <a href="/api/auth/logout">Kijelentkezés</a>
          </h2>
        ) : (
          <a href="/api/auth/login">Bejelentkezés</a>
        )}
      </div> */}
    </div>
  );
}
