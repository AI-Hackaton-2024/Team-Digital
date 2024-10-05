import { useEffect, useState } from 'react';
import styles from './form.module.css';
import CompanyDescription from './CompanyDescription';
import Feature from './Feature';
import { useNavigate } from 'react-router-dom';
import { personaService } from '../../../services/personaService.js';

function Form({formData, setFormData, setThreadId, threadId}) {
    const [currentStep, setCurrentStep] = useState(1);
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleNext = (e) => {
        setCurrentStep(2);
    };

    const handlePrevious = (e) => {
        setCurrentStep(1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (currentStep === 1) {
                handleNext();
            } else {
                const result = await personaService.create(formData);
                setThreadId(result.threadId);
                
            }

        } catch (error) {
            console.error("Error submitting data:", error);
        }
    };

    useEffect(() => {
        if (threadId) {
            console.log(threadId);
            navigate('/chat');
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [threadId]);

    return (
        <div className={styles.containerForm}>
            <form onSubmit={handleSubmit}>
                {currentStep === 1 && <CompanyDescription formData={formData} handleChange={handleChange} />}

                {currentStep === 2 && <Feature formData={formData} handleChange={handleChange} />}

                <div className={currentStep > 1 ? styles.buttonContainer : styles.buttonContainerEnd}>
                    {currentStep > 1 && (
                        <button type="button" className={styles.previousButton} onClick={handlePrevious}>
                            Previous
                        </button>
                    )}
                    <button type="submit" className={styles.addButton}>
                        {currentStep !== 2 ? "Next" : "Submit"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Form;