import NavBar from "../layout/navbar";
import Footer from "../layout/footer";
import AnswerSuggestionForm from "../answer-suggestion-form";

export default function Home() {
  return (
    <div>
      <NavBar />
      <main className="py-20 min-h-screen">
        <AnswerSuggestionForm />
      </main>
      <Footer />
    </div>
  );
}
