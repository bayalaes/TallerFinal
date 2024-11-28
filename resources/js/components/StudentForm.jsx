import React, { useState, useEffect } from "react";
import axios from "axios";

const StudentForm = () => {
    const [name, setName] = useState("");
    const [grade, setGrade] = useState("");
    const [students, setStudents] = useState([]);
    const [bestStudent, setBestStudent] = useState(null);
    const [worstStudent, setWorstStudent] = useState(null);
    const [loading, setLoading] = useState(true); // Estado para manejar la carga

    const fetchStudents = async () => {
        try {
            const result = await axios.get("/api/students"); // Cambia a /api/students si el proxy está configurado
            if (Array.isArray(result.data)) {
                setStudents(result.data);
            } else {
                console.error("La respuesta no es un arreglo:", result.data);
                setStudents([]);
            }
        } catch (error) {
            console.error("Error al obtener estudiantes:", error);
            setStudents([]);
        } finally {
            setLoading(false);
        }
    };

    const fetchBestStudent = async () => {
        try {
            const result = await axios.get("/api/students/best");
            setBestStudent(result.data);
        } catch (error) {
            console.error("Error al obtener el mejor estudiante:", error);
        }
    };

    const fetchWorstStudent = async () => {
        try {
            const result = await axios.get("/api/students/worst");
            setWorstStudent(result.data);
        } catch (error) {
            console.error("Error al obtener el peor estudiante:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/api/students", { name, grade });
            fetchStudents(); // Refresca la lista de estudiantes después de agregar uno nuevo
            setName("");
            setGrade("");
        } catch (error) {
            console.error("Error al agregar estudiante:", error);
        }
    };

    useEffect(() => {
        fetchStudents();
        fetchBestStudent();
        fetchWorstStudent();
    }, []);

    if (loading) {
        return <div>Cargando...</div>; // Muestra un mensaje de carga
    }

    return (
        <div>
            <h1>Agregar Estudiante</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Nota</label>
                    <input
                        type="number"
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)}
                        required
                        min="0"
                        max="100"
                    />
                </div>
                <button type="submit">Agregar</button>
            </form>
            <h2>Estudiantes</h2>
            <ul>
                {Array.isArray(students) && students.length > 0 ? (
                    students.map((student) => (
                        <li key={student._id}>
                            {student.name} - {student.grade}
                        </li>
                    ))
                ) : (
                    <li>No hay estudiantes disponibles.</li>
                )}
            </ul>
            <h2>Mejor Nota</h2>
            {bestStudent && (
                <p>
                    {bestStudent.name} - {bestStudent.grade}
                </p>
            )}
            <h2>Peor Nota</h2>
            {worstStudent && (
                <p>
                    {worstStudent.name} - {worstStudent.grade}
                </p>
            )}
        </div>
    );
};

export default StudentForm;
