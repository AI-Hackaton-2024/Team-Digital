import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { personaService } from '../../../services/personaService.js';
import { motion, AnimatePresence } from 'framer-motion'
import CompanyDescription from './CompanyDescription'
import Feature from './Feature'

const Loader = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="dot-loader">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
      <style jsx>{`
        .dot-loader {
          display: flex;
          gap: 8px;
        }

        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: #3498db;
          animation: dot 0.6s infinite alternate;
        }

        .dot:nth-child(2) {
          animation-delay: 0.2s;
        }

        .dot:nth-child(3) {
          animation-delay: 0.4s;
        }

        @keyframes dot {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(1.5);
          }
        }
      `}</style>
    </div>
  );
};

export default function Form({ formData, setFormData, setThreadId, threadId }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
   e.preventDefault();
    try {
      if (currentStep === 1) {
        handleNext();
      } else {
        setIsLoading(true);
        await personaService.create(formData)
        setIsLoading(false);
        navigate('/chat');
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      setIsLoading(false);
    }
  };

  const handleFileChange = (event) => {
    const reader = new FileReader();
    reader.onload = async (event) => {
        const text = (event.target.result)
        setFormData({
            ...formData,
            companyData: text,
        })
      };
      reader.readAsText(event.target.files[0])
  }


    const handleNext = (e) => {
        setCurrentStep(2);
    };

    const handlePrevious = (e) => {
        setCurrentStep(1);
    };

    return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="max-w-3xl mx-auto">
          <div className="shadow-2xl rounded-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4">
              <h2 className="text-2xl font-bold text-white text-center">
                {currentStep === 1 ? 'Company Information' : 'Feature Details'}
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {currentStep === 1 && <CompanyDescription formData={formData} handleChange={handleChange} handleFileChange={handleFileChange} />}
                  {currentStep === 2 && <Feature formData={formData} handleChange={handleChange} />}
                </motion.div>
              </AnimatePresence>

              <div className={`mt-8 flex ${currentStep > 1 ? 'justify-between' : 'justify-end'}`}>
                {currentStep > 1 && (
                  <motion.button
                    type="button"
                    onClick={handlePrevious}
                    className="px-6 py-2 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400 transition duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Previous
                  </motion.button>
                )}
                <motion.button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full hover:from-blue-600 hover:to-purple-600 transition duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {currentStep !== 2 ? "Next" : "Submit"}
                </motion.button>
              </div>
            </form>
          </div>
          <div className="mt-4 flex justify-center">
            <span className="text-sm text-gray-600 bg-white rounded-full px-3 py-1 shadow-sm">
              Step {currentStep} of 2
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
