const apiBaseUrl = 'https://crudcrud.com/api/0c75383ccb374eee8bc6fa90b4e8860b/feedbacks';

// Fetch feedbacks and overall ratings on page load
window.onload = function () {
    displayFeedbacks();
    displayOverallRatings();
};

// Handle form submission for both new and updated feedback
async function submitFeedback(event) {
    event.preventDefault(); // Prevent page from refreshing

    const feedbackId = document.getElementById('feedbackId').value;
    const name = document.getElementById('name').value;
    const rating = parseInt(document.getElementById('rating').value);

    if (name === '') {
        alert('Please enter your name');
        return;
    }

    if (feedbackId) {
        // Update feedback
        try {
            await axios.put(`${apiBaseUrl}/${feedbackId}`, {
                name: name,
                rating: rating
            });
            alert('Feedback updated!');
        } catch (error) {
            console.error(error);
            alert('Failed to update feedback');
        }
    } else {
        // Create new feedback
        try {
            await axios.post(apiBaseUrl, {
                name: name,
                rating: rating
            });
            alert('Feedback submitted!');
        } catch (error) {
            console.error(error);
            alert('Failed to submit feedback');
        }
    }

    displayFeedbacks();
    displayOverallRatings();
    resetForm();
}

// Function to display all feedbacks
async function displayFeedbacks() {
    const feedbackList = document.getElementById('feedback-list');
    feedbackList.innerHTML = ''; // Clear current list

    try {
        const response = await axios.get(apiBaseUrl);
        const feedbacks = response.data;

        feedbacks.forEach(feedback => {
            feedbackList.innerHTML += `
                <div class="feedback-item">
                    <p>${feedback.name}: ${feedback.rating}
                    <button onclick="editFeedback('${feedback._id}')">Edit</button>
                    <button onclick="deleteFeedback('${feedback._id}')">Delete</button></p>
                </div>
            `;
        });
    } catch (error) {
        console.error(error);
        alert('Failed to load feedbacks');
    }
}

// Function to delete feedback
async function deleteFeedback(id) {
    try {
        await axios.delete(`${apiBaseUrl}/${id}`);
        displayFeedbacks();
        displayOverallRatings();
    } catch (error) {
        console.error(error);
        alert('Failed to delete feedback');
    }
}

// Function to edit feedback (load feedback details into the form)
async function editFeedback(id) {
    try {
        const response = await axios.get(`${apiBaseUrl}/${id}`);
        const feedback = response.data;
        document.getElementById('feedbackId').value = feedback._id;
        document.getElementById('name').value = feedback.name;
        document.getElementById('rating').value = feedback.rating;
    } catch (error) {
        console.error(error);
        alert('Failed to load feedback for editing');
    }
}

// Function to display overall ratings
async function displayOverallRatings() {
    try {
        const response = await axios.get(apiBaseUrl);
        const feedbacks = response.data;
        const ratingCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

        feedbacks.forEach(feedback => {
            ratingCounts[feedback.rating]++;
        });

        const overallRatings = document.getElementById('overall-ratings');
        overallRatings.innerHTML = `
            * ${ratingCounts[1]}<br>
            ** ${ratingCounts[2]}<br>
            *** ${ratingCounts[3]}<br>
            **** ${ratingCounts[4]}<br>
            ***** ${ratingCounts[5]}
        `;
    } catch (error) {
        console.error(error);
        alert('Failed to load overall ratings');
    }
}

// Reset form after submission or update
function resetForm() {
    document.getElementById('feedbackId').value = '';
    document.getElementById('name').value = '';
    document.getElementById('rating').value = '1';
}

