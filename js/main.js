                //1.-createElemWithText Function
function createElemWithText(elementType = "p", textContent = "", className= "") {
    // Create the HTML element
    const element = document.createElement(elementType);

    // Set the text content
    element.textContent = textContent;

    // Set the className if provided
    if (className) {
        element.className = className;
    }

    // Return the created element
    return element;
}

                //2.-createSelectOptions Function
// Function to create an array of option elements from users JSON data
function createSelectOptions(users) {
    // Return undefined if no users data is provided
    if (!users) return undefined;

    // Map through the users array and create an option element for each user
    return users.map(user => {
        const option = document.createElement("option"); // Create an option element
        option.value = user.id; // Set the value to the user's ID
        option.textContent = user.name; // Set the text content to the user's name
        return option; // Return the option element
    });
}

// Testing the function with the provided JSON data
async function testCreateSelectOptions() {
    try {
        // Fetch the users data from the given URL
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const users = await response.json();

        // Call the function with the fetched data
        const options = createSelectOptions(users);

        // Log the results to verify the functionality
        console.log("Options created:", options);
        options.forEach(option => console.log(option.outerHTML));
    } catch (error) {
        console.error("Error testing createSelectOptions:", error);
    }
}

// Run the test function
testCreateSelectOptions();

            //3.-toggleCommentSection Function

// Function to toggle the visibility of a section based on postId
function toggleCommentSection(postId) {
    if (!postId) return null; // Ensure postId is provided

    // Select the section element with the corresponding data-post-id attribute
    const section = document.querySelector(`section[data-post-id="${postId}"]`);

    // Check if the section exists
    if (!section) {
        console.warn(`Section with postId ${postId} does not exist.`);
        return null;
    }

    // Toggle the 'hide' class on the section
    section.classList.toggle("hide");

    // Return the section element
    return section;
}

// Testing the function
function testToggleCommentSection() {
    // Create a test section
    const testSection = document.createElement("section");
    testSection.dataset.postId = "123"; // Set the data-post-id attribute
    testSection.className = "comments hide"; // Add initial classes
    document.body.appendChild(testSection); // Append to the document for testing

    console.log("Before toggling:", testSection.className);

    // Call the function to toggle the 'hide' class
    const result = toggleCommentSection("123");

    console.log("After toggling:", testSection.className);

    // Cleanup test section
    document.body.removeChild(testSection);
}

// Run the test function
testToggleCommentSection();

              //4.-toggleCommentButton
// Function to toggle the text of a button based on its current state
function toggleCommentButton(postId) {
    if (!postId) return null; // Ensure postId is provided

    // Select the button element with the corresponding data-post-id attribute
    const button = document.querySelector(`button[data-post-id="${postId}"]`);

    // Check if the button exists
    if (!button) {
        console.warn(`Button with postId ${postId} does not exist.`);
        return null;
    }

    // Toggle the button textContent using a ternary statement
    button.textContent = 
        button.textContent === "Show Comments" ? "Hide Comments" : "Show Comments";

    // Return the button element
    return button;
}

// Testing the function
function testToggleCommentButton() {
    // Create a test button
    const testButton = document.createElement("button");
    testButton.dataset.postId = "123"; // Set the data-post-id attribute
    testButton.textContent = "Show Comments"; // Set initial text content
    document.body.appendChild(testButton); // Append to the document for testing

    console.log("Before toggling:", testButton.textContent);

    // Call the function to toggle the button text
    const result = toggleCommentButton("123");

    console.log("After toggling:", testButton.textContent);

    // Call the function again to toggle the text back
    toggleCommentButton("123");
    console.log("After second toggling:", testButton.textContent);

    // Cleanup test button
    document.body.removeChild(testButton);
}

// Run the test function
testToggleCommentButton();

                      //5.- deleteChildElements

// Function to delete all child elements of a parent element
function deleteChildElements(parentElement) {
    if (!parentElement || !(parentElement instanceof HTMLElement)) {
        console.error("Invalid parent element provided.");
        return null; // Return null if the input is invalid
    }

    // Initialize the child variable as the last child of the parent
    let child = parentElement.lastElementChild;

    // Loop to remove each child until no children remain
    while (child) {
        parentElement.removeChild(child); // Remove the current child
        child = parentElement.lastElementChild; // Update child to the last child
    }

    // Return the parent element after removing all children
    return parentElement;
}

// Testing the function
function testDeleteChildElements() {
    // Create a test parent element with some child elements
    const testParent = document.createElement("div");
    testParent.id = "testParent";
    for (let i = 1; i <= 5; i++) {
        const child = document.createElement("p");
        child.textContent = `Child ${i}`;
        testParent.appendChild(child);
    }

    // Append the testParent to the body for visibility
    document.body.appendChild(testParent);

    console.log("Before deletion:", testParent.innerHTML);

    // Call the deleteChildElements function
    deleteChildElements(testParent);

    console.log("After deletion:", testParent.innerHTML);

    // Cleanup the testParent element
    document.body.removeChild(testParent);
}

// Run the test function
testDeleteChildElements();


                  //6.- addButtonListeners

// Dummy toggleComments function to test the listener
function toggleComments(event, postId) {
    console.log(`toggleComments called for postId: ${postId}`);
    // Placeholder logic for toggleComments
}

// Function to add click event listeners to buttons inside the main element
function addButtonListeners() {
    // Select all buttons inside the main element
    const buttons = document.querySelectorAll("main button");

    // If buttons exist, proceed with adding listeners
    if (buttons.length) {
        // Loop through each button in the NodeList
        buttons.forEach(button => {
            // Get the postId from the button's dataset
            const postId = button.dataset.postId;

            // If a postId exists, add a click event listener
            if (postId) {
                button.addEventListener("click", function (event) {
                    // Call toggleComments with the event and postId as parameters
                    toggleComments(event, postId);
                });
            }
        });
    }

    // Return the NodeList of buttons
    return buttons;
}

// Testing the function
function testAddButtonListeners() {
    // Create a test main element with buttons
    const testMain = document.createElement("main");

    // Add buttons with dataset postId attributes
    for (let i = 1; i <= 3; i++) {
        const button = document.createElement("button");
        button.textContent = `Button ${i}`;
        button.dataset.postId = i.toString();
        testMain.appendChild(button);
    }

    // Append the testMain to the body for testing
    document.body.appendChild(testMain);

    // Call addButtonListeners and verify the output
    const buttons = addButtonListeners();

    console.log("Buttons with event listeners added:", buttons);

    // Simulate a click event for testing
    buttons[0].click();

    // Cleanup testMain element
    document.body.removeChild(testMain);
}

// Run the test function
testAddButtonListeners();


         //7.- removeButtonListeners
// Function to remove click event listeners from buttons inside the main element
function removeButtonListeners() {
    // Select all buttons inside the main element
    const buttons = document.querySelectorAll("main button");

    // If buttons exist, proceed with removing listeners
    if (buttons.length) {
        // Loop through each button in the NodeList
        buttons.forEach(button => {
            // Get the postId from the button's dataset
            const postId = button.dataset.postId;

            // If a postId exists, remove the click event listener
            if (postId) {
                // Define the same callback used in addButtonListeners
                const callback = function (event) {
                    toggleComments(event, postId);
                };

                // Remove the event listener
                button.removeEventListener("click", callback);
            }
        });
    }

    // Return the NodeList of buttons
    return buttons;
}

// Testing the function
function testRemoveButtonListeners() {
    // Create a test main element with buttons
    const testMain = document.createElement("main");

    // Add buttons with dataset postId attributes
    for (let i = 1; i <= 3; i++) {
        const button = document.createElement("button");
        button.textContent = `Button ${i}`;
        button.dataset.postId = i.toString();
        testMain.appendChild(button);
    }

    // Append the testMain to the body for testing
    document.body.appendChild(testMain);

    // Add listeners first to test removal
    addButtonListeners();

    // Call removeButtonListeners and verify the output
    const buttons = removeButtonListeners();

    console.log("Buttons with event listeners removed:", buttons);

    // Try simulating a click event for testing
    buttons[0].click(); // Should not trigger any console log or behavior

    // Cleanup testMain element
    document.body.removeChild(testMain);
}

// Run the test function
testRemoveButtonListeners();


                //8.- createComments

/**
 * Creates a document fragment containing comments as article elements.
 * @param {Array} commentsData - Array of comment objects (JSON format).
 * @returns {DocumentFragment} - A document fragment containing the comments.
 */
function createComments(commentsData) {
    // Check if commentsData is provided and is an array
    if (!commentsData || !Array.isArray(commentsData)) return undefined;

    // Create a document fragment
    const fragment = document.createDocumentFragment();

    // Loop through the comments data
    commentsData.forEach(comment => {
        // Create an article element
        const article = document.createElement("article");

        // Create and append elements using createElemWithText
        const h3 = createElemWithText("h3", comment.name);
        const bodyParagraph = createElemWithText("p", comment.body);
        const emailParagraph = createElemWithText("p", `From: ${comment.email}`);

        // Append the created elements to the article
        article.appendChild(h3);
        article.appendChild(bodyParagraph);
        article.appendChild(emailParagraph);

        // Append the article to the fragment
        fragment.appendChild(article);
    });

    // Return the populated fragment
    return fragment;
}

// Example usage
function testCreateComments() {
    // Example comments data
    const comments = [
        {
            name: "John Doe",
            body: "This is a sample comment body.",
            email: "johndoe@example.com"
        },
        {
            name: "Jane Smith",
            body: "Another insightful comment here.",
            email: "janesmith@example.com"
        }
    ];

    // Call createComments and append the result to the DOM for testing
    const commentsFragment = createComments(comments);
    const main = document.querySelector("main");
    main.appendChild(commentsFragment);
}

// Call the test function
testCreateComments();


        //9.- populateSelectMenu

/**
 * Populates the select menu with user options from JSON data.
 * @param {Array} usersData - Array of user objects (JSON format).
 * @returns {HTMLElement} - The select menu element populated with user options.
 */
function populateSelectMenu(usersData) {
    // Ensure usersData exists and is an array
    if (!usersData || !Array.isArray(usersData)) return undefined;

    // Select the #selectMenu element by id
    const selectMenu = document.getElementById("selectMenu");

    // Create select options using the createSelectOptions function
    const options = createSelectOptions(usersData);

    // Check if options are returned
    if (Array.isArray(options)) {
        // Loop through the options array and append each option to the select menu
        options.forEach(option => {
            selectMenu.appendChild(option);
        });
    }

    // Return the selectMenu element
    return selectMenu;
}

// Example usage
function testPopulateSelectMenu() {
    // Example users data (normally this would be fetched from an API)
    const users = [
        { id: 1, name: "Leanne Graham" },
        { id: 2, name: "Ervin Howell" },
        { id: 3, name: "Clementine Bauch" }
    ];

    // Call populateSelectMenu and test by appending the select menu to the body
    const selectMenuElement = populateSelectMenu(users);
    document.body.appendChild(selectMenuElement);
}

// Call the test function
testPopulateSelectMenu();


          //10.- getUsers
/**
 * Fetches users data from the JSONPlaceholder API.
 * @returns {Promise<Array>} - A promise that resolves to an array of user objects.
 */
async function getUsers() {
    try {
        // Send a GET request to the API to fetch users data
        const response = await fetch('https://jsonplaceholder.typicode.com/users');

        // Check if the response is successful (status 200-299)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the JSON data from the response
        const usersData = await response.json();

        // Return the users data
        return usersData;
    } catch (error) {
        // Catch and log any errors that occur during the fetch operation
        console.error('Error fetching users:', error);
        return [];  // Return an empty array in case of an error
    }
}


        //11.-getUserPosts
/**
 * Fetches posts data for a specific user from the JSONPlaceholder API.
 * @param {number} userId - The ID of the user to fetch posts for.
 * @returns {Promise<Array>} - A promise that resolves to an array of post objects.
 */
async function getUserPosts(userId) {
    try {
        // Make sure the userId is provided
        if (!userId) {
            throw new Error('User ID is required');
        }

        // Fetch posts for the given userId
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);

        // Check if the response is successful
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the response as JSON and return the posts data
        const postsData = await response.json();
        return postsData;
    } catch (error) {
        // Log the error to the console if any occurs
        console.error('Error fetching posts:', error);
        return []; // Return an empty array in case of an error
    }
}

          //12.- getUser
/**
 * Fetches data for a specific user from the JSONPlaceholder API.
 * @param {number} userId - The ID of the user to fetch data for.
 * @returns {Promise<Object>} - A promise that resolves to the user object.
 */
async function getUser(userId) {
    try {
        // Ensure the userId is provided
        if (!userId) {
            throw new Error('User ID is required');
        }

        // Fetch the user data for the provided userId
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);

        // Check if the response is successful
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the response as JSON and return the user data
        const userData = await response.json();
        return userData;
    } catch (error) {
        // Log the error and return an empty object in case of failure
        console.error('Error fetching user:', error);
        return {};  // Return an empty object in case of an error
    }
}


          //13.- getPostComments
/**
 * Fetches comments for a specific post from the JSONPlaceholder API.
 * @param {number} postId - The ID of the post to fetch comments for.
 * @returns {Promise<Array>} - A promise that resolves to the array of comments.
 */
async function getPostComments(postId) {
    try {
        // Ensure the postId is provided
        if (!postId) {
            throw new Error('Post ID is required');
        }

        // Fetch the comments for the specific postId
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);

        // Check if the response is successful
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the response as JSON and return the comments data
        const commentsData = await response.json();
        return commentsData;
    } catch (error) {
        // Log the error and return an empty array in case of failure
        console.error('Error fetching comments:', error);
        return [];  // Return an empty array in case of an error
    }
}


              //14.- displayComments

/**
 * Displays comments for a specific post by fetching them and appending them to a section element.
 * @param {number} postId - The ID of the post for which to display comments.
 * @returns {Promise<HTMLElement>} - A promise that resolves to the section element containing the comments.
 */
async function displayComments(postId) {
    try {
        // Step d: Create a section element
        const section = document.createElement('section');
        
        // Step e: Set the data-post-id attribute to the provided postId
        section.dataset.postId = postId;

        // Step f: Add classes 'comments' and 'hide' to the section element
        section.classList.add('comments', 'hide');
        
        // Step g: Fetch the comments using the getPostComments function
        const comments = await getPostComments(postId);

        // Step h: Create the comments fragment using createComments function
        const fragment = createComments(comments);

        // Step i: Append the fragment to the section
        section.appendChild(fragment);

        // Step j: Return the section element
        return section;
    } catch (error) {
        // Handle any errors that may occur during fetching or appending comments
        console.error('Error displaying comments:', error);
    }
}


            //15.- createPosts
/**
 * Creates posts and associated elements, including author information and comments.
 * @param {Array} posts - The posts data to be used for creating post elements.
 * @returns {Promise<HTMLElement>} - A promise that resolves to a fragment element containing the posts.
 */
async function createPosts(posts) {
    try {
        // Step d: Create a document fragment to hold the post elements
        const fragment = document.createDocumentFragment();

        // Step e: Loop through each post in the posts data
        for (let post of posts) {
            // Step g: Create an article element for each post
            const article = document.createElement('article');

            // Step h: Create an h2 element with the post title
            const title = createElemWithText('h2', post.title);
            
            // Step i: Create a p element with the post body
            const body = createElemWithText('p', post.body);
            
            // Step j: Create another p element with the post ID
            const postId = createElemWithText('p', `Post ID: ${post.id}`);
            
            // Step k: Fetch the author information using getUser function
            const author = await getUser(post.userId);
            
            // Step l: Create another p element with the author name and company name
            const authorInfo = createElemWithText('p', `Author: ${author.name} with ${author.company.name}`);
            
            // Step m: Create another p element with the author's company catchphrase
            const companyCatchphrase = createElemWithText('p', `"${author.company.catchPhrase}"`);
            
            // Step n: Create a button element with the text 'Show Comments'
            const button = document.createElement('button');
            button.textContent = 'Show Comments';
            button.dataset.postId = post.id;

            // Step p: Append the h2, paragraphs, and button to the article element
            article.appendChild(title);
            article.appendChild(body);
            article.appendChild(postId);
            article.appendChild(authorInfo);
            article.appendChild(companyCatchphrase);
            article.appendChild(button);

            // Step q: Get the section with comments using displayComments function
            const section = await displayComments(post.id);

            // Step r: Append the section with comments to the article element
            article.appendChild(section);

            // Step s: Append the article to the fragment
            fragment.appendChild(article);
        }

        // Step t: Return the fragment element containing all the posts
        return fragment;
    } catch (error) {
        // Handle any errors that may occur during fetching data or creating elements
        console.error('Error creating posts:', error);
    }
}

          //16.- displayPosts
/**
 * Displays posts on the page.
 * @param {Array} posts - The posts data to be used for creating post elements.
 * @returns {Promise<HTMLElement>} - A promise that resolves to the created or default element.
 */
async function displayPosts(posts) {
    try {
        // Step d: Select the main element where posts will be displayed
        const mainElement = document.querySelector('main');

        // Step e: Create the element based on the posts data
        const element = posts && posts.length > 0 
            ? await createPosts(posts) // If posts exist, create posts
            : createElemWithText('p', 'No posts available.'); // Default message if no posts

        // Step f: Append the created element (posts or default message) to the main element
        mainElement.appendChild(element);

        // Step g: Return the element variable
        return element;
    } catch (error) {
        // Handle any errors that may occur during the process
        console.error('Error displaying posts:', error);
    }
}

/////////////// 17.- toggleComments
/**
 * Toggles the visibility of the comments section and button text.
 * @param {Event} event - The click event triggered by the button.
 * @param {number} postId - The ID of the post for which to toggle the comments.
 * @returns {Array} - An array containing the section element and the button element.
 */
function toggleComments(event, postId) {
    // Step c: Set event.target.listener = true for testing purposes
    event.target.listener = true;

    // Step d: Pass the postId to toggleCommentSection and get the section element
    const section = toggleCommentSection(postId);

    // Step f: Pass the postId to toggleCommentButton and get the button element
    const button = toggleCommentButton(postId);

    // Step h: Return an array containing both the section and button elements
    return [section, button];
}


////////////////////   18.-refreshPosts
/**
 * Refreshes the posts displayed on the page by removing old buttons, clearing existing content,
 * displaying new posts, and re-adding event listeners to buttons.
 * @param {Array} posts - The JSON data representing the posts to display.
 * @returns {Array} - An array containing the results from the sequence of function calls.
 */
async function refreshPosts(posts) {
    // Step d: Call removeButtonListeners to remove any existing button event listeners
    const removeButtons = removeButtonListeners();

    // Step f: Call deleteChildElements to clear the content from the main element
    const main = document.querySelector('main');
    deleteChildElements(main);

    // Step h: Call displayPosts to display the new posts and await its completion
    const fragment = await displayPosts(posts);

    // Step j: Call addButtonListeners to add new event listeners to buttons
    const addButtons = addButtonListeners();

    // Step l: Return an array of results from the function calls
    return [removeButtons, main, fragment, addButtons];
}

//////////////////   19.- selectMenuChangeEventHandler
/**
 * Handles the change event on the select menu to fetch and display posts for a selected user.
 * @param {Event} event - The change event triggered by selecting a new user in the select menu.
 * @returns {Array} - An array containing the userId, posts, and the result from refreshPosts.
 */
async function selectMenuChangeEventHandler(event) {
    // Step d: Disable the select menu while data is being fetched
    const selectMenu = document.querySelector('#selectMenu');
    selectMenu.disabled = true;

    // Step e: Define userId from the select menu value, default to 1 if no value selected
    const userId = event.target.value || 1;

    try {
        // Step f: Pass the userId to getUserPosts to fetch posts for the selected user
        const posts = await getUserPosts(userId);

        // Step h: Pass the posts to refreshPosts to refresh the posts display
        const refreshPostsArray = await refreshPosts(posts);

        // Step j: Re-enable the select menu after the results are received
        selectMenu.disabled = false;

        // Step k: Return an array containing userId, posts, and the result of refreshPosts
        return [userId, posts, refreshPostsArray];
    } catch (error) {
        console.error("Error fetching posts or refreshing posts:", error);

        // Step j: Ensure the select menu is re-enabled even if an error occurs
        selectMenu.disabled = false;

        // Return the error for debugging or further handling
        return [userId, [], []];
    }
}


////////////////////   20.- initPage
/**
 * Initializes the page by fetching users data and populating the select menu.
 * @returns {Array} - An array containing the users JSON data and the select menu element.
 */
async function initPage() {
    try {
        // Step d: Call await getUsers to fetch the users data
        const users = await getUsers();

        // Step f: Pass the users data to the populateSelectMenu function
        const select = populateSelectMenu(users);

        // Step h: Return an array containing the users data and the select menu element
        return [users, select];
    } catch (error) {
        console.error("Error initializing the page:", error);
        // In case of an error, return empty arrays to handle failure gracefully
        return [[], null];
    }
}


//////////////////////  21.- initApp
/**
 * Initializes the app by calling initPage and setting up the select menu change event listener.
 */
async function initApp() {
    try {
        // Step b: Call the initPage function to fetch users data and populate the select menu
        const [users, select] = await initPage();

        // Step c: Select the #selectMenu element by its ID
        const selectMenu = document.getElementById('selectMenu');

        // Step d: Add an event listener to the #selectMenu for the "change" event
        if (selectMenu) {
            selectMenu.addEventListener('change', (event) => {
                // Step e: The event listener calls selectMenuChangeEventHandler when the "change" event fires
                selectMenuChangeEventHandler(event);
            });
        }
    } catch (error) {
        console.error("Error initializing the app:", error);
    }
}


///////////////////// 22. Last Step
// Add an event listener to the document to call initApp after the DOM content has loaded
document.addEventListener('DOMContentLoaded', () => {
    initApp();
});
