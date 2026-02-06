import "./SearchRecentOrders.css";

type SearchFilters = {
  sellerType: string;
  startDate: string;
  endDate: string;
};

type SearchProps = {
  onSearchChange: (filters: SearchFilters) => void;
  filters: SearchFilters;
};

function SearchRecentOrders({ onSearchChange, filters }: SearchProps) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    onSearchChange({ ...filters, [name]: value });
  };

  return (
    <section className="searchRecentOrders-container">
      <div className="searchRecentOrders-group">
        <label htmlFor="sellerType">Vendeur : </label>
        <select
          name="sellerType"
          id="sellerType"
          value={filters.sellerType}
          onChange={handleChange}
        >
          <option value="all">Tous</option>
          <option value="admin">L'écrin du temps</option>
          <option value="customer">Particulier</option>
        </select>
      </div>

      <div className="searchRecentOrders-group">
        <label htmlFor="startDate">Du : </label>
        <input
          type="date"
          name="startDate"
          id="startDate"
          value={filters.startDate}
          onChange={handleChange}
        />
      </div>

      <div className="searchRecentOrders-group">
        <label htmlFor="endDate">Au : </label>
        <input
          type="date"
          name="endDate"
          id="endDate"
          value={filters.endDate}
          onChange={handleChange}
        />
      </div>
    </section>
  );
}

export default SearchRecentOrders;
