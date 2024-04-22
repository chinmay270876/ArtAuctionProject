document.addEventListener("DOMContentLoaded", function () {
    const menuBtn = document.getElementById("menu-btn");
    const navbar = document.querySelector(".navbar");
    const searchBtn = document.getElementById("search-btn");
    const searchForm = document.querySelector(".search-form");
    const loginBtn = document.getElementById("login-btn");
    const loginForm = document.querySelector(".login-form");

    menuBtn.addEventListener("click", function () {
        navbar.classList.toggle("active");
        searchForm.classList.remove("active");
        loginForm.classList.remove("active");
    });

    searchBtn.addEventListener("click", function () {
        searchForm.classList.toggle("active");
        navbar.classList.remove("active");
        loginForm.classList.remove("active");
    });

    loginBtn.addEventListener("click", function () {
        loginForm.classList.toggle("active");
        navbar.classList.remove("active");
        searchForm.classList.remove("active");
    });

    window.onscroll = () => {
        navbar.classList.remove("active");
        searchForm.classList.remove("active");
        loginForm.classList.remove("active");
    };

    // Get the timer elements
    const timerElements = document.querySelectorAll('.timer');

    // Function to update the timer display
    const updateTimer = () => {
        // Set the future auction end time (24 hours from now)
        const endTime = new Date().getTime() + (24 * 60 * 60 * 1000);

        // Update the timer every second
        setInterval(() => {
            // Get the current time
            const currentTime = new Date().getTime();

            // Calculate the remaining time in milliseconds
            let remainingTime = endTime - currentTime;

            // If the remaining time is negative, the auction has ended
            if (remainingTime < 0) {
                // Set the remaining time to 0
                remainingTime = 0;
            }

            // Calculate hours, minutes, and seconds from remaining time
            const hours = Math.floor(remainingTime / (1000 * 60 * 60));
            const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

            // Format the remaining time as HH:MM:SS
            const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

            // Loop through each timer element and update its display
            timerElements.forEach(timerElement => {
                timerElement.textContent = formattedTime;
            });
        }, 1000);
    };

    // Call the updateTimer function to start updating the timer
    updateTimer();

    // Get all bid buttons
    const bidButtons = document.querySelectorAll('.btn');

    // Add event listener to each bid button
    bidButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            // Get the parent element of the bid button
            const parentElement = button.closest('.box');

            // Get the current bid element
            const currentBidElement = parentElement.querySelector('.current-bid');

            // Get the current bid value
            let currentBid = parseInt(currentBidElement.textContent.replace(/\D/g, ''));

            // Increase the current bid by $50
            currentBid += 50;

            // Update the current bid element with the new value
            currentBidElement.textContent = 'Current Bid: $' + currentBid;
        });
    });

    // Get all cancel buttons
    const cancelButtons = document.querySelectorAll('.cancel-btn');

    // Add event listener to each cancel button
    cancelButtons.forEach(function (cancelButton) {
        cancelButton.addEventListener('click', function () {
            // Get the parent element of the cancel button
            const parentElement = cancelButton.closest('.box');

            // Get the current bid element
            const currentBidElement = parentElement.querySelector('.current-bid');

            // Get the current bid value
            let currentBid = parseInt(currentBidElement.textContent.replace(/\D/g, ''));

            // Decrease the current bid by $100
            currentBid -= 100;

            // Update the current bid element with the new value
            currentBidElement.textContent = 'Current Bid: $' + currentBid;
        });
    });
});

// Get the button element
var button = document.getElementById('menu-btn');

// Add a click event listener to the button
button.addEventListener('click', function (event) {
    // Prevent the default action of the button click, which is to scroll up
    event.preventDefault();

});

// Function to generate recommendations based on user bidding history
function generateRecommendations(userId) {
    // Retrieve the user's bidding history from the database
    const userBiddingHistory = getUserBiddingHistory(userId);

    // Analyze the bidding history to identify preferences
    const preferredItems = {};
    userBiddingHistory.forEach(entry => {
        const itemId = entry.itemId;
        if (preferredItems[itemId]) {
            preferredItems[itemId] += 1;
        } else {
            preferredItems[itemId] = 1;
        }
    });

    // Sort preferred items by preference count
    const sortedPreferredItems = Object.keys(preferredItems).sort((a, b) => preferredItems[b] - preferredItems[a]);

    // Return top recommended items
    const topRecommendedItems = sortedPreferredItems.slice(0, 3);

    return topRecommendedItems;
}

const userId = 123;
const recommendations = generateRecommendations(userId);
console.log("Top recommended items:", recommendations);
