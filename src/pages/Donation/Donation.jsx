import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import paymentService from "../../services/payment";
import { useTranslation } from 'react-i18next';
import "./Donation.scss";

const stripePromise = loadStripe(
  "pk_live_51P1rynRxIKwhkMzkNeR23eW7Nbo79APpVCo4t8GCGCfqFKSPCOt6alPPwwpeaUoreon2Nb9FxAhyBeNekt4AvW2j00ZN852as5"
);

function Donation() {
  const [amount, setAmount] = useState("");
  const { t, i18n } = useTranslation("global");

  const handleAmountChange = (event) => {
    const value = event.target.value;
    if (value === "0" || value === "") {
      setAmount("1");
    } else if (!isNaN(value)) {
      setAmount(value);
    }
  };

  const handlePayment = async () => {
    try {
      const amountInCents = parseFloat(amount) * 100;

      const { sessionId } = await paymentService(amountInCents);

      const stripe = await stripePromise;

      const { error } = await stripe.redirectToCheckout({
        sessionId: sessionId,
      });

      if (error) {
        console.error("Error al redireccionar al checkout:", error);
      }
    } catch (error) {
      console.error("Error al procesar el pago:", error);
    }
  };

  return (
    <div>
      <h2 className="donationTitle">{t("donation.donation")}</h2>
      <input
        className="donationInput"
        type="number"
        value={amount}
        onChange={handleAmountChange}
        min="1"
        step="0.01"
        placeholder={t("donation.amount")}
      />
      <button
        className="payButton"
        onClick={handlePayment}
        style={{
          padding: "11px",
          borderRadius: "5px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          fontSize: "16px",
          borderTopLeftRadius: "0px",
          borderBottomLeftRadius: "0px",
          cursor: "pointer",
          transition: "background-color 0.3s ease",
        }}
      >
        {t("donation.donate")}
      </button>
    </div>
  );
}

export default Donation;
