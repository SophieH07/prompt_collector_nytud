"use client";
import { useState, FormEvent } from "react";

export default function Form() {
  let [suggestion, setSuggestion] = useState("");
  let [status, setStatus] = useState(0);
  let [isLoading, setIsLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    try {
      if (suggestion.trim().length > 0) {
        const response = await fetch("/api/db", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            suggestion: suggestion,
            status: status,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to submit data");
        }
      }
    } catch (error) {
      console.error("An error occurred while submitting:", error);
    } finally {
      setIsLoading(false);
      setSuggestion("");
      setStatus(0);
    }
  }

  return (
    <div>
      <div className="flex justify-center">
        <form className="w-3/4" onSubmit={onSubmit}>
          <div className="justify-center">
            <div className="pt-5">
              <label className="block uppercase tracking-wide text-gray-700 text-xl font-bold mb-2">
                válasz javításának helye
              </label>
              <textarea
                className="block resize p-6 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                onChange={(e) => setSuggestion(e.target.value)}
                value={suggestion}
              />
            </div>
          </div>
          <div className="flex justify-center p-5">
            <div className="p-2">
              <button
                type="submit"
                onClick={() => setStatus(1)}
                className="text-white bg-red-700 hover:bg-red-800 cursor-pointer focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full lg:py-3 sm:w-auto px-5 py-2.5 text-center"
              >
                Rossz minőségű válasz
              </button>
            </div>
            <div className="p-2">
              <button
                type="submit"
                onClick={() => setStatus(2)}
                className="text-white bg-blue-700 hover:bg-blue-800 cursor-pointer focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full lg:py-3 sm:w-auto px-5 py-2.5 text-center"
              >
                Elfogadható minőségű válasz
              </button>
            </div>
            <div className="p-2">
              <button
                type="submit"
                onClick={() => setStatus(3)}
                className="text-white bg-green-700 hover:bg-green-800 cursor-pointer focus:ring-4 focus:outline-none focus:ring-geen-300 font-medium rounded-lg text-sm w-full lg:py-3 sm:w-auto px-5 py-2.5 text-center"
              >
                Jó minőségű válasz
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="flex justify-center pt-6">
        <p>{isLoading ? "Küldés..." : ""}</p>
      </div>
    </div>
  );
}
