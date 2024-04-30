import ProjectCard from "../components/Projects/ProjectCard";
import styles from "../components/Projects/Projects.module.css";

const Projects = () => {
  return (
    <div className={styles.projectsContainer}>
      <ProjectCard title="Project 1">
        <p>Project 1 description</p>
      </ProjectCard>
      <ProjectCard title="Project 2">
        <p>Project 2 description</p>
      </ProjectCard>
      <ProjectCard title="Project 3">
        <p>Project 3 description</p>
      </ProjectCard>
      <ProjectCard title="Project 4">
        <p>Project 4 description</p>
      </ProjectCard>
    </div>
  );
};

export default Projects;
