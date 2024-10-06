import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Users, Zap, ChartBar, Brain } from 'lucide-react'

import react_img from "../../assets/react.jpeg"
import express_img from "../../assets/express.png"
import node_img from "../../assets/node.png"
import chatgpt_img from "../../assets/chatgpt.png"

import fory from "../../assets/4i.jpg"
import alex from "../../assets/alex4o.jpg"
import koci from "../../assets/koci.jpg"
import monk from "../../assets/monk.jpg"

const technologies = [
  { name: 'React', img: react_img },
  { name: 'Express', img: express_img },
  { name: 'Node.js', img: node_img },
  { name: 'ChatGPT', img: chatgpt_img },
]

const team = [
  { name: 'Alex', img: alex, linkedin: "https://www.linkedin.com/in/alexander-dimitrov-51a0a8218/" },
  { name: 'Konstantin', img: koci, linkedin: "https://www.linkedin.com/in/konstantin-natev-b8aaaa240/" },
  { name: 'Lubo', img: monk, linkedin: "https://www.linkedin.com/in/nikifor-bogdanov-212a16204/"  },
  { name: 'Nikifor', img: fory, linkedin: "https://www.linkedin.com/in/nikifor-bogdanov-212a16204/" },
]

export default function Component() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 sm:p-6 md:p-8">
      <header className="max-w-6xl mx-auto mb-12 sm:mb-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800">PersonaAI</h1>
          <nav className="hidden sm:flex space-x-4">
            <a href="#features" className="text-gray-600 hover:text-gray-800 transition-colors">Features</a>
            <a href="#benefits" className="text-gray-600 hover:text-gray-800 transition-colors">Benefits</a>
            <a href="#team" className="text-gray-600 hover:text-gray-800 transition-colors">Team</a>
          </nav>
        </motion.div>
      </header>

      <main className="max-w-6xl mx-auto">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            Revolutionize Your <span className="text-blue-600">Customer Insights</span>
          </h2>
          <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Harness the power of AI to create detailed, data-driven customer personas in minutes, not months.
          </p>
          <button
            onClick={() => navigate("/form")}
            className="w-60 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 transform hover:scale-105 flex items-center justify-center mx-auto"
          >
            Try it out <ArrowRight className="ml-2" />
          </button>
        </motion.section>

        <motion.section
          id="features"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-16"
        >
          <h3 className="text-2xl sm:text-3xl font-semibold text-center mb-8">Why Choose PersonaAI?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Users className="w-8 h-8 text-blue-500" />, title: "Accurate Personas", description: "AI-generated personas based on real data" },
              { icon: <Zap className="w-8 h-8 text-purple-500" />, title: "Lightning Fast", description: "Generate personas in minutes, not months" },
              { icon: <ChartBar className="w-8 h-8 text-green-500" />, title: "Data-Driven Insights", description: "Make confident, informed decisions" },
              { icon: <Brain className="w-8 h-8 text-red-500" />, title: "Continuous Learning", description: "Personas evolve with new data" },
            ].map((feature, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
                {feature.icon}
                <h4 className="text-xl font-semibold mt-4 mb-2">{feature.title}</h4>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="benefits"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mb-16"
        >
          <div className="bg-white bg-opacity-50 rounded-lg shadow-lg p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-semibold text-center mb-6">Key Benefits</h3>
            <ul className="space-y-4">
              {[
                "Get rapid feedback to stay ahead of competitors",
                "Save money by eliminating unnecessary market research expenses",
                "Access diverse customer segments instantly",
                "Make confident, data-driven decisions backed by AI insights",
              ].map((benefit, index) => (
                <li key={index} className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">Ready to Transform Your Customer Insights?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Join the AI revolution and unlock the power of data-driven personas. Start your journey today!
          </p>
          <button
            onClick={() => navigate("/form")}
            className="w-80 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 transform hover:scale-105"
          >
            Get Started
          </button>
        </motion.section>

        <motion.section
          id="team"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="mb-16"
        >
          <h3 className="text-2xl sm:text-3xl font-semibold text-center mb-8">Meet Our Team</h3>
          <div className="flex flex-wrap justify-center gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-2 border-2 border-blue-500"
                  />
                  <p className="font-semibold">{member.name}</p>
                </a>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </main>

      <footer className="max-w-6xl mx-auto mt-16 text-center">
        <p className="text-gray-600 mb-4">Technologies</p>
        <div className="flex justify-center gap-6">
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1 }}
              className="relative group"
            >
              <img
                src={tech.img}
                alt={tech.name}
                className="w-12 h-12 rounded-full border-2 border-gray-300 transition-transform duration-300 group-hover:border-blue-500"
              />
              <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </div>
      </footer>
    </div>
  )
}