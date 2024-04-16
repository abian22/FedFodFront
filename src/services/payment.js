import api from "./serviceConfig";

async function paymentService(amount) {
  try {
    const response = await api.post("/payment", { amount }, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error al procesar el pago");
  }
}

export default paymentService;
