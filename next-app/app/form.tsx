"use client";
import { useState, FormEvent } from "react";

export default function Form() {
  let [prompt, setPrompt] = useState("");
  let [answer, setAnswer] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const response = await fetch("/api/db", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: prompt, response: answer }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit data");
      }
    } catch (error) {
      console.error("An error occurred while submitting:", error);
    }
  }

  return (
    <div className="flex justify-center">
      <form className="w-full max-w-lg" onSubmit={onSubmit}>
        <div className="flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xl font-bold mb-2">
              prompt
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="text"
              onChange={(e) => setPrompt(e.target.value)}
              value={prompt}
            />
            <p className="text-red-500 text-xs italic">
              Adj meg promptot és választ is
            </p>
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xl font-bold mb-2">
              válasz
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              onChange={(e) => setAnswer(e.target.value)}
              value={answer}
            />
            <p className="text-red-500 text-xs italic">
              Adj meg promptot és választ is
            </p>
          </div>
        </div>
        <input
          type="submit"
          value="Beküld"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        />
      </form>
    </div>
  );
}
