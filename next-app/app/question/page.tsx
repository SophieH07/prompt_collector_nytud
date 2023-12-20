"use client"
import Footer from "@/app/layout/footer";
import NavBar from "@/app/layout/navbar";
import QuestionSuggestionForm from "@/app/question-suggestion-form";



export default function AddQuestion() {
  return (
    <div>
      <NavBar  />
      <main className="py-20 min-h-screen">
        <QuestionSuggestionForm />
      </main>
      <Footer />
    </div>
  );
}