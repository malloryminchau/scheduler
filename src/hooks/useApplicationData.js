import React, { useState } from "react"

export default function useApplicationData(state) {


  return { state, setDay, bookInterview, cancelInterview };

}