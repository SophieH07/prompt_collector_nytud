import Footer from "@/app/layout/footer";
import NavBar from "@/app/layout/navbar";
import QuestionForm from "@/app/question-form";



export default function AddQuestion() {
  return (
    <div>
      <NavBar text="question" />
      <main className="py-20 min-h-screen">
        <QuestionForm />
      </main>
      <Footer />
    </div>
  );
}