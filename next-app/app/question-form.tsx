"use client";
import { useRouter } from 'next/navigation';
import { useState, FormEvent } from "react";



export default function QuestionForm() {
    let [prompt, setPrompt] = useState("");
    let [isLoading, setIsLoading] = useState(false);
    let [isEmpty, setIsEmpty] = useState(false);
    let [isUser, setIsUser] = useState(false);
    let [answer, setAnswer] = useState("");
    let [source, setSource] = useState('')
    const router = useRouter();

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);
        let questionId = 0;
        try {
            if (prompt.trim().length > 0) {
                setIsEmpty(false);
                let question = {
                    prompt: prompt,
                    answer: isUser ? answer : null,
                    source: isUser ? "user" : source,
                }
                const response = await fetch("/api/question", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(question),
                });

                if (response.status !== 200) {
                    throw new Error("Failed to submit data");
                }
                const data = await response.json();
                questionId = data.id;
                router.push(`/?id=${questionId}`);
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
                    {isUser ? <p></p> :
                    <div className="flex justify-center pt-5">
                    <input
                        type="submit"
                        value="ChatGPT Válasz generálás"
                        className="text-white bg-blue-700 hover:bg-blue-800 cursor-pointer focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full lg:py-3 sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={() => setSource('GPT') }
                    />
                    <input
                        type="submit"
                        value="NYTUD-PULI Válasz generálás"
                        className="text-white bg-blue-700 hover:bg-blue-800 cursor-pointer focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full lg:py-3 sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={() => setSource('PULI') }
                    />
                </div>
                    }
                    {isUser ? <p></p> :
                        <div className="flex justify-center pt-5">
                            <p className="text-white bg-blue-700 hover:bg-blue-800 cursor-pointer focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full lg:py-3 sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                onClick={() => setIsUser(true)}
                            > Saját válasz írása</p>
                        </div>

                    }

                    {isUser ?
                        <div className="pt-5">
                            <label className="block uppercase tracking-wide text-gray-700 text-xl font-bold mb-2">
                                Válasz a kérdésre
                            </label>
                            <textarea
                                className="block resize p-6 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                onChange={(e) => setAnswer(e.target.value)}
                                value={answer}
                            />
                            <input type="submit"
                                value="Küldés"
                                className="text-white bg-blue-700 hover:bg-blue-800 cursor-pointer focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full lg:py-3 sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                ></input>

                        </div> : <p></p>

                    }


                </form>
            </div>
            <div className="flex justify-center pt-6">
                <p>{isLoading ? "Küldés..." : "Köszönjük! Adj meg egy másikat!"}</p>
            </div>
        </div>
    );
}
