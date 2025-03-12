import React, { useState } from "react";

const ProjectList = ({ projects, patchProject, deleteProject }) => {
  const [editIndex, setEditIndex] = useState(null);
  const [editedProject, setEditedProject] = useState({ name: "", description: "" });

  const startEditing = (index) => {
    setEditIndex(index);
    setEditedProject({ ...projects[index] }); // Load existing project data
  };

  const handlePatch = async () => {
    await patchProject(editIndex, editedProject);
    setEditIndex(null); // Exit edit mode after patch
  };

  return (
    <div>
      {projects.map((project, index) => (
        <div key={index} className="container" style={{ marginTop: "10px" }}>
          {editIndex === index ? (
            <>
              <input
                type="text"
                value={editedProject.name}
                onChange={(e) => setEditedProject({ ...editedProject, name: e.target.value })}
              />
              <input
                type="text"
                value={editedProject.description}
                onChange={(e) => setEditedProject({ ...editedProject, description: e.target.value })}
              />
              <button onClick={handlePatch}>Save</button>
            </>
          ) : (
            <>
              <p>{project.name}</p>
              <p>{project.description}</p>
              <button onClick={() => startEditing(index)}>PATCH</button>
              <button onClick={() => deleteProject(index)}>Delete</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
