import HelpLinks from './HelpLinks';

const Footer = () => {
  return (
    <footer className="p-4 px-8 flex items-center justify-between text-sm">
      <p>&copy; Recipes 2021. All rights reserved</p>

      <HelpLinks />
    </footer>
  );
};

export default Footer;
