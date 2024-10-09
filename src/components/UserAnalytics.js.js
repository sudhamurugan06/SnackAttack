import React, { useEffect, useState } from 'react';
import { database } from '../firebase'; // Adjust the path according to your project structure
import { ref, get, child } from 'firebase/database';
import './UserAnalytics.css';
import { useNavigate } from 'react-router-dom';


const UserAnalytics = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [mostRecentUser, setMostRecentUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchAnalyticsData = async () => {
      const dbRef = ref(database);
      
      try {
        // Get the data for all users
        const snapshot = await get(child(dbRef, 'snack_users'));

        if (snapshot.exists()) {
          const userData = snapshot.val();
          const users = Object.values(userData);
          const userCount = users.length;
          const recentUser = users[users.length - 1]; // Get the most recent user

          // Set state with fetched data
          setTotalUsers(userCount);
          setMostRecentUser(recentUser);
        } else {
          console.log('No data available');
        }
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchAnalyticsData();
  }, []);

  return (
    <div className="analytics-container">
      <h2>Analytics</h2>

      <div className="total-users">
        <h3>Total Users Completed the Quiz: {totalUsers}</h3>
      </div>

      {mostRecentUser ? (
        <div className="recent-user">
          <h3>Most Recent User Data</h3>
          <p>Total Calories: {mostRecentUser.totalCalories}</p>

          <h4>Snack Choices:</h4>
          <ul>
            {mostRecentUser.snackChoices.map((snack, index) => (
              <li key={index}>
                {snack.name} - {snack.calories} calories
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading recent user data...</p>
      )}
      {/* Start Over Button */}
      <button onClick={() => navigate('/')}>Start Over</button>
    </div>
  );
};

export default UserAnalytics;
