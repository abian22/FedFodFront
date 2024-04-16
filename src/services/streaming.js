import api from "./serviceConfig";

async function obtenerVideo() {
    try {
        const response = await api.get(`/streaming`, {
            headers: {
              token: localStorage.getItem("token"),
            },
          });
          return response.data;
        } catch (error) {
          console.error("Error at streaming", error);
          throw error;
        }
    }

export { obtenerVideo };
