import { CreditCard, FileText, Lock, MapPin } from "lucide-react";
import { useState } from "react";
import { useBasket } from "../../contexts/ShopContext";

import "./ShopPayment.css";

type ShippingAddress = {
  firstName: string;
  lastName: string;
  street: string;
  streetNumber: string;
  zipCode: string;
  city: string;
  phone: string;
  email: string;
};

type BillingAddress = {
  sameAsShipping: boolean;
  firstName: string;
  lastName: string;
  street: string;
  streetNumber: string;
  zipCode: string;
  city: string;
};

// type PaymentMethod = {
//   cardNumber: string;
//   cardHolder: string;
//   expiryDate: string;
//   cvv: string;
// };

function ShopPayment() {
  const { basket } = useBasket();

  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    firstName: "",
    lastName: "",
    street: "",
    streetNumber: "",
    zipCode: "",
    city: "",
    phone: "",
    email: "",
  });

  const [billingAddress, setBillingAddress] = useState<BillingAddress>({
    sameAsShipping: true,
    firstName: "",
    lastName: "",
    street: "",
    streetNumber: "",
    zipCode: "",
    city: "",
  });

  // const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>({
  //   cardNumber: "",
  //   cardHolder: "",
  //   expiryDate: "",
  //   cvv: "",
  // });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const total = basket.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handleStripeCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !shippingAddress.firstName ||
      !shippingAddress.lastName ||
      !shippingAddress.street ||
      !shippingAddress.streetNumber ||
      !shippingAddress.zipCode ||
      !shippingAddress.city ||
      !shippingAddress.phone ||
      !shippingAddress.email
    ) {
      setError("Merci de remplir tous les champs");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const delivery = {
        firstName: shippingAddress.firstName,
        lastName: shippingAddress.lastName,
        street: shippingAddress.street,
        number: shippingAddress.streetNumber,
        zip: shippingAddress.zipCode,
        city: shippingAddress.city,
        phone: shippingAddress.phone,
      };

      //     const res = await fetch("http://localhost:3310/api/orders", {
      //       method: "POST",
      //       headers: { "Content-Type": "application/json" },
      //       credentials: "include",
      //       body: JSON.stringify({ delivery }),
      //     });

      //     if (!res.ok) {
      //       const body = await res.text();
      //       throw new Error(body || "Erreur lors du paiement");
      //     }

      //     // Vider le panier côté front-end
      //     await clearBasket();
      //     navigate("/ThankYou");
      //   } catch (err) {
      //     setError(err instanceof Error ? err.message : "Erreur inconnue");
      //   } finally {
      //     setLoading(false);
      //   }
      // };

      //création d'une session stripe
      const res = await fetch(
        "http://localhost:3310/api/stripe/create-checkout-session",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            delivery,
            email: shippingAddress.email,
          }),
        },
      );

      if (!res.ok) {
        const body = await res.text();
        throw new Error(
          body || "Erreur lors de la création de la session de paiement",
        );
      }

      const { url } = await res.json();

      // Redirection vers Stripe Checkout
      window.location.href = url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
      setLoading(false);
    }
  };

  if (basket.length === 0) return <p>Votre panier est vide</p>;

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <h1 className="checkout-main-title">Finaliser votre commande</h1>

        <div className="checkout-grid">
          <div className="checkout-left">
            {/* Adresse de livraison */}
            <section className="checkout-section">
              <div className="checkout-section-header">
                <MapPin className="checkout-icon" />
                <h2>Adresse de livraison</h2>
              </div>

              <div className="checkout-form-grid">
                <div className="checkout-form-group">
                  <label htmlFor="ship-firstName">Prénom *</label>
                  <input
                    type="text"
                    id="ship-firstName"
                    required
                    value={shippingAddress.firstName}
                    onChange={(e) =>
                      setShippingAddress({
                        ...shippingAddress,
                        firstName: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="checkout-form-group">
                  <label htmlFor="ship-lastName">Nom *</label>
                  <input
                    type="text"
                    id="ship-lastName"
                    required
                    value={shippingAddress.lastName}
                    onChange={(e) =>
                      setShippingAddress({
                        ...shippingAddress,
                        lastName: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="checkout-form-group checkout-col-2">
                  <label htmlFor="ship-email">Email *</label>
                  <input
                    type="email"
                    id="ship-email"
                    placeholder="votre@email.com"
                    required
                    value={shippingAddress.email}
                    onChange={(e) =>
                      setShippingAddress({
                        ...shippingAddress,
                        email: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="checkout-form-group checkout-col-1">
                  <label htmlFor="ship-streetNumber">N° *</label>
                  <input
                    type="text"
                    id="ship-streetNumber"
                    required
                    value={shippingAddress.streetNumber}
                    onChange={(e) =>
                      setShippingAddress({
                        ...shippingAddress,
                        streetNumber: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="checkout-form-group checkout-col-3">
                  <label htmlFor="ship-street">Rue *</label>
                  <input
                    type="text"
                    id="ship-street"
                    required
                    value={shippingAddress.street}
                    onChange={(e) =>
                      setShippingAddress({
                        ...shippingAddress,
                        street: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="checkout-form-group">
                  <label htmlFor="ship-zipCode">Code postal *</label>
                  <input
                    type="text"
                    id="ship-zipCode"
                    required
                    value={shippingAddress.zipCode}
                    onChange={(e) =>
                      setShippingAddress({
                        ...shippingAddress,
                        zipCode: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="checkout-form-group">
                  <label htmlFor="ship-city">Ville *</label>
                  <input
                    type="text"
                    id="ship-city"
                    required
                    value={shippingAddress.city}
                    onChange={(e) =>
                      setShippingAddress({
                        ...shippingAddress,
                        city: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="checkout-form-group checkout-col-2">
                  <label htmlFor="ship-phone">Téléphone *</label>
                  <input
                    type="tel"
                    id="ship-phone"
                    required
                    value={shippingAddress.phone}
                    onChange={(e) =>
                      setShippingAddress({
                        ...shippingAddress,
                        phone: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </section>

            {/* Adresse de facturation */}
            <section className="checkout-section">
              <div className="checkout-section-header">
                <FileText className="checkout-icon" />
                <h2>Adresse de facturation</h2>
              </div>

              <div className="checkout-checkbox-group">
                <input
                  type="checkbox"
                  id="sameAsShipping"
                  checked={billingAddress.sameAsShipping}
                  onChange={(e) =>
                    setBillingAddress({
                      ...billingAddress,
                      sameAsShipping: e.target.checked,
                    })
                  }
                />
                <label htmlFor="sameAsShipping">
                  Identique à l'adresse de livraison
                </label>
              </div>

              {!billingAddress.sameAsShipping && (
                <div className="checkout-form-grid">
                  <div className="checkout-form-group">
                    <label htmlFor="bill-firstName">Prénom *</label>
                    <input
                      type="text"
                      id="bill-firstName"
                      required
                      value={billingAddress.firstName}
                      onChange={(e) =>
                        setBillingAddress({
                          ...billingAddress,
                          firstName: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="checkout-form-group">
                    <label htmlFor="bill-lastName">Nom *</label>
                    <input
                      type="text"
                      id="bill-lastName"
                      required
                      value={billingAddress.lastName}
                      onChange={(e) =>
                        setBillingAddress({
                          ...billingAddress,
                          lastName: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="checkout-form-group checkout-col-1">
                    <label htmlFor="bill-streetNumber">N° *</label>
                    <input
                      type="text"
                      id="bill-streetNumber"
                      required
                      value={billingAddress.streetNumber}
                      onChange={(e) =>
                        setBillingAddress({
                          ...billingAddress,
                          streetNumber: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="checkout-form-group checkout-col-3">
                    <label htmlFor="bill-street">Rue *</label>
                    <input
                      type="text"
                      id="bill-street"
                      required
                      value={billingAddress.street}
                      onChange={(e) =>
                        setBillingAddress({
                          ...billingAddress,
                          street: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="checkout-form-group">
                    <label htmlFor="bill-zipCode">Code postal *</label>
                    <input
                      type="text"
                      id="bill-zipCode"
                      required
                      value={billingAddress.zipCode}
                      onChange={(e) =>
                        setBillingAddress({
                          ...billingAddress,
                          zipCode: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="checkout-form-group">
                    <label htmlFor="bill-city">Ville *</label>
                    <input
                      type="text"
                      id="bill-city"
                      required
                      value={billingAddress.city}
                      onChange={(e) =>
                        setBillingAddress({
                          ...billingAddress,
                          city: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              )}
            </section>

            {/* Paiement avec Stripe */}
            <section className="checkout-section">
              <div className="checkout-section-header">
                <CreditCard className="checkout-icon" />
                <h2>Paiement sécurisé</h2>
              </div>

              <div className="checkout-stripe-info">
                <Lock className="checkout-security-icon" />
                <div>
                  <p className="checkout-stripe-title">
                    Paiement 100% sécurisé avec Stripe
                  </p>
                  <p className="checkout-stripe-text">
                    Vos informations bancaires sont protégées et cryptées. Nous
                    n'avons jamais accès à vos données de carte bancaire.
                  </p>
                </div>
              </div>

              <div className="checkout-stripe-logos">
                <span className="checkout-payment-badge">💳 Visa</span>
                <span className="checkout-payment-badge">💳 Mastercard</span>
                <span className="checkout-payment-badge">💳 Amex</span>
              </div>
            </section>

            {error && <div className="checkout-error">{error}</div>}

            <button
              type="button"
              onClick={handleStripeCheckout}
              disabled={loading}
              className="checkout-submit-button"
            >
              {loading
                ? "Redirection vers Stripe..."
                : "Procéder au paiement sécurisé"}
            </button>

            <p className="checkout-disclaimer">
              En validant votre commande, vous acceptez nos{" "}
              <a href="/Cgu">conditions générales de vente</a>
            </p>
          </div>

          <div className="checkout-right">
            <div className="checkout-summary">
              <h2 className="checkout-summary-title">
                Récapitulatif de commande
              </h2>

              <div className="checkout-summary-items">
                {basket.map((item) => (
                  <div key={item.idwatch} className="checkout-summary-item">
                    <h3>
                      {item.brand} {item.model}
                    </h3>
                    <p>{item.quantity} = </p>
                    <p>{item.price * item.quantity} €</p>
                  </div>
                ))}
              </div>
              <div className="checkout-summary-total">
                <p>Total : {total} €</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopPayment;
