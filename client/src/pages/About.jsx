import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-surface to-muted px-6 py-16">
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.5 }}
      >
        {/* Personal Introduction */}
        <motion.div
          className="mb-10 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h1 className="text-4xl font-bold text-primary mb-2">
            Hi, I'm Sayan Kundu 👋
          </h1>
          <p className="text-muted-foreground text-lg">
            B.Tech in Computer Science | Full Stack Developer | Passionate about building real-world solutions.
          </p>
          <div className="mt-4 flex justify-center gap-4 flex-wrap">
            <a
              href="https://drive.google.com/file/d/1Mhn6U396WW0DiciBdBbsP2eJP5P9CSg4/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="text-surface-foreground bg-primary px-4 py-2 rounded hover:bg-primary transition"
            >
              📄 View Resume
            </a>
            <a
              href="https://www.linkedin.com/in/sayan-kundu-70b5442b6/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-surface-foreground bg-info px-4 py-2 rounded hover:bg-info transition"
            >
              🔗 LinkedIn
            </a>
            <a
              href="https://github.com/sayank22"
              target="_blank"
              rel="noopener noreferrer"
              className="text-surface-foreground bg-muted px-4 py-2 rounded hover:bg-muted/90 transition"
            >
              💻 GitHub
            </a>
          </div>
        </motion.div>

       {/* Tech Stack Used */}
<motion.div
  className="mb-10"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.2 }}
>
  <h2 className="text-2xl font-semibold text-primary mb-4 text-center">
    🚀 Technologies I Used
  </h2>
  <ul className="space-y-2 text-muted-foreground text-lg max-w-xl mx-auto">
    <li>
      <strong>Frontend:</strong> ⚛️ React, 📦 Vite, 📍 React Route
    </li>
    <li>
      <strong>Backend:</strong> 🛠️ Node.js, 🚀 Express
    </li>
    <li>
      <strong>UI/UX:</strong> 🎞️ Framer Motion, 🎨 Tailwind CSS, 📱 Fully Responsive Desig
    </li>
    <li>
      <strong>Database:</strong> 🗃️ MongoDB
    </li>
    <li>
      <strong>Authentication:</strong> 🔐 Clerk
    </li>
    <li>
      <strong>Frontend Deployment:</strong> ▲ Vercel
    </li>
    <li>
      <strong>Backend Deployment:</strong> 🌐 Render
    </li>
  </ul>
</motion.div>


        {/* Existing content remains unchanged */}
        <motion.h1
          className="text-4xl font-bold text-primary mb-6 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          About Our Project: Jivaka Hospital Management System
        </motion.h1>

        <motion.p
          className="text-muted-foreground text-lg mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <strong>Jivaka</strong> is a full-fledged hospital management system built project by <strong>Sayan</strong>.
        </motion.p>

        <motion.h2 className="text-2xl font-semibold text-primary mt-8 mb-4">
          Why the Name “Jivaka”?
        </motion.h2>
        <motion.p className="text-muted-foreground mb-6">
          The name <strong>Jivaka</strong> is inspired by the legendary physician <em>Jīvaka Komārabhacca</em> from ancient India, known for his mastery in Ayurvedic medicine and healing practices. He is also personal physician to the Buddha and to King Bimbisara of Magadha. We chose this name to reflect our vision of building a smart, respectful, and helpful healthcare platform for modern India — rooted in care, service, and intelligence.
        </motion.p>

        <motion.h2 className="text-2xl font-semibold text-primary mt-8 mb-4">
          Why I Built This
        </motion.h2>
        <motion.p className="text-muted-foreground mb-6">
          India's healthcare systems — especially in semi-urban and rural areas — still face challenges in digitalization, appointment handling, patient record tracking, and transparency. We wanted to create a system that bridges this gap by enabling hospitals, doctors, and patients to work together through a modern, centralized, and secure platform. Jivaka is our contribution to a more accessible and efficient digital healthcare ecosystem.
        </motion.p>

        <motion.h2 className="text-2xl font-semibold text-primary mt-8 mb-4">
          Key Features
        </motion.h2>
        <ul className="text-muted-foreground space-y-2 list-disc pl-6">
          <li>🧑‍⚕️ Separate Portals for <strong>Doctors</strong>, <strong>Patients</strong>, and <strong>Hospitals</strong>.</li>
          <li>📆 Simple and intuitive appointment booking and approval workflows.</li>
          <li>💊 Prescription management and past visit records accessible by both patient and doctor.</li>
          <li>📊 Hospital analytics and activity reports for hospital admins.</li>
          <li>🔐 Secure login and role-based access using Clerk authentication.</li>
          <li>📲 Mobile-first, fully responsive UI to support accessibility for all users.</li>
          <li>💬 Feedback system for users to share their concerns and suggestions.</li>
        </ul>

        <motion.h2 className="text-2xl font-semibold text-primary mt-8 mb-4">
          What Makes Jivaka Stand Out?
        </motion.h2>
        <motion.p className="text-muted-foreground mb-6">
          Unlike generic hospital software, Jivaka is built with a modern tech stack and UI/UX principles to make it easy, beautiful, and accessible — even for non-tech-savvy users. Our platform focuses not just on features, but also on user experience, data security, and real-time interaction between different user roles. With our custom dashboards and communication systems, hospitals can now truly manage their ecosystem digitally.
        </motion.p>

        <p className="mt-10 text-center text-muted-foreground italic">
          “Technology in healthcare isn’t about replacing people — it’s about empowering them to deliver better care.”
        </p>
      </motion.div>
    </div>
  );
};

export default About;
