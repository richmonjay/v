document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.valentine-container');
    const numberOfHearts = 14;

    for (let i = 0; i < numberOfHearts; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.style.top = `${Math.random() * 100}%`;
        heart.style.left = `${Math.random() * 100}%`;
        container.appendChild(heart);
    }

    const startButton = document.getElementById('start-button');
    const buttonDiv = document.querySelector('.button');
    const questionDiv = document.querySelector('.question');
    const changeText = document.querySelector('.change');
    const noButton = questionDiv.querySelector('button:nth-child(2)');
    const yesButton = questionDiv.querySelector('button:nth-child(1)');
    const imagesDiv = document.querySelector('.images');
    const letterDiv = document.querySelector('.letter');
    const letterText = letterDiv.querySelector('p');
    const backgroundMusic = document.getElementById('background-music');

    let noClickCount = 0;

    startButton.addEventListener('click', () => {
        startButton.classList.add('pressed');
        setTimeout(() => {
            startButton.classList.remove('pressed');
            buttonDiv.style.display = 'none';
            questionDiv.style.display = 'block'; 
            setTimeout(() => {
                questionDiv.classList.add('show');
            }, 500); 
        }, 500); // Match the transition duration
    });

    noButton.addEventListener('click', () => {
        noClickCount++;
        if (noClickCount === 1) {
            changeText.textContent = 'Are you sure?🥹';
        } else if (noClickCount === 2) {
            changeText.textContent = 'Don\'t break my heart.😣';
        } else if (noClickCount === 3) {
            changeText.textContent = 'I\'ll make you happy.✨';
        } else if (noClickCount === 4) {
            changeText.textContent = 'Think about all our memories.📸';
            noButton.style.display = 'none'; // Make the no button disappear after 4 clicks
        }
    
        // Change height and width of yes and no buttons
        yesButton.style.height = `${parseInt(yesButton.style.height || 40) + 5}px`;
        yesButton.style.width = `${parseInt(yesButton.style.width || 70) + 5}px`;
        noButton.style.height = `${parseInt(noButton.style.height || 40) - 5}px`;
        noButton.style.width = `${parseInt(noButton.style.width || 70) - 5}px`;
    
        // Change position of no button to a random position
        noButton.style.position = 'absolute';
        noButton.style.top = `${Math.random() * 80}%`;
        noButton.style.left = `${Math.random() * 80}%`;
    });

    yesButton.addEventListener('click', () => {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });

        // Hide the question div after 2 seconds with a smooth transition
        setTimeout(() => {
            questionDiv.classList.remove('show');
            setTimeout(() => {
                questionDiv.style.display = 'none';
                imagesDiv.style.display = 'flex'; // Show the images container

                // Start infinite confetti
                setInterval(() => {
                    confetti({
                        particleCount: 100,
                        spread: 70,
                        origin: { y: 0.6 }
                    });
                }, 2000); // Adjust the interval as needed

                // Show the letter with a delay and typewriter effect
                setTimeout(() => {
                    letterDiv.style.display = 'block';
                    letterDiv.classList.add('show');
                    typeWriterEffect(letterText);
                    // Play the background music starting at 0 seconds
                    backgroundMusic.currentTime = 0;
                    backgroundMusic.play();
                }, 2000); // Adjust the delay as needed

            }, 500); // Match the transition duration
        }, 2000);
    });

    questionDiv.style.display = 'none';
    imagesDiv.style.display = 'none'; // Initially hide the images container
    letterDiv.style.display = 'none'; // Initially hide the letter

    function typeWriterEffect(element) {
        const sentences = element.textContent.split('.').filter(sentence => sentence.trim() !== '');
        const chunks = sentences.map(sentence => sentence.trim() + '.');
        element.textContent = '';
        let chunkIndex = 0;
        const speed = 50; // Adjust the speed of the typewriter effect

        function typeChunk(chunk) {
            let i = 0;
            const chunkElement = document.createElement('span');
            element.appendChild(chunkElement);

            function type() {
                if (i < chunk.length) {
                    chunkElement.textContent += chunk.charAt(i);
                    i++;
                    setTimeout(type, speed);
                } else {
                    // Chunk typing completed, start fading out after a delay
                    if (chunkIndex < chunks.length - 1) {
                        setTimeout(() => {
                            fadeOut(chunkElement);
                        }, 1000); // Adjust the delay before fading out
                    }
                }
            }

            type();
        }

        function fadeOut(element) {
            let opacity = 1;
            const fadeSpeed = 0.05; // Adjust the fade out speed

            function fade() {
                if (opacity > 0) {
                    opacity -= fadeSpeed;
                    element.style.opacity = opacity;
                    setTimeout(fade, 50);
                } else {
                    element.remove();
                    chunkIndex++;
                    if (chunkIndex < chunks.length) {
                        typeChunk(chunks[chunkIndex]);
                    }
                }
            }

            fade();
        }

        // Start typing the first chunk
        if (chunks.length > 0) {
            typeChunk(chunks[chunkIndex]);
        }
    }
});