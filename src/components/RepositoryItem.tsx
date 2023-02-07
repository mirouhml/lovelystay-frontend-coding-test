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
    <li className='repository-item'>
      <h2 className='repository-name'>{name}</h2>
      {description && <p className='repository-description'>{description}</p>}
      {!description && (
        <p className='repository-description'>No description provided</p>
      )}
    </li>
  );
};

export default RepositoryItem;
