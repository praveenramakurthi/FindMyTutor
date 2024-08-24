import React, { useContext } from 'react';
import { TutorContext } from '../Context/Context';
import styles from './AddTutors.module.css'; // Import the CSS module

const AddTutors = () => {
    const { formData, setFormData, addTutor } = useContext(TutorContext);

    const onChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            // Handle checkbox inputs to manage array of subjects
            if (checked) {
                // Add the subject to the array if checked
                setFormData({ ...formData, subjects: [...formData.subjects, value] });
            } else {
                // Remove the subject from the array if unchecked
                setFormData({ ...formData, subjects: formData.subjects.filter(subject => subject !== value) });
            }
        } else {
            // For other inputs, update formData normally
            setFormData({ ...formData, [name]: value });
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        addTutor({ ...formData, subjects: formData.subjects.join(',') });
    };

    return (
        <div className={styles.body}> {/* Apply the module CSS class */}
            <div className={styles.addTutorContainer}>
                <form className={styles.addTutorForm} onSubmit={onSubmit}>
                    <h2 className={styles.formTitle}>Add Tutor</h2>
                    <input type="text" name="name" value={formData.name} onChange={onChange} placeholder="Name" required className={styles.formInput} />
                    <input type="email" name="email" value={formData.email} onChange={onChange} placeholder="Email" required className={styles.formInput} />
                    <input type="text" name="phone" value={formData.phone} onChange={onChange} placeholder="Phone" required className={styles.formInput} />
                    <input type="text" name="qualifications" value={formData.qualifications} onChange={onChange} placeholder="Qualifications" required className={styles.formInput} />
                    <input type="number" name="experience" value={formData.experience} onChange={onChange} placeholder="Experience (years)" required className={styles.formInput} />
                    <input type="text" name="image" value={formData.image} onChange={onChange} placeholder="Image URL" required className={styles.formInput} />
                    <input type="string" name="location" value={formData.location} onChange={onChange} placeholder="Location" required className={styles.formInput} />
                    <input type="text" name="pincode" value={formData.pincode} onChange={onChange} placeholder="Pincode" required className={styles.formInput} />
                    <div className={styles.formInput}>
                        <h3>Subjects</h3>
                        <label>
                            <input type="checkbox" name="subjects" value="JavaScript" onChange={onChange} checked={formData.subjects.includes("JavaScript")} />
                            JavaScript
                        </label>
                        <label>
                            <input type="checkbox" name="subjects" value="Python" onChange={onChange} checked={formData.subjects.includes("Python")} />
                            Python
                        </label>
                        <label>
                            <input type="checkbox" name="subjects" value="Java" onChange={onChange} checked={formData.subjects.includes("Java")} />
                            Java
                        </label>
                    </div>
                    <div className={styles.buttonContainer}>
                        <button type="submit" className={styles.formButton}>Register</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTutors;
