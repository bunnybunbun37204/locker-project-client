export async function sendRequest(
  url: string,
  { arg }: { arg: { user_id: string; locker_id: string; isBooked: string } }
) {
  console.log("ARG ", arg);

  return fetch(url, {
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    method: "POST",
    body: JSON.stringify(arg),
  }).then((res) => res.json());
}

export async function sendRequest2(url: string, ticket: string) {
  console.log(ticket);

  return fetch(url, {
    headers: {
      DeeAppId: "app.vercel.sci-locker",
      DeeAppSecret:
        "fc42f10ca65ec5a314f3e989dc69a08dc26868814d399c283c5cdb1bce485265ee873fc939305b313df67b155dd29b0a2535c67030fb5fe9e9755007abceace5",
      DeeTicket: ticket,
    },
    method: "GET",
    mode: "no-cors",
  })
    .then((res) =>
      res.json().then((data) => {
        console.log(data);
      })
    )
    .catch((err) => console.log("err" + err));
}

export const serviceValidation = async (
  ticket: string
): Promise<string | null> => {
  try {
    const url = `https://sci-locker.vercel.app/api/chulasso/${ticket}`;

    const response = await fetch(url, {
      mode:'no-cors'
    });

    if (response.ok) {
      console.log("OK");

      const jsonResponse = await response.json();
      console.log("jsonResponse :",jsonResponse);
      
      return jsonResponse;
    } else {
      console.log("ERROR");

      // Handle non-OK response (e.g., 404, 500, etc.)
      console.error(`Error: ${response.status} - ${response.statusText}`);
      return null;
    }
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};
