import { useState } from "react";
import "./ContactForm.css";

function ContactForm() {
  const [formData, setFormData] = useState({
    orderNumber: "",
    name: "",
    firstname: "",
    phone: "",
    email: "",
    message: "",
  });

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
        <button type="submit" className="ContactForm-button">
          Envoyer
        </button>
      </form>
    </section>
  );
}

export default ContactForm;
