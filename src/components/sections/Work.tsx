import Image from "next/image";
import Link from "next/link";
import styles from "./Work.module.css";

const projects = [
  {
    id: 1,
    title: "City on a Hill",
    description: "We design, develop, and deploy scalable digital solutions that help companies grow faster.",
    image: "/images/work-1.png",
    tags: ["#2025", "Web Design", "Poster"],
    link: "#project1",
  },
  {
    id: 2,
    title: "Angi's Cleaning",
    description: "A comprehensive branding and web presence overhaul for a premium cleaning service.",
    image: "/images/work-2.png",
    tags: ["#2024", "Branding", "Dev"],
    link: "#project2",
  },
  {
    id: 3,
    title: "Fuji Bowls",
    description: "Modern e-commerce platform ensuring a seamless ordering experience for customers.",
    image: "/images/work-3.png",
    tags: ["#2023", "E-commerce", "App"],
    link: "#project3",
  },
];

const Work = () => {
  return (
    <section id="work" className={styles.section}>
      <div className={styles.header}>
        <h2>Some of Our Work</h2>
        <p>
          A selection of projects showcasing our approach to design,
          performance, and usability.
        </p>
      </div>
      <div className={styles.grid}>
        {projects.map((project) => (
          <div key={project.id} className={styles.card}>
            <Image
              src={project.image}
              alt={project.title}
              width={800}
              height={800}
              className={styles.image}
              sizes="(max-width: 900px) 100vw, 33vw"
            />
            {/* Overlay handled in CSS */}
            
              <div className={styles.tags}>
                {project.tags.map((tag, i) => (
                  <span key={i} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>

              <div className={styles.cardOverlay}>
                <div className={styles.cardContent}>
                  <h3>{project.title}</h3>
                  <p className={styles.description}>{project.description}</p>
                  <Link href={project.link} className={styles.projectButton}>
                    <span>View the Project</span>
                    <span className={styles.arrowIcon}>→</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};



export default Work;
