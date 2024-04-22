const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON requests
app.use(express.json());

// Sample data for recommended art
const recommendedArt = {
    paintings: [
        {id: 1, name: 'Painting 1'},
        {id: 2, name: 'Painting 2'},
        {id: 3, name: 'Painting 3'}
    ],
    sculpture: [
        {id: 4, name: 'Sculpture 1'},
        {id: 5, name: 'Sculpture 2'},
        {id: 6, name: 'Sculpture 3'}
    ],
    engravings: [
        {id: 7, name: 'Engraving 1'},
        {id: 8, name: 'Engraving 2'},
        {id: 9, name: 'Engraving 3'}
    ]
};

// Route to fetch recommendations based on user's choices
app.get('/recommendations', (req, res, next) => {
    try {
        const {categories} = req.query;
        if (!categories) {
            throw new Error('Categories parameter is required');
        }
        const categoryList = categories.split(',').map(category => category.trim().toLowerCase());
        const recommendations = categoryList.reduce((acc, category) => {
            if (recommendedArt[category]) {
                acc.push(...recommendedArt[category]);
            }
            return acc;
        }, []);
        res.json(recommendations);
    } catch (error) {
        next(error);
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({error: 'Something went wrong!'});
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Fetch recommended items from the backend
function fetchRecommendedItems() {
    fetch('/api/recommendations')
        .then(response => response.json())
        .then(data => {
            // Once data is fetched, update the DOM with recommended items
            displayRecommendedItems(data);

            // Check auction end time for each item and move to respective sections if expired
            data.forEach(item => {
                const endTime = new Date(item.endTime).getTime(); // Assuming each item has an 'endTime' property
                const currentTime = new Date().getTime();
                if (currentTime > endTime) {
                    moveItemToSection(item.id, item.sectionId);
                }
            });
        })
        .catch(error => {
            console.error('Error fetching recommended items:', error);
        });
}

function moveItemToSection(itemId, sectionId) {
    // Logic to move the item to its respective section based on sectionId
    const item = document.getElementById(`futureItem${itemId}`);
    const section = document.getElementById(sectionId);
    if (item && section) {
        section.appendChild(item);
    }
}


// Display recommended items on the frontend
function displayRecommendedItems(items) {
    const recommendContainer = document.querySelector('.recommend-container');
    recommendContainer.innerHTML = ''; // Clear previous recommendations

    items.forEach(item => {
        const box = document.createElement('div');
        box.classList.add('box');

        const img = document.createElement('img');
        img.src = item.imageURL;

        const artist = document.createElement('h3');
        artist.textContent = `Artist: ${item.artist}`;

        const price = document.createElement('h4');
        price.textContent = `Price: $${item.price}`;

        const bidButton = document.createElement('a');
        bidButton.href = '#';
        bidButton.classList.add('btn');
        bidButton.textContent = 'Bid Now';

        box.appendChild(img);
        box.appendChild(artist);
        box.appendChild(price);
        box.appendChild(bidButton);

        recommendContainer.appendChild(box);
    });
}

// Call fetchRecommendedItems when the page loads or when the Recommend button is clicked
document.addEventListener('DOMContentLoaded', function () {
    const recommendBtn = document.querySelector('.recommend-btn');
    recommendBtn.addEventListener('click', fetchRecommendedItems);
});

document.addEventListener("DOMContentLoaded", function () {
    // Assume `biddingHistory` is an array of objects representing the bidder's bidding history
    const bidderId = getUserId(); // Function to get the current bidder's ID
    const biddingHistory = getBiddingHistory(bidderId); // Function to retrieve bidding history

    // Generate recommendations based on bidding history
    const recommendations = generateRecommendations(biddingHistory);

    // Display recommendations in the recommended section
    displayRecommendations(recommendations);
});

function getUserId() {
    // Function to retrieve the current bidder's ID
}

function getBiddingHistory(bidderId) {
    // Function to retrieve the bidding history of the bidder from the data storage
    // Return an array of objects representing the bidding history
}

function generateRecommendations(biddingHistory) {
    // Function to generate recommendations based on bidding history
    // Return an array of recommended artworks
}

function displayRecommendations(recommendations) {
    // Function to display recommendations in the recommended section
    // Iterate through the recommendations and display each artwork
}



