import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import Carousel from "./Carousel";
export default function Sections() {
  return (
    <div className="min-h-[1000px] w-full">
      {/* Presentation Section */}
      <section className="h-[600px]"></section>

      {/* Features & Benefits Section */}
      <section className="min-h-[600px] flex flex-col p-10 items-center text-center">
        <h1 className="text-[hsl(262.1,83.3%,57.8%)] text-3xl font-semibold">
          Seamless Communication for a Stronger Kindergarten Community
        </h1>
        <p className="font-semibold m-5">
          Effortlessly connect administrators, teachers, and parents in one
          easy-to-use platform, ensuring a smooth and stress-free experience for
          everyone.
        </p>

        <div className="w-full flex flex-row justify-between gap-10 p-10">
          <div className="border p-5 w-1/2 shadow-lg rounded-2xl">
            <h1 className="text-xl font-bold mb-3 text-[hsl(262.1,83.3%,57.8%)]">
              Key Features
            </h1>
            <p className="text-sm text-gray-700">
              <strong>Instant Messaging & Announcements:</strong> Send important
              updates instantly—no more lost notes or missed emails. <br />
              <br />
              <strong>Attendance & Daily Reports:</strong> Track student
              attendance and share daily activity reports with parents. <br />
              <br />
              <strong>Event & Calendar Management:</strong> Schedule school
              events, parent-teacher meetings, and class activities. <br />
              <br />
              <strong>Secure Media Sharing:</strong> Share photos, videos, and
              documents securely. <br />
              <br />
              <strong>Smart Notifications & Alerts:</strong> Ensure parents and
              staff never miss an update. <br />
              <br />
              <strong>Multi-User Access & Role-Based Permissions:</strong>{" "}
              Proper controls for administrators, teachers, and parents.
            </p>
          </div>

          <div className="border p-5 w-1/2 shadow-lg rounded-2xl">
            <h1 className="text-xl font-bold mb-3 text-[hsl(262.1,83.3%,57.8%)]">
              Why Kindergartens Love Our System
            </h1>
            <p className="text-sm text-gray-700">
              <strong>Stronger Parent-Teacher Connection:</strong> Enhance
              collaboration between teachers and families. <br />
              <br />
              <strong>Saves Time for Everyone:</strong> No more phone calls or
              paper notes—focus on the children. <br />
              <br />
              <strong>Safe & Private:</strong> Secure encryption ensures only
              authorized users can access data. <br />
              <br />
              <strong>Easy to Use:</strong> Intuitive interface makes adoption
              effortless. <br />
              <br />
              <strong>Better Organization & Productivity:</strong> Everything in
              one place for smoother workflow.
            </p>
          </div>
        </div>

        <h1 className="font-bold">
          {" "}
          Ready to Transform Communication in Your Kindergarten?{" "}
          <span className="text-violet-600"> Try It for Free Today! </span>{" "}
        </h1>
      </section>

      {/*  how to use sectoin */}
      <section className="h-[700px] ">
        <Carousel />
      </section>
      {/* clients commets sectoin */}
      <section className="h-[300px] "></section>
      {/* Pricing sectoin */}
      <section className="h-[600px] bg-[]"></section>
      {/* footer sectoin */}
      <footer className="bg-gray-900 text-white py-8 min-w-full bg-opacity-95">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h2 className="text-2xl font-bold">ServiceName</h2>
              <p className="text-gray-400 mt-2">
                Creating amazing experiences through innovative solutions.
              </p>
            </div>
            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold">Quick Links</h3>
              <ul className="mt-2 space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            {/* Social Links */}
            <div>
              <h3 className="text-lg font-semibold">Follow Us</h3>
              <div className="flex space-x-4 mt-2">
                
              </div>
            </div>
          </div>
        </div>

        {/* Centered Copyright Text */}
        <div className="flex justify-center items-center text-gray-500 text-sm mt-6 border-t border-gray-800 pt-4">
          &copy; {new Date().getFullYear()} ServiceName. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
