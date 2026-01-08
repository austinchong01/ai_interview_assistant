const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const form = {
  async submit(formData) {
    try {
      const response = await fetch(`${API_BASE_URL}/form`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.message);

      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },
};
