import { useEffect, useState } from "react";

import { ChevronDown, ChevronUp } from "lucide-react";

import "./ComponentFaq.css";

interface QuestionsI {
  idtable1: number;
  question: string;
  answer: string;
}

function ComponentsFaq() {
  const [activeId, setActiveId] = useState<number | null>(null);
  const toggleQuestion = (id: number) => {
    setActiveId(activeId === id ? null : id);
  };

  const [questions, setQuestions] = useState<QuestionsI[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/faq`)
      .then((response) => response.json())
      .then((data: QuestionsI[]) => {
        setQuestions(data);
      });
  }, []);

  return (
    <section className="ComponentFaq-section">
      <h1 className="ComponentFaq-h1">Vous vous poser une question?</h1>
      <h2 className="ComponentFaq-h2">
        Votre question concernant L’Écrin du temps a peut-être déjà été posée.
        Si c’est le cas, vous la trouverez ici.
      </h2>
      <div className="ComponentFaq-question-list">
        {questions.map((item) => (
          <div key={item.idtable1} className="faq-item">
            <button
              type="button"
              className="ComponentFaq-question"
              onClick={() => toggleQuestion(item.idtable1)}
            >
              {item.question}
              <span className="ComponentFaq-icon">
                {activeId === item.idtable1 ? <ChevronUp /> : <ChevronDown />}
              </span>
            </button>

            <div
              className={`ComponentFaq-answer ${activeId === item.idtable1 ? "active" : ""}`}
            >
              <p>{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ComponentsFaq;
