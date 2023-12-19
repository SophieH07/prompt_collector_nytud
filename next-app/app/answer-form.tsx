"use client";
import { useState, FormEvent, useEffect } from "react";
import { useSearchParams, useRouter } from 'next/navigation'

export default function Form() {
  let [prompt, setPrompt] = useState("");
  let [answer, setAnswer] = useState("");
  let [suggestion, setSuggestion] = useState("");
  let [status, setStatus] = useState("");
  let [isLoading, setIsLoading] = useState(false);
  let [isEmpty, setIsEmpty] = useState(false);
  const [fetchedPrompt, setFetchedPrompt] = useState(null);
  const searchParams = useSearchParams()

  const router = useRouter();
  useEffect(() => {
    async function fetchPrompt() {
      const promptId = searchParams.get('id')
      try {
        let response;
        if (!promptId) {
          response = await fetch("/api/db");  
        } else {
          response = await fetch(`/api/db?id=${promptId}`);
        }
        
        if (response.status === 200) {
          const data = await response.json();
          setFetchedPrompt(data);
          setPrompt(data.prompt);
          setAnswer(data.response || '');
        } else {
          console.error('Failed to fetch prompt');
        }
      } catch (error) {
        console.error('Error fetching prompt:', error);
      }
    }

    fetchPrompt();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value);
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    try {
      if (prompt.trim().length > 0 && answer.trim().length > 0) {
        setIsEmpty(false);
        const response = await fetch("/api/db", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: fetchedPrompt.id,
            prompt: prompt,
            suggestion: answer,
            status: status,
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
      setPrompt("");
      setAnswer("");
      setSuggestion("");
      setStatus("");
      router.push('/');
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
                Kérdés (prompt)
              </label>
              <textarea
                className="block resize p-6 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                onChange={(e) => setPrompt(e.target.value)}
                value={prompt}
              />
            </div>
            <div className="pt-5">
              <label className="block uppercase tracking-wide text-gray-700 text-xl font-bold mb-2">
                Válasz a kérdésre (javítható)
              </label>
              <textarea
                className="block resize p-6 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                onChange={(e) => setAnswer(e.target.value)}
                value={answer}
              />
            </div>
            
          </div>
          <div className="flex justify-center pt-5">
            <input
              type="submit"
              value="Rossz"
              className="text-white bg-red-700 hover:bg-red-800 cursor-pointer focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full lg:py-3 sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
              onClick={() => setStatus('BAD') }
            />
            <input
              type="submit"
              value="Rendben van"
              className="text-white bg-blue-700 hover:bg-blue-800 cursor-pointer focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full lg:py-3 sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => setStatus('FIX') }
            />
            <input
              type="submit"
              value="Remek válasz"
              className="text-white bg-green-700 hover:bg-blue-800 cursor-pointer focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full lg:py-3 sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              onClick={() => setStatus('PERFECT')}
            />
            <input
              type="submit"
              value="Javítottam"
              className="text-white bg-blue-700 hover:bg-blue-800 cursor-pointer focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full lg:py-3 sm:w-auto px-5 py-2.5 text-center dark:bg-white-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => setStatus('CORRECTED')}
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
