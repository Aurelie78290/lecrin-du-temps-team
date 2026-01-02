import { useState } from "react";

import { ChevronDown, ChevronUp } from "lucide-react";

import "./ComponentFaq.css";

const questions = [
  {
    idtable: 1,
    question: "Comment acheter une montre sur le site l'Ecrin du temps?",
    answer: "Il suffit de cliquer sur acheter et de se laisser guider ",
  },
  {
    idtable: 2,
    question: "Que comprend le prix de vente d'une montre",
    answer:
      "Il comprend le prix de la montre, le montant de la TVA ainsi qu'une commission pour le site l'Ecrin du temps",
  },
];

function ComponentsFaq() {
  const [activeId, setActiveId] = useState<number | null>(null);

  const toggleQuestion = (id: number) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <section className="ComponentFaq-section">
      <h1>Vous vous poser une question?</h1>
      <h2>
        Votre question concernant L’Écrin du temps a peut-être déjà été posée.
        Si c’est le cas, vous la trouverez ici.
      </h2>
      <div className="ComponentFaq-question-list">
        {questions.map((item) => (
          <div
            key={item.idtable}
            className={`faq-item ${activeId === item.idtable ? "active" : ""}`}
          >
            <button
              type="button"
              className="ComponentFaq-question"
              onClick={() => toggleQuestion(item.idtable)}
            >
              {item.question}
              <span className="ComponentFaq-icon">
                {activeId === item.idtable ? <ChevronUp /> : <ChevronDown />}
              </span>
            </button>
            {activeId === item.idtable && (
              <div className="ComponentFaq-answer">
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default ComponentsFaq;
