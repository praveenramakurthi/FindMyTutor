import React, { useContext } from 'react';
import { TutorContext } from '../Context/Context';
import UserProfiles from './UserProfiles';

const SomeComponent = () => {
  const { toggleProfileBox } = useContext(TutorContext);

  return (
    <div>
      <button onClick={toggleProfileBox}>Open Profile</button>
      <UserProfiles />
    </div>
  );
};

export default SomeComponent;
