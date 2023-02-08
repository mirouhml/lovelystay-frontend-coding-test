import React, { ReactElement } from 'react';

interface RepositoryItemProps {
  name: string;
  description: string;
}

/**
 * RepositoryItem component is a stateless component that
 * displays a repository item with its name and description.
 *
 * @param name - Repository name.
 * @param description - Repository description.
 * @returns ReactElement
 */
const RepositoryItem = ({
  name,
  description,
}: RepositoryItemProps): ReactElement => {
  return (
    <li className='repository-item'>
      {/* Repository name */}
      <h3 className='repository-name'>{name}</h3>
      {/* Repository description */}
      {description && <p className='repository-description'>{description}</p>}
      {!description && (
        <p className='repository-description'>No description provided</p>
      )}
    </li>
  );
};

export default RepositoryItem;
