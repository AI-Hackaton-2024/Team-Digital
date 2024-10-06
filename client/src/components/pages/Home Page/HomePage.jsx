import team_digtal_img from "../../assets/team_digital.jpeg";

const cardData = [
  {
    img: team_digtal_img,
    name: "Web Software",
    description: "Cutting-edge web solutions for modern businesses."
  },
  {
    img: team_digtal_img,
    name: "Mobile Apps",
    description: "Innovative mobile applications for iOS and Android."
  },
  {
    img: team_digtal_img,
    name: "Cloud Services",
    description: "Scalable and secure cloud infrastructure solutions."
  },
  {
    img: team_digtal_img,
    name: "AI Integration",
    description: "Intelligent systems powered by machine learning."
  },
  {
    img: team_digtal_img,
    name: "Cybersecurity",
    description: "Robust security measures for digital assets."
  },
  {
    img: team_digtal_img,
    name: "Data Analytics",
    description: "Insightful data analysis for informed decision-making."
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100">
      <header className="py-6 px-4 sm:px-6 lg:px-8">
        <nav className="flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">Team Digital</div>
          <ul className="flex space-x-4">
            <li><a href="/home" className="text-gray-600 hover:text-blue-600 transition-colors">Home</a></li>
            <li><a href="/form" className="text-gray-600 hover:text-blue-600 transition-colors">Create custom assistant</a></li>
            <li><a href="/chat" className="text-gray-600 hover:text-blue-600 transition-colors">Chat</a></li>
          </ul>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="text-center mb-16">
          <h1 className="text-5xl sm:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Team Digital
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto">
            Empowering businesses with cutting-edge digital solutions. We transform ideas into reality, driving innovation and growth in the digital landscape.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Our Popular Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {cardData.map((card, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg">
                <div className="w-full h-48 relative">
                  <img
                    src={card.img}
                    alt={card.name}
                    // layout="fill"
                    // objectFit="cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{card.name}</h3>
                  <p className="text-gray-600 mb-4">{card.description}</p>
                  <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center">
          <div className="text-sm mb-4 sm:mb-0">© 2024 Team Digital. All rights reserved.</div>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-blue-400 transition-colors">Twitter</a>
            <a href="#" className="hover:text-blue-400 transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-blue-400 transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  )
}