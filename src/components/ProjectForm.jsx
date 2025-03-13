import React, { useState, useEffect } from "react";

const ProjectForm = ({ POST, PUT, selectedProject }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    if (selectedProject) {
      setName(selectedProject.name);
      setDescription(selectedProject.description);
      setEditIndex(selectedProject.index);
    }
  }, [selectedProject]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !description.trim()) return;
  
    const newProject = { name, description };
  
    if (editIndex !== null) {
      PUT(editIndex, newProject);
    } else {
      POST(newProject); 
    }
  
    // Reset state after submission
    setName("");
    setDescription("");
    setEditIndex(null);
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Project Name" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Project Description" 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
      />
      <button type="submit">{editIndex !== null ? "PUT" : "POST"}</button>
    </form>
  );
};

export default ProjectForm;
