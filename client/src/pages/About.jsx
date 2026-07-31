import React from "react";
import { motion as Motion } from "framer-motion";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-surface to-muted px-6 py-16">
      <Motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.5 }}
      >

        {/* Personal Introduction */}
        <Motion.div
          className="mb-10 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h1 className="text-4xl font-bold text-primary mb-2">
            Hi, I'm Sayan Kundu 
            {/* animated hand gesture emoji */}
            <span role="img" aria-label="waving hand" className="inline-block animate-wave">
              👋
            </span>
          </h1>
          <p className="text-muted-foreground text-lg">
            B.Tech in Computer Science | Full Stack Developer | Passionate about building real-world solutions.
          </p>
          <div className="mt-4 flex justify-center gap-4 flex-wrap">
            <a
              href="https://www.linkedin.com/in/sayan-kundu-70b5442b6/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-surface-foreground bg-blue-400 px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              🔗 LinkedIn
            </a>
            <a
              href="https://github.com/sayank22/jivaka"
              target="_blank"
              rel="noopener noreferrer"
              className="text-surface-foreground bg-muted px-4 py-2 rounded hover:bg-navbar transition"
            >
              💻 GitHub
            </a>
            <a
              href="https://sayan-kundu-portfolio.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-400 text-surface-foreground px-4 py-2 rounded hover:bg-red-600 transition"
            >
              🌐 Portfolio
            </a>
          </div>
        </Motion.div>

        {/* Jivaka Hospital Management System */}
        <Motion.h1
          className="text-4xl font-bold text-primary mb-6 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          About My Project: Jivaka Hospital Management System
        </Motion.h1>

        <Motion.h2 className="text-2xl font-semibold text-primary mt-8 mb-4">
          Why the Name “Jivaka”?
        </Motion.h2>
        <Motion.p className="text-muted-foreground mb-6">
          The name <strong>Jivaka</strong> is inspired by the legendary physician <em>Jīvaka Komārabhacca</em> from ancient India, known for his mastery in Ayurvedic medicine and healing practices. He is also personal physician to the Buddha and to King Bimbisara of Magadha. We chose this name to reflect our vision of building a smart, respectful, and helpful healthcare platform for modern India — rooted in care, service, and intelligence.
        </Motion.p>

        <Motion.h2 className="text-2xl font-semibold text-primary mt-8 mb-4">
          Why I Built This
        </Motion.h2>
        <Motion.p className="text-muted-foreground mb-6">
          India's healthcare systems — especially in semi-urban and rural areas — still face challenges in digitalization, appointment handling, patient record tracking, and transparency. We wanted to create a system that bridges this gap by enabling hospitals, doctors, and patients to work together through a modern, centralized, and secure platform. Jivaka is our contribution to a more accessible and efficient digital healthcare ecosystem.
        </Motion.p>

        <Motion.h2 className="text-2xl font-semibold text-primary mt-8 mb-4">
          Key Features
        </Motion.h2>
        <ul className="text-muted-foreground space-y-2 list-disc pl-6">
          <li>🧑‍⚕️ Separate Portals for <strong>Doctors</strong>, <strong>Patients</strong>, and <strong>Hospitals</strong>.</li>
          <li>📆 Simple and intuitive appointment booking and approval workflows.</li>
          <li>💊 Prescription management and past visit records accessible by both patient and doctor.</li>
          <li>📊 Hospital analytics and activity reports for hospital admins.</li>
          <li>🔐 Secure login and role-based access using Clerk authentication.</li>
          <li>📲 Mobile-first, fully responsive UI to support accessibility for all users.</li>
          <li>💬 Feedback system for users to share their concerns and suggestions.</li>
        </ul>

        <Motion.h2 className="text-2xl font-semibold text-primary mt-8 mb-4">
          What Makes Jivaka Stand Out?
        </Motion.h2>
        <Motion.p className="text-muted-foreground mb-6">
          Unlike generic hospital software, Jivaka is built with a modern tech stack and UI/UX principles to make it easy, beautiful, and accessible — even for non-tech-savvy users. Our platform focuses not just on features, but also on user experience, data security, and real-time interaction between different user roles. With our custom dashboards and communication systems, hospitals can now truly manage their ecosystem digitally.
        </Motion.p>

        <p className="mt-10 text-center text-muted-foreground italic">
          “Technology in healthcare isn’t about replacing people — it’s about empowering them to deliver better care.”
        </p>
      </Motion.div>
    </div>
  );
};

export default About;
