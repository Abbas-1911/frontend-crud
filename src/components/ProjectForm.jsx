import React, { useState, useEffect } from "react";

const ProjectForm = ({ POST, PUT, PATCH, selectedProject }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (selectedProject) {
      setName(selectedProject.name || "");
      setDescription(selectedProject.description || "");
    }
  }, [selectedProject]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (selectedProject) {
      // If only updating description, use PATCH
      if (selectedProject.name === name) {
        PATCH(selectedProject.index, { description });
      } else {
        PUT(selectedProject.index, { name, description });
      }
    } else {
      POST({ name, description });
    }

    setName("");
    setDescription("");
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
      <button type="submit">{selectedProject ? "Update" : "Add"} Project</button>
    </form>
  );
};

export default ProjectForm;
