import { getCookie } from "../App";

export type User = {
    picture: string;
    name: string;
    email: string;
}

export default async function getUser() {
  try {
    console.log(getCookie("access_token"))
    const response = await fetch("https://people.googleapis.com/v1/people/me?personFields=emailAddresses,names,photos&sources=READ_SOURCE_TYPE_PROFILE&key=AIzaSyCofiE5jlHTtCJxtaLFRqoym3lAdpR6qKs", {
      headers: {
        Authorization: `Bearer ${getCookie("access_token")}`,
        Accept: "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch user info: ${response.status}`);
    }
    return await response.json();
    
  } catch (error) {
    console.error(error);
  }
}
