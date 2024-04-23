import { getCookie } from "../App";

type Props = {
  setProfile: React.Dispatch<any>;
};

export default function getUser({ setProfile }: Props) {
  try {
    async () => {
      const response = await fetch(
        "https://people.googleapis.com/v1/people/me",
        {
          headers: {
            Authorization: `Bearer ${getCookie("access_token")}`,
            Accept: "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch user info: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      setProfile(data);
    };
  } catch (error) {
    console.error(error);
  }
}
