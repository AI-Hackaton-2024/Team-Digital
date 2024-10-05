import styles from './form.module.css';

function CompanyDescription ({formData, handleChange}) {
    return (
        <>
            <h2>Company Information</h2>
            <div className={styles.companyInformationContainer}>
                <label htmlFor="companyDescription">Company Description</label>
                <textarea
                    id="companyDescription"
                    name="companyDescription"
                    value={formData.companyDescription}
                    onChange={handleChange}
                    required
                    rows={4}
                    className={styles.textarea}
                />

                <label htmlFor="targetMarket">Target Market</label>
                <textarea
                    id="targetMarket"
                    name="targetMarket"
                    value={formData.targetMarket}
                    onChange={handleChange}
                    required
                    rows={4}
                    className={styles.textarea}
                />

                <label htmlFor="goal">Goal</label>
                <textarea
                    id="goal"
                    name="goal"
                    value={formData.goal}
                    onChange={handleChange}
                    required
                    rows={4}
                    className={styles.textarea}
                />
            </div>
        </>
    )
}

export default CompanyDescription;