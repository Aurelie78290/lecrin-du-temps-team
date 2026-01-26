import { CreditCard, FileText, MapPin } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
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

type PaymentMethod = {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
};

function ShopPayment() {
  const { basket, clearBasket } = useBasket();
  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    firstName: "",
    lastName: "",
    street: "",
    streetNumber: "",
    zipCode: "",
    city: "",
    phone: "",
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

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const total = basket.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !shippingAddress.firstName ||
      !shippingAddress.street ||
      !shippingAddress.zipCode ||
      !shippingAddress.city
    ) {
      setError("Merci de remplir tous les champs");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const delivery = {
        street: shippingAddress.street,
        number: shippingAddress.streetNumber,
        zip: shippingAddress.zipCode,
        city: shippingAddress.city,
      };

      const res = await fetch("http://localhost:3310/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ delivery }),
      });

      if (!res.ok) {
        const body = await res.text();
        throw new Error(body || "Erreur lors du paiement");
      }

      // Vider le panier côté front-end
      await clearBasket();
      navigate("/ThankYou");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  };

  if (basket.length === 0) return <p>Votre panier est vide</p>;

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <h1>Finaliser votre commande</h1>

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

            {/* Paiement */}
            <section className="checkout-section">
              <div className="checkout-section-header">
                <CreditCard className="checkout-icon" />
                <h2>Mode de paiement</h2>
              </div>

              <div className="checkout-form-grid">
                <div className="checkout-form-group checkout-col-2">
                  <label htmlFor="cardNumber">Numéro de carte *</label>
                  <input
                    type="text"
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    required
                    maxLength={19}
                    value={paymentMethod.cardNumber}
                    onChange={(e) =>
                      setPaymentMethod({
                        ...paymentMethod,
                        cardNumber: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="checkout-form-group checkout-col-2">
                  <label htmlFor="cardHolder">Titulaire de la carte *</label>
                  <input
                    type="text"
                    id="cardHolder"
                    placeholder="Votre nom"
                    required
                    value={paymentMethod.cardHolder}
                    onChange={(e) =>
                      setPaymentMethod({
                        ...paymentMethod,
                        cardHolder: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="checkout-form-group">
                  <label htmlFor="expiryDate">Date d'expiration *</label>
                  <input
                    type="text"
                    id="expiryDate"
                    placeholder="MM/AA"
                    required
                    maxLength={5}
                    value={paymentMethod.expiryDate}
                    onChange={(e) =>
                      setPaymentMethod({
                        ...paymentMethod,
                        expiryDate: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="checkout-form-group">
                  <label htmlFor="cvv">CVV *</label>
                  <input
                    type="text"
                    id="cvv"
                    placeholder="123"
                    required
                    maxLength={3}
                    value={paymentMethod.cvv}
                    onChange={(e) =>
                      setPaymentMethod({
                        ...paymentMethod,
                        cvv: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </section>

            {error && <div className="checkout-error">{error}</div>}

            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="checkout-submit-button"
            >
              {loading ? "Traitement en cours..." : "Valider la commande"}
            </button>
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
