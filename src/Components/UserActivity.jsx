import { useParams } from 'react-router-dom';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import app from './Firebase';

const UserActivity = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const db = getFirestore(app);

  useEffect(() => {
    const fetchUser = async () => {
      const docRef = doc(db, "EmployeeData", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUser({ id: docSnap.id, ...docSnap.data() });
      }
    };
    fetchUser();
  }, [id, db]);

  if (!user) return <div>Loading...</div>;

  return (
    <div style={{ padding: 20 }}>
      <h2>User Activity: {user.name}</h2>
      <p>Department: {user.department}</p>
      <p>Clock In: {user.clockIn}</p>
      <p>Clock Out: {user.clockOut}</p>
      <p>Using: {user.using}</p>
      <p>Task: {user.task}</p>
    </div>
  );
};

export default UserActivity;
