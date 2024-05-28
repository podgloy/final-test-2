"use client";

import axios from "axios";
import { useState } from "react";

export default function Home() {

  const [answer, setAnswer] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  async function note(event) {
    event.preventDefault();
    setIsLoading(true);


    const gender = event.target.gender.value;
    const appearance = event.target.appearance.value;

    const response = await axios.post("/api/create-image", {
      gender,
      appearance
    })

    console.log(response.data)
    setAnswer(response.data.answer)
    setIsLoading(false);

  }

  return (
    <div>
      <form onSubmit={note} className="flex flex-col">

        <input className="border-slate-500" type="text" name="gender" placeholder="gender" />
        <input className="border-slate-500" type="text" name="appearance" placeholder="appearance" />

        <button type="submit" disabled={isLoading}>{isLoading ? 'Loading' : 'Submit'}</button>

      </form>
      <p className="p-4">{isLoading ? 'Loading...' : ''}</p>
      {/* <p className="p-4">{answer}</p> */}
      {answer && <img src={answer} className="w-full"/>}
      
    </div>
  );
}