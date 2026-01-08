import emailjs from "emailjs-com";
import { useState } from "react";
import "./ContactForm.css";

function ContactForm() {
  const initialFormData = {
    name: "",
    firstname: "",
    email: "",
    phone: "",
    orderNumber: "",
    message: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);

    emailjs
      .send(
        "service_n08sf07",
        "template_nus5wxl",
        formData,
        "mu4sY2ibq8MbronjD",
      )
      .then(() => {
        setIsSubmitted(true);
        setFormData(initialFormData);

        // Pour faire disparaitre le message au bout de 3 secondes
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      })
      .catch((error) => {
        console.error("Erreur lors de l’envoi :", error);
      });
  };

  return (
    <section className="ContactForm-section">
      <h1 className="ContactForm-title">Toujours à votre écoute.</h1>
      <h2 className="ContactForm-subtitle">
        Si vous ne trouvez pas rapidement la réponse à votre question, n'hésitez
        pas à nous contacter directement.
      </h2>

      <form className="ContactForm" onSubmit={handleSubmit}>
        <label>
          Numéro de commande (optionnel)
          <input
            type="text"
            name="orderNumber"
            value={formData.orderNumber}
            onChange={handleChange}
            placeholder="Ex : CMD-123456"
          />
        </label>
        <label>
          Votre Email*
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Renseignez votre email..."
          />
        </label>
        <label>
          Votre numéro de téléphone
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Renseignez votre numéro de téléphone..."
          />
        </label>
        <label>
          Votre Nom*
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Renseignez votre Nom..."
          />
        </label>
        <label>
          Votre Prénom
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            placeholder="Renseignez votre prénom..."
          />
        </label>
        <label>
          Votre Message*
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            placeholder="Ecrivez votre message ici..."
          />
        </label>
        <p id="contact-instructions" className="ContactFormInstructions">
          * Tous les champs marqués d'un astérisque sont obligatoires.
        </p>
        <div className="ContactForm-validation">
          <button type="submit" className="ContactForm-button">
            Envoyer
          </button>
          {isSubmitted && (
            <p className="ContactForm-success">
              ✅ Votre message a bien été envoyé !
            </p>
          )}
        </div>
      </form>
    </section>
  );
}

export default ContactForm;
