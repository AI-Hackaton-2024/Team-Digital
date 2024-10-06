import { motion } from 'framer-motion'
import { Upload } from 'lucide-react'
import { useState } from 'react'

export default function CompanyDescription({ formData, handleChange, handleFileChange }) {
    const [file, setFile] = useState(null)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-lg p-6 max-w-2xl mx-auto"
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
            Company Name
          </label>
          <input
            type="text" 
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="Your company name..."
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition duration-200"
            required
          />
        </div>

        <div className="space-y-2">

          <label htmlFor="companyDescription" className="block text-sm font-medium text-gray-700">
            Company Description
          </label>
          <textarea
            id="companyDescription"
            name="companyDescription"
            value={formData.companyDescription}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition duration-200"
            placeholder="Describe your company..."
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="targetMarket" className="block text-sm font-medium text-gray-700">
            Target Market
          </label>
          <textarea
            id="targetMarket"
            name="targetMarket"
            value={formData.targetMarket}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition duration-200"
            placeholder="Describe your target market..."
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="goal" className="block text-sm font-medium text-gray-700">
            Goal
          </label>
          <textarea
            id="goal"
            name="goal"
            value={formData.goal}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition duration-200"
            placeholder="Describe your company's goal..."
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="companyData" className="block text-sm font-medium text-gray-700">
            Company Data
          </label>
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="companyData"
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition duration-300"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-3 text-gray-400" />
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">TXT, PDF, JSON</p>
              </div>
              <input
                id="companyData"
                name="companyData"
                type="file"
                className="hidden"
                onChange={(e) => {
                    handleFileChange(e)
                    setFile(e.target.files[0])
                }}
                accept="txt, pdf, json"
              />
            </label>
          </div>
            {file && <p className="text-sm text-gray-500 text-center">File: {file.name}</p>}
        </div>
      </div>
    </motion.div>
  )
}