export async function logInUser(url: string, { args } : {args : string}) {
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: args
    });
  }
  