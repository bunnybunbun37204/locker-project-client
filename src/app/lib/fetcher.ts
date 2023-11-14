export async function sendRequest(
    url: string,
    { arg }: { arg: { username: string; locker_id: string, isBooked : string } }
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