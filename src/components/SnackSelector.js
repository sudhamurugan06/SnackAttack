// SnackSelection.js
import React, { useState } from 'react';
import { database } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { ref, set } from 'firebase/database';
import './SnackSelector.css';
import Modal from './Modal'; 

// Static list of common snacks
const snacks = [
  { name: 'Chips', calories: 150, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPD_7Bjl0FSRtyn3L7CPvybnRE8022JEHj-w&s' },
  { name: 'Cookies', calories: 200, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/2ChocolateChipCookies.jpg/1200px-2ChocolateChipCookies.jpg' },
  { name: 'Apple', calories: 95, imageUrl: 'https://media.post.rvohealth.io/wp-content/uploads/sites/3/2022/07/what_to_know_apples_green_red_732x549_thumb.jpg' },
  { name: 'Banana', calories: 105, imageUrl: 'https://images.everydayhealth.com/images/diet-nutrition/how-many-calories-are-in-a-banana-1440x810.jpg' },
  { name: 'Nuts', calories: 170, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMGokX9OzmV9aKtIWIg4pGs6ic_AdbB5AQvg&s' },
  { name: 'Granola Bar', calories: 100, imageUrl: 'https://www.inspiredtaste.net/wp-content/uploads/2022/08/Peanut-Butter-Granola-Bars-3-1200.jpg' },
  { name: 'Popcorn', calories: 50, imageUrl: 'https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_4:3/k%2FPhoto%2FRecipe%20Ramp%20Up%2F2022-02-Cheese-Popcorn%2Fcheese-popcorn-2' },
  { name: 'Yogurt', calories: 150, imageUrl: 'https://images.immediate.co.uk/production/volatile/sites/30/2020/02/Yogurt-40da58e.jpg?quality=90&resize=556,505' },
  { name: 'Chocolate', calories: 200, imageUrl: 'https://w4s8p5t8.rocketcdn.me/wp-content/uploads/2019/01/vegan-milk-chocolate-recipe.jpg' },
  { name: 'Carrots', calories: 25, imageUrl: 'https://individualfitnessllc.com/wp-content/uploads/2022/04/health-benefits-of-carrots.jpg' },
];

const SnackSelection = () => {
    const [currentSnackIndex, setCurrentSnackIndex] = useState(0);
    const [snackChoices, setSnackChoices] = useState([]);
    const [totalCalories, setTotalCalories] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [tip, setTip] = useState('');
    const [insight, setInsight] = useState('');
    const [isHovered, setIsHovered] = useState(false); // Define hover state
    const [points, setPoints] = useState(0);
    const [showRewardModal, setShowRewardModal] = useState(false); // Modal state
    const [rewardMessage, setRewardMessage] = useState(''); // Reward message state

    const navigate = useNavigate();
    const handleSnackChoice = (snack, selected) => {
      const newChoices = [...snackChoices, snack];
      setSnackChoices(newChoices);

      if (selected) {
        setTotalCalories(totalCalories + snack.calories);
        // Add points for healthy snacks
        if (snack.calories < 150) {
            setPoints(points + 10); // Reward points for lower-calorie snacks
        }
      }

      const nextIndex = currentSnackIndex + 1;

      if (nextIndex < snacks.length) {
        setCurrentSnackIndex(nextIndex);
      } else {
        handleQuizCompletion();
      }
    };
    const generateRewardMessage = () => {
        if (points >= 50) {
            return "Great job! You're a snack superstar!";
        } else if (points >= 30) {
            return "Nice work! Keep it up!";
        } else {
            return "Every little bit helps, keep snacking wisely!";
        }
    };
    // Function to share results on social media
    const shareResults = () => {
        const message = `I just completed the Snack Quiz! I ate ${snackChoices.length} snacks totaling ${totalCalories} calories.`;
        const url = `http://localhost:3000/analytics`; // Replace with your app's analytics URL

        // Open a share dialog
        window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(message)}`,
            '_blank'
        );
    };
    const storeUserData = async (snackChoices, totalCalories) => {
      const userId = new Date().getTime(); // Generate a unique user ID based on timestamp
      const userRef = ref(database, `snack_users/${userId}`);

      await set(userRef, {
        snackChoices,
        totalCalories,
        timestamp: new Date().toISOString(),
      });
    };

    const handleQuizCompletion = async () => {
      await storeUserData(snackChoices, totalCalories);
      setShowResults(true);
      setTip(generateTip());
       // Generate and set the reward message
       const message = generateRewardMessage(); 
       setRewardMessage(message); 
       setShowRewardModal(true); 
       console.log(showRewardModal)// Show the modal with the reward message
    };

    const generateTip = () => {
      return "Looks like you're a fan of salty snacks! Try swapping out one for a piece of fruit today.";
    };

    const closeModal = () => {
        setShowRewardModal(false); // Close the modal
    };
 // Calculate progress percentage
 const progressPercentage = Math.round(((currentSnackIndex + 1) / snacks.length) * 100);
 // Calculate calorie counter percentage
 const maxCalories = 1000; // Set a maximum calorie limit for visualization
 const caloriePercentage = Math.min((totalCalories / maxCalories) * 100, 100); // Cap at 100%
 const handleStartOver = () => {
    // Reset all state variables to start over
    setCurrentSnackIndex(0);
    setSnackChoices([]);
    setTotalCalories(0);
    setShowResults(false);
    setTip('');
    setInsight('');
};
  
    return (
      <div className="snack-selection">
        <div className="progress-bar">
        <div className="progress" style={{ width: `${progressPercentage}%` }} />
      </div>
      <div className="calorie-counter">
        <div className="calorie-progress" style={{ width: `${caloriePercentage}%` }} />
        <p>{totalCalories} / {maxCalories} Calories</p>
      </div>
      {!showResults ? (
                <div className="snack-container">
                    <h2>Did you eat this snack today?</h2>
                    <div
                        className={`snack-card ${isHovered ? 'hovered' : ''}`}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <img src={snacks[currentSnackIndex].imageUrl} alt={snacks[currentSnackIndex].name} />
                        <h3>{snacks[currentSnackIndex].name}</h3>
                        <p>Calories: {snacks[currentSnackIndex].calories}</p>
                        <button onClick={() => handleSnackChoice(snacks[currentSnackIndex], true)}>Yes</button>
                        <button onClick={() => handleSnackChoice(snacks[currentSnackIndex], false)}>No</button>
                    </div>
                </div>
            ) : (
                <div className="results">
                    <h2>Total Calories: {totalCalories}</h2>
                    <h3>{tip}</h3>
                    <h4>{insight}</h4>
                    {/* Button to share results */}
                    <button onClick={shareResults}>Share Your Results</button>
                    <h4>{generateRewardMessage()}</h4> {/* Call the function here */}
                    {/* Button to navigate to Analytics page */}
                    <button onClick={() => navigate('/analytics')}>View Analytics</button>
                    <button onClick={handleStartOver}>Start Over</button>

                </div>
            )}
             {showRewardModal && (
                <Modal message={rewardMessage} onClose={closeModal} /> // Show the modal
            )}
      </div>
    );
};

export default SnackSelection;
