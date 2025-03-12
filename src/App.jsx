import React, { useState, useEffect } from "react";
import ProjectForm from "./components/ProjectForm";
import ProjectList from "./components/ProjectList";
import { GET, POST, PUT, DELETE, PATCH } from "./api";
import "./index.css";

const App = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await GET();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
  }, []);

  const handlePost = async (project) => {
    const newProject = await POST(project);
    setProjects([...projects, newProject]);
  };

  const handlePut = async (index, updatedProject) => {
    const projectId = projects[index]._id;
    await PUT(projectId, updatedProject);

    const newProjects = [...projects];
    newProjects[index] = { ...updatedProject, _id: projectId };
    setProjects(newProjects);
    setSelectedProject(null);
  };

  const handlePatch = async (index, updatedFields) => {
    const projectId = projects[index]._id;
    const updatedProject = await PATCH(projectId, updatedFields);
  
    setProjects((prevProjects) =>
      prevProjects.map((project, i) =>
        i === index ? { ...project, ...updatedProject } : project
      )
    );
  };
  
  
  

  const handleDelete = async (index) => {
    const projectId = projects[index]._id;
    await DELETE(projectId);
    setProjects(projects.filter((_, i) => i !== index));
  };

  const editProject = (index) => {
    setSelectedProject({ ...projects[index], index });
  };

  return (
    <div className="container">
      <h2 style={{ textAlign: "center" }}>CRUD App</h2>
      <ProjectForm 
        POST={handlePost} 
        PUT={handlePut} 
        PATCH={handlePatch} 
        selectedProject={selectedProject} 
      />
      <ProjectList 
        projects={projects} 
        deleteProject={handleDelete} 
        editProject={editProject} 
        patchProject={handlePatch} 
      />
    </div>
  );
};

export default App;
