const Footer = () => {
  return (
    <footer>
      <div>
        <div className="bg-amber-100/50 py-14">
          <div className="py-4 text-(--primary-text) text-center text-sm">
            © {new Date().getFullYear()} Suraj Yadav — Crafted with care    
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
