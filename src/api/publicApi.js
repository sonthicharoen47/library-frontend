export const getWithTokenApi = async (api, params) => {
  const result = await fetch(api, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${params.token}`,
    },
  });
  return await result.json();
};

export const getWithoutTokenApi = async (api) => {
  const result = await fetch(api, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await result.json();
};

export const postWithTokenApi = async (api, params) => {
  const result = await fetch(api, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${params.token}`,
    },
    body: JSON.stringify(params.body),
  });
  return await result.json();
};

export const postWithoutTokenApi = async (api, params) => {
  const result = await fetch(api, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params.body),
  });
  return await result.json();
};

export const putWithTokenApi = async (api, params) => {
  const result = await fetch(api, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${params.token}`,
    },
    body: JSON.stringify(params.body),
  });
  return await result.json();
};
