const Footer = () => {
  return (
    <footer className="py-12 bg-foreground text-background">
      <div className="container px-4 mx-auto">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-semibold">Neighbor 911™</h3>
            <p className="text-sm text-background/80">
              Community-based emergency response platform. Open source, volunteer-driven, saving lives one neighbor at a time.
            </p>
          </div>
          
          <div>
            <h3 className="mb-4 text-lg font-semibold">Project</h3>
            <ul className="space-y-2 text-sm text-background/80">
              <li>
                <a href="https://github.com/LifesaverLabs/Neighbor911" target="_blank" rel="noopener noreferrer" className="hover:text-background transition-colors">
                  GitHub Repository
                </a>
              </li>
              <li>
                <a href="https://github.com/LifesaverLabs/Neighbor911/blob/main/docs/ARCHITECTURE.md" target="_blank" rel="noopener noreferrer" className="hover:text-background transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="https://github.com/LifesaverLabs/Neighbor911/blob/main/docs/PRD.md" target="_blank" rel="noopener noreferrer" className="hover:text-background transition-colors">
                  Roadmap
                </a>
              </li>
              <li>
                <a href="https://github.com/LifesaverLabs/Neighbor911/blob/main/prompts/PROMPT.md" target="_blank" rel="noopener noreferrer" className="hover:text-background transition-colors">
                  Contributing Guide
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="mb-4 text-lg font-semibold">Organization</h3>
            <ul className="space-y-2 text-sm text-background/80">
              <li>
                <a href="https://lifesaverlabs.org" className="hover:text-background transition-colors">
                  Lifesaver Labs PBC
                </a>
              </li>
              <li>
                <a href="mailto:team@lifesaverlabs.org" className="hover:text-background transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="mailto:nobody@lifesaverlabs.org?subject=[FUNDING]" className="hover:text-background transition-colors">
                  Funding Inquiries
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="mb-4 text-lg font-semibold">Legal</h3>
            <ul className="space-y-2 text-sm text-background/80">
              <li>
                <a href="https://github.com/LifesaverLabs/Neighbor911/blob/main/LICENSE" target="_blank" rel="noopener noreferrer" className="hover:text-background transition-colors">
                  MIT License
                </a>
              </li>
              <li>
                <span className="text-background/60">Trademark: Neighbor 911™</span>
              </li>
              <li>
                <span className="text-background/60">Public Benefit Corporation</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 mt-8 border-t border-background/20 text-center text-sm text-background/80">
          <p>
            © {new Date().getFullYear()} Lifesaver Labs Public Benefit Corporation. 
            Neighbor 911™ is a trademark. Code released under MIT License.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
