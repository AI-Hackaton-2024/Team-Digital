import { motion } from 'framer-motion'

export default function Feature({ formData, handleChange }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto"
    >
    <div className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="featureDescription" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="featureDescription"
            name="featureDescription"
            value={formData.featureDescription}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition duration-200"
            placeholder="Describe the feature..."
          />
        </div>
      </div>
    </motion.div>
  )
}