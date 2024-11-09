import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";
const Footer = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  return (
    <div className="flex items-end w-full bg-black/80">
      <footer className="w-full">
        <div className="container flex max-phone:flex-col flex-wrap px-5 max-phone:py-12 py-24 md:items-center lg:items-start md:flex-row md:flex-no-wrap">
          <div className="flex-shrink-0 w-64 mx-auto text-center md:mx-0 md:text-left">
            <img className="h-8 w-8" src="/logo.svg" />
            <a
              href="/"
              className="flex items-center justify-center text-xl font-medium text-gray-100 title-font md:justify-start"
            >
              Pizza Hut
            </a>
            <p className="mt-2 text-sm text-gray-100">
              Explore, Taste, and Book
            </p>
            <div className="mt-4">
              <span className="inline-flex justify-center gap-5 mt-2 sm:ml-auto sm:mt-0 sm:justify-start">
                <a href="/" className="ico">
                  <BsFacebook />
                </a>
                <a href="/" className="ico">
                  <BsTwitter />
                </a>
                <a href="/" className="ico">
                  <BsInstagram />
                </a>
              </span>
            </div>
          </div>
          <div className="flex flex-wrap flex-grow mt-10 -mb-10 text-center md:pl-20 md:mt-0 md:text-left">
            <div className="w-full px-4 lg:w-1/4 md:w-1/2">
              <h2 className="mb-3 text-sm font-medium tracking-widest text-gray-100 uppercase title-font">
                ABOUT
              </h2>
              <nav className="mb-10 list-none">
                <li className="mt-3">
                  <a
                    href="/"
                    className="text-gray-100 cursor-pointer hover:text-primary-500 hover:underline duration-200"
                  >
                    Company
                  </a>
                </li>
                <li className="mt-3">
                  <a
                    href="/"
                    className="text-gray-100 cursor-pointer hover:text-primary-500 hover:underline duration-200"
                  >
                    Careers
                  </a>
                </li>
                <li className="mt-3">
                  <a
                    href="/"
                    className="text-gray-100 cursor-pointer hover:text-primary-500 hover:underline duration-200"
                  >
                    Blog
                  </a>
                </li>
              </nav>
            </div>

            <div className="w-full px-4 lg:w-1/4 md:w-1/2">
              <h2 className="mb-3 text-sm font-medium tracking-widest text-gray-100 uppercase title-font">
                SUPPORT
              </h2>
              <nav className="mb-10 list-none">
                <li className="mt-3">
                  <a
                    href="/"
                    className="text-gray-100 cursor-pointer hover:text-primary-500 hover:underline duration-200"
                  >
                    Contact Support
                  </a>
                </li>
                <li className="mt-3">
                  <a
                    href="/"
                    className="text-gray-100 cursor-pointer hover:text-primary-500 hover:underline duration-200"
                  >
                    Help Resources
                  </a>
                </li>
                <li className="mt-3">
                  <a
                    href="/"
                    className="text-gray-100 cursor-pointer hover:text-primary-500 hover:underline duration-200"
                  >
                    Release Update
                  </a>
                </li>
              </nav>
            </div>

            <div className="w-full px-4 lg:w-1/4 md:w-1/2">
              <h2 className="mb-3 text-sm font-medium tracking-widest text-gray-100 uppercase title-font">
                PLATFORM
              </h2>
              <nav className="mb-10 list-none">
                <li className="mt-3">
                  <a
                    href="/"
                    className="text-gray-100 cursor-pointer hover:text-primary-500 hover:underline duration-200"
                  >
                    Terms & Privacy
                  </a>
                </li>
                <li className="mt-3">
                  <a
                    href="/"
                    className="text-gray-100 cursor-pointer hover:text-primary-500 hover:underline duration-200"
                  >
                    Pricing
                  </a>
                </li>
                <li className="mt-3">
                  <a
                    href="/"
                    className="text-gray-100 cursor-pointer hover:text-primary-500 hover:underline duration-200"
                  >
                    FAQ
                  </a>
                </li>
              </nav>
            </div>
            <div className="w-full px-4 lg:w-1/4 md:w-1/2">
              <h2 className="mb-3 text-sm font-medium tracking-widest text-gray-100 uppercase title-font">
                CONTACT
              </h2>
              <nav className="mb-10 list-none">
                <li className="mt-3">
                  <a
                    href="/"
                    className="text-gray-100 cursor-pointer hover:text-primary-500 hover:underline duration-200"
                  >
                    Send a Message
                  </a>
                </li>
                <li className="mt-3">
                  <a
                    href="/"
                    className="text-gray-100 cursor-pointer hover:text-primary-500 hover:underline duration-200"
                  >
                    Request a Qoute
                  </a>
                </li>
                <li className="mt-3">
                  <a
                    href="/"
                    className="text-gray-100 cursor-pointer hover:text-primary-500 hover:underline duration-200"
                  >
                    +92 333 1234567
                  </a>
                </li>
              </nav>
            </div>
          </div>
        </div>
        <div className="bg-gray-400 dark:bg-gray-800">
          <div className="container px-5 py-4 mx-auto">
            <p className="text-gray-700 dark:text-gray-300 capitalize text-center">
              &copy; {currentYear} All rights reserved
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
