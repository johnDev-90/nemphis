export const getProducts = async () => {
  try {
    const response = await fetch("http://localhost:3000/products", {
      method: "GET",
    });

    const result = await response.json();

    if (!response.ok) {
      console.log("Ocurrio un error en la base de datos");
      return;
    }

    return result;
  } catch (error) {
    console.log(error);
  }
};
