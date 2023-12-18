"use client";
import { redirect } from "next/navigation";
import { useState, FormEvent } from "react";

export default function QuestionForm() {
  let [prompt, setPrompt] = useState("");
  let [isLoading, setIsLoading] = useState(false);
  let [isEmpty, setIsEmpty] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    let questionId = 0;
    try {
      if (prompt.trim().length > 0) {
        setIsEmpty(false);
        const response = await fetch("/api/add-questtion", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: prompt,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to submit data");
        }
        const data = await response.json();
        questionId = data.id;
        redirect(`/answer/${questionId}`);
      } else {
        setIsEmpty(true);
      }
    } catch (error) {
      console.error("An error occurred while submitting:", error);
    } finally {
      setIsLoading(false);
      setPrompt("");
    }
  }

  return (
    <div>
      <div className="flex justify-center">
        <form className="w-3/4" onSubmit={onSubmit}>
          <div className="justify-center">
            {isEmpty ? (
              <p className="text-red-500 text-s italic">
                Adj meg promptot
              </p>
            ) : (
              <p></p>
            )}
            <div className="">
              <label className="block uppercase tracking-wide text-gray-700 text-xl font-bold mb-2">
                Kérdés (prompt)
              </label>
              <textarea
                className="block resize p-6 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                onChange={(e) => setPrompt(e.target.value)}
                value={prompt}
              />
            </div>
            
            
          </div>
          <div className="flex justify-center pt-5">
            <input
              type="submit"
              value="Beküldés"
              className="text-white bg-blue-700 hover:bg-blue-800 cursor-pointer focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full lg:py-3 sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            />
          </div>
        </form>
      </div>
      <div className="flex justify-center pt-6">
        <p>{isLoading ? "Küldés..." : "Köszönjük! Adj meg egy másikat!"}</p>
      </div>
    </div>
  );
}
