"use client";
/* eslint no-use-before-define: 0 */
import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AnswerSuggestionForm() {
  let [prompt, setPrompt] = useState("");
  let [answer, setAnswer] = useState("");
  let [suggestion, setSuggestion] = useState("");
  let [status, setStatus] = useState("");
  let [isLoading, setIsLoading] = useState(false);
  let [isEmpty, setIsEmpty] = useState(false);
  const [fetchedPrompt, setFetchedPrompt] = useState(null);

  const router = useRouter();
  async function fetchPrompt() {
    try {
      const response = await fetch("/api/answer-suggest");
      if (response.status === 200) {
        const data = await response.json();
        setFetchedPrompt(data);
        setPrompt(data.prompt);
        setAnswer(data.response || "");
      } else {
        console.error("Failed to fetch prompt");
      }
    } catch (error) {
      console.error("Error fetching prompt:", error);
    }
  }
  useEffect(() => {
    fetchPrompt();
  }, []);

  const restoreForm = () => {
    setPrompt(fetchedPrompt.prompt);
    setAnswer(fetchedPrompt.response || "");
    setSuggestion("");
    setStatus("");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setStatus(event.target.value);
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    try {
      if (prompt.trim().length > 0 && answer.trim().length > 0) {
        setIsEmpty(false);
        const response = await fetch("/api/answer-suggest", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: fetchedPrompt.id,
            suggestion: answer,
            status: status || "UNGRADED",
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to submit data");
        }
      } else {
        setIsEmpty(true);
      }
    } catch (error) {
      console.error("An error occurred while submitting:", error);
    } finally {
      setIsLoading(false);
      restoreForm();
      fetchPrompt();
    }
  }

  return (
    <div>
      <div className="flex justify-center">
        <form className="w-3/4" onSubmit={onSubmit}>
          <div className="justify-center">
            {isEmpty ? (
              <p className="text-red-500 text-s italic">
                Adj meg promptot és választ is
              </p>
            ) : (
              <p></p>
            )}
            <div className="">
              <label className="block uppercase tracking-wide text-gray-700 text-xl font-bold mb-2">
                Kérdés
              </label>
              <textarea
                className="block resize p-6 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                onChange={(e) => setPrompt(e.target.value)}
                readOnly
                value={prompt}
              />
            </div>
            <div className="pt-5">
              <label className="block uppercase tracking-wide text-gray-700 text-xl font-bold mb-2">
                Válasz {fetchedPrompt?.id - 5000}/5000
              </label>
              <textarea
                className="block resize p-6 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                readOnly
                value={fetchedPrompt?.response || ""}
              />
            </div>
            <div className="flex space-x-4">
              <input
                type="radio"
                id="bad"
                name="status"
                value="BAD"
                onChange={handleChange}
              />
              <label htmlFor="bad">Rossz</label>
              <input
                type="radio"
                id="faulty"
                name="status"
                value="FAULTY"
                onChange={handleChange}
              />
              <label htmlFor="faulty">Hibás</label>
              <input
                type="radio"
                id="medium"
                name="status"
                value="MEDIUM"
                onChange={handleChange}
              />
              <label htmlFor="medium">Közepes</label>
              <input
                type="radio"
                id="good"
                name="status"
                value="GOOD"
                onChange={handleChange}
              />
              <label htmlFor="good">Rendben van</label>
              <input
                type="radio"
                id="perfect"
                name="status"
                value="PERFECT"
                onChange={handleChange}
              />
              <label htmlFor="perfect">Tökéletes</label>
            </div>

            <div className="pt-5">
              <label className="block uppercase tracking-wide text-gray-700 text-xl font-bold mb-2">
                Válasz javítás
              </label>
              <textarea
                className="block resize p-6 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                onChange={(e) => setAnswer(e.target.value)}
                value={answer}
              />
            </div>
          </div>
          <div className="justify-center flex space-x-16 pt-4">
            <input
              type="submit"
              value="Kihagyás"
              className="text-white bg-red-700 hover:bg-red-800 cursor-pointer focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full lg:py-3 sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
              onClick={() => restoreForm()}
            />
            <input
              type="button"
              value="Újra"
              className="text-white bg-green-500 hover:bg-green-600 cursor-pointer focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full lg:py-3 sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              onClick={() => restoreForm()}
            />
            <input
              type="submit"
              value="Mehet"
              className="text-white bg-blue-700 hover:bg-blue-800 cursor-pointer focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full lg:py-3 sm:w-auto px-5 py-2.5 text-center dark:bg-white-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            />
          </div>
        </form>
      </div>
      <div className="flex justify-center pt-6">
        <p>{isLoading ? "Küldés..." : ""}</p>
      </div>
    </div>
  );
}
