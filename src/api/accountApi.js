export const registerAccount = async (api, body) => {
  const result = await fetch(api, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return await result.json();
};
