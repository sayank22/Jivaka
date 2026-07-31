import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navbar mt-20 border-t border-border backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-4 text-xl font-semibold text-primary">One App. All Your Healthcare Needs.</h3>
            <p className="text-muted-foreground">
              Jivaka is a single platform tailored for patients, doctors, and hospitals.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-semibold text-primary">About</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link to="/about" className="transition hover:text-primary hover:font-semibold">
                  About Jivaka
                </Link>
              </li>
              <li>Basic Access: Free for patients and doctors</li>
              <li>Premium: ₹499/month for full hospital analytics</li>
              <li>Enterprise: Custom plan for large hospitals</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-semibold text-primary">Contact</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a href="https://www.linkedin.com/in/sayan-kundu-70b5442b6" target="_blank" rel="noreferrer" className="footer-link">
                  💼 LinkedIn: Sayan Kundu
                </a>
              </li>
              <li>
                <a href="https://sayan-kundu-portfolio.netlify.app/" target="_blank" rel="noreferrer" className="footer-link">
                    🌐 Portfolio
                </a>
              </li>
              <li>
                <a href="https://github.com/sayank22/Jivaka" target="_blank" rel="noreferrer" className="footer-link">
                  🧩 GitHub
                </a>
              </li>
              <li>
                <a href="mailto:sayank10023@gmail.com" className="footer-link">
                  📧 sayank10023@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-sm text-muted-foreground md:flex-row">
          <p>
            © {currentYear} <span className="font-semibold text-primary">Jivaka</span> 
            • Made with ❤️ by
            {/* space between the text and the link */}
            {' '} 
            <a 
            href="sayan-kundu-portfolio.netlify.app/" target="_blank" rel="noreferrer" className="font-semibold text-primary hover:font-bold hover:text-primary/90"> 
            Sayan Kundu
            </a>
          </p>
          <div className="flex items-center gap-4">
            <Link to="/about" className="transition hover:text-primary">
              About
            </Link>
            <Link to="/feedback" className="transition hover:text-primary">
              Feedback
            </Link>
            <Link to="/" className="transition hover:text-primary">
              Home
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
