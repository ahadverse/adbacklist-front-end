import "@/styles/globals.css";
import { createContext, useState } from "react";

export const MyContext = createContext();

export default function App({ Component, pageProps }) {
  const [blogcurrent, setBlogCurrent] = useState(1);
  const [catKey, setCatKey] = useState("");

  return (
    <MyContext.Provider
      value={{ blogcurrent, setBlogCurrent, catKey, setCatKey }}
    >
      <Component {...pageProps} />;
    </MyContext.Provider>
  );
}
