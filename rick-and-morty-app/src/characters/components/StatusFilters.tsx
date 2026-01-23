interface Props {
  onStatusChange: (status: string) => void;
  currentStatus: string;
}

export const StatusFilters = ({ onStatusChange, currentStatus }: Props) => {
  const statuses = ['Alive', 'Dead', 'unknown'];

  return (
    <div className="filters-container">
      <button 
        className={ currentStatus === '' ? 'active' : '' }
        onClick={() => onStatusChange('')}
      >
        All
      </button>
      
      {statuses.map(status => (
        <button
          key={status}
          className={ currentStatus === status ? 'active' : '' }
          onClick={() => onStatusChange(status)}
        >
          {status}
        </button>
      ))}
    </div>
  );
};