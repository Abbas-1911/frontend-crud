import React, { useState } from "react";
import { PATCH } from "../api"; // Import PATCH function

const ProjectList = ({ projects, deleteProject, editProject }) => {
  const [visibleDescriptions, setVisibleDescriptions] = useState({});
  const [editingIndex, setEditingIndex] = useState(null);
  const [editData, setEditData] = useState({ name: "", description: "" });

  const toggleDescription = (index) => {
    setVisibleDescriptions((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditData({ name: projects[index].name, description: projects[index].description });
  };

  const handlePatch = async (index) => {
    const projectId = projects[index]._id;
    await PATCH(projectId, editData);

    // Update UI
    projects[index].name = editData.name;
    projects[index].description = editData.description;
    setEditingIndex(null);
  };

  return (
    <div>
      {projects.map((project, index) => (
        <div key={index} className="container" style={{ marginTop: "10px", padding: "10px", border: "1px solid #ddd", borderRadius: "5px" }}>
          {editingIndex === index ? (
            <>
              <input
                type="text"
                value={editData.name}
                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
              />
              <input
                type="text"
                value={editData.description}
                onChange={(e) => setEditData({ ...editData, description: e.target.value })}
              />
              <button onClick={() => handlePatch(index)}>SAVE</button>
              <button onClick={() => setEditingIndex(null)}>CANCEL</button>
            </>
          ) : (
            <>
              <p><strong>{project.name}</strong></p>
              {visibleDescriptions[index] && <p>{project.description}</p>}
              <button onClick={() => toggleDescription(index)}>GET</button>
              <button onClick={() => startEditing(index)}>PATCH</button>
              <button onClick={() => editProject(index)}>PUT</button>
              <button onClick={() => deleteProject(index)}>DELETE</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
