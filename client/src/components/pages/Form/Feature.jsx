import styles from './form.module.css';

function Feature ({formData, handleChange}) {
    return (
         <>
            <h2>Feature Information</h2>
            <div className={styles.companyInformationContainer}>
                <label htmlFor="featureDescription">Feature Description</label>
                <textarea
                    id="featureDescription"
                    name="featureDescription"
                    value={formData.featureDescription}
                    onChange={handleChange}
                    required
                    rows={4}
                    className={styles.textarea}
                />

                <label htmlFor="customerDescription">Customer Description</label>
                <textarea
                    id="customerDescription"
                    name="customerDescription"
                    value={formData.customerDescription}
                    onChange={handleChange}
                    required
                    rows={4}
                    className={styles.textarea}
                />
            </div>
        </>
    );
}

export default Feature;