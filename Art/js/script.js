document.addEventListener("DOMContentLoaded", function() {
    var menuBtn = document.getElementById("menu-btn");
    var navbar = document.querySelector(".navbar");
    var searchBtn = document.getElementById("search-btn");
    var searchForm = document.querySelector(".search-form");
    var loginBtn = document.getElementById("login-btn");
    var loginForm = document.querySelector(".login-form");

    menuBtn.addEventListener("click", function() {
        navbar.classList.toggle("active");
        searchForm.classList.remove("active");
        loginForm.classList.remove("active");
    });

    searchBtn.addEventListener("click", function() {
        searchForm.classList.toggle("active");
        navbar.classList.remove("active");
        loginForm.classList.remove("active");
    });

    loginBtn.addEventListener("click", function() {
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

    const bidButtons = document.querySelectorAll('.btn');

    // Add event listener to each bid button
    bidButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            // Get the parent element of the bid button
            const parentElement = button.closest('.box');

            // Get the current bid element
            const currentBidElement = parentElement.querySelector('.current-bid');

            // Get the current bid value
            let currentBid = parseInt(currentBidElement.textContent.replace(/\D/g,''));

            // Increase the current bid by $50
            currentBid += 50;

            // Update the current bid element with the new value
            currentBidElement.textContent = 'Current Bid: $' + currentBid;
        });
    });

    const cancelButtons = document.querySelectorAll('.cancel-btn');

    // Add event listener to each cancel button
    cancelButtons.forEach(function(button) {
        button.addEventListener('click', function (event) {
            // Prevent the default behavior of the button (e.g., form submission)
            event.preventDefault();

            // Get the parent element of the cancel button
            const parentElement = button.closest('.box');

            // Get the current bid element
            const currentBidElement = parentElement.querySelector('.current-bid');

            // Get the current bid value
            let currentBid = parseInt(currentBidElement.textContent.replace(/\D/g, ''));

            // Decrease the current bid by $100
            currentBid -= 100
            ;

            // Ensure the current bid doesn't go below 0
            if (currentBid < 0) {
                currentBid = 0;
            }

            // Update the current bid element with the new value
            currentBidElement.textContent = 'Current Bid: $' + currentBid;
        });
    });
});
