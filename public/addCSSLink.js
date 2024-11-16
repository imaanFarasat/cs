const fs = require('fs');
const path = require('path');

// Path to the directory containing your HTML files
const directoryPath = path.join('C:', 'Users', 'imaan', 'Downloads', 'Martial Art'); // Correct folder path

// Old submitForm function to be replaced
const oldSubmitForm = `
function submitForm() {
    const form = document.getElementById('marketCompetitionForm');
    if (form.checkValidity()) {
        // Redirect to Page 8 after form submission
        window.location.href = 'page8.html'; // Change this to the actual page 8 URL
    } else {
        alert('Please complete all required fields before submitting.');
    }
}`;

const newSubmitForm = `
function submitForm() {
    const form = document.getElementById('marketCompetitionForm');
    if (form.checkValidity()) {
        // Store form data in localStorage
        const formData = new FormData(form);
        
        formData.forEach((value, key) => {
            localStorage.setItem(key, value);  // Save each form input value to localStorage
        });

        // Redirect to the next page after form submission
        window.location.href = 'page8.html'; // Change this to the actual next page URL
    } else {
        alert('Please complete all required fields before submitting.');
    }
}`;

fs.readdir(directoryPath, (err, files) => {
    if (err) {
        console.error('Unable to scan directory:', err);
        return;
    }

    files.forEach(file => {
        // Only process HTML files
        if (file.endsWith('.html')) {
            const filePath = path.join(directoryPath, file);
            
            // Read the HTML file
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    console.error('Error reading file:', err);
                    return;
                }

                // Replace old submitForm function with new one
                const updatedData = data.replace(oldSubmitForm, newSubmitForm);

                // Write the updated content back to the file
                fs.writeFile(filePath, updatedData, 'utf8', (err) => {
                    if (err) {
                        console.error('Error writing to file:', err);
                    } else {
                        console.log(`Successfully updated ${file}`);
                    }
                });
            });
        }
    });
});
