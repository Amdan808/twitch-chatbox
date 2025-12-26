// Implement getUserSummary(userId) using Promise chaining.

// Requirements recap

// Simulate:

// fetch user

// fetch posts for that user

// Return { userId, postCount }

// No async/await in this exercise.

// Errors should propagate (don’t swallow).

// Provide these in your next message

// fetchUser(userId) (returns Promise)

// fetchPostsByUser(userId) (returns Promise of an array)

// getUserSummary(userId) implemented using .then(...)

// Use your sleep(ms) inside the simulated fetches.

// Paste your code and I’ll review:

// correct returns inside .then

// whether you accidentally create nested Promises

// error propagation and edge cases (e.g., empty posts)
function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

function fetchUser(userId) {
    return sleep(100).then(() => userId);
}

function fetchPostsByUser(userId) {
    const samplePosts = Array.from({ length: 3 }, (_, index) => `${userId}-post-${index + 1}`);
    return sleep(100).then(() => samplePosts);
}

function getUserSummary(userId) {
    return fetchUser(userId).then((user) => {
        return fetchPostsByUser(user).then((posts) => {
            return {
                userId: user,
                postCount: posts.length,
            };
        });
    });
}

getUserSummary('example-id').then((summary) => console.log(summary));