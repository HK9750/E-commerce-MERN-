const Footer = () => {
  return (
    <footer className="text-black py-4 border-t">
      <div className="px-8 flex">
        <div className="flex justify-between mx-auto text-black dark:text-white flex-wrap">
          <div className="w-1/3">
            <h4 className="text-xl font-semibold mb-4">About Us</h4>
            <p className="text-sm font-medium">
              Evo Ecommerce: Your ultimate destination for online shopping.
              Explore a wide array of high-quality products, from fashion and
              electronics to home decor and fitness gear. Enjoy seamless
              browsing, secure transactions, and fast shipping. Shop smarter
              with Evo today!
            </p>
          </div>
          <div className="mx-auto">
            <h4 className="text-xl font-semibold mb-3">Customer Service</h4>
            <ul className="list-none">
              <li className="mb-2">
                <a href="#" className="text-md font-semibold hover:opacity-80">
                  Contact Us
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-md font-semibold hover:opacity-80">
                  FAQs
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-md font-semibold hover:opacity-80">
                  Shipping & Returns
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-md font-semibold hover:opacity-80">
                  Track Order
                </a>
              </li>
            </ul>
          </div>
          <div className="mx-auto">
            <h4 className="text-xl font-semibold mb-4">Follow Us</h4>
            <ul className="list-none font-semibold">
              <li className="mb-2">
                <a href="#" className="text-md hover:opacity-80">
                  Instagram
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-md hover:opacity-80">
                  Facebook
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-md hover:opacity-80">
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-4 border-t text-black dark:text-white">
        <div className="container mx-auto px-8 py-2 flex justify-between items-center">
          <p className="text-[14px]">
            &copy; 2024 Your E-commerce App. All rights reserved.
          </p>
          <div className="text-[14px]">
            <a href="#" className="hover:opacity-80 mr-4">
              Privacy Policy
            </a>
            <a href="#" className="hover:opacity-80">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
