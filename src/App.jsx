import React, { useState, useEffect } from "react";
import ProjectForm from "./components/ProjectForm";
import ProjectList from "./components/ProjectList";
import { GET, POST, PUT, DELETE } from "./api"; // Import API functions
import "./index.css";

const App = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  // Fetch projects from backend on page load
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await GET();
        setProjects(data); // Load existing projects
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
  }, []);

  const handlePost = async (project) => {
    const newProject = await POST(project);
    setProjects([...projects, newProject]); // Add new project
  };

  const handlePut = async (index, updatedProject) => {
    const projectId = projects[index]._id; // Get ID from database
    await PUT(projectId, updatedProject);
    
    const newProjects = [...projects];
    newProjects[index] = { ...updatedProject, _id: projectId };
    setProjects(newProjects);
    setSelectedProject(null);
  };

  const handleDelete = async (index) => {
    const projectId = projects[index]._id;
    await DELETE(projectId);

    const newProjects = projects.filter((_, i) => i !== index);
    setProjects(newProjects);
  };

  const editProject = (index) => {
    setSelectedProject({ ...projects[index], index });
  };

  return (
    <div className="container">
      <h2 style={{ textAlign: "center" }}>CRUD App</h2>
      <ProjectForm POST={handlePost} PUT={handlePut} selectedProject={selectedProject} />
      
      {/* Make the project list scrollable */}
      <div className="project-list-container">
        <ProjectList projects={projects} deleteProject={handleDelete} editProject={editProject} />
      </div>
    </div>
  );
  
  
};

export default App;
