import React from "react";
import { createRoot } from "react-dom/client";
import StudentForm from "./components/StudentForm";
import "../css/StudentForm.css";

const appElement = document.getElementById("app");
if (appElement) {
    const root = createRoot(appElement);
    root.render(<StudentForm />);
}
