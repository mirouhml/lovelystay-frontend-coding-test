import React, { ReactElement } from 'react';

interface RepositoryItemProps {
  name: string;
  description: string;
}

const RepositoryItem = ({
  name,
  description,
}: RepositoryItemProps): ReactElement => {
  return (
    <div>
      <h2>Repository name: {name}</h2>
      <p>Repository description: {description}</p>
    </div>
  );
};

export default RepositoryItem;
