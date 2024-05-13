import { useState } from "react";

async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

function useForceUpdate() {
  const [_, setValue] = useState(0); // integer state
  return () => setValue((value) => value + 1);
}

export { postData, useForceUpdate };
