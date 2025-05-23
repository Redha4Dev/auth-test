import { useNavigate } from "react-router-dom"
export default function FeaturesBenefits() {
    const navigate = useNavigate();
    return(
        <>
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
            <span className="text-violet-600 cursor-pointer" onClick={()=> navigate('/SignUp')}> Try It for Free Today! </span>{" "}
            </h1>
        </>
    )
}