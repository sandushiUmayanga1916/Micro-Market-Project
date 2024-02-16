import React, { useEffect, useState } from "react";
import Cards from "./../../components/Cards";
import { FaFilter } from "react-icons/fa";

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  useEffect(() => {
    // Fetch data from the backend
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/menu");
        const data = await response.json();
        // console.log(data);
        setMenu(data);
        setFilteredItems(data); // Initially, display all items
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // filter data  based on category
  const filterItems = (category) => {
    const filtered =
      category === "all"
        ? menu
        : menu.filter((item) => item.category.includes(category));

    setFilteredItems(filtered);
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  // Show all data
  const showAll = () => {
    setFilteredItems(menu);
    setSelectedCategory("all");
    setCurrentPage(1);
  };

  // sorting A-Z, Z-A, and Low - High Pricing
  const handleSortChange = (option) => {
    setSortOption(option);

    // Logic for sorting based on the selected option
    let sortedItems = [...filteredItems];

    switch (option) {
      case "A-Z":
        sortedItems.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Z-A":
        sortedItems.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "low-to-high":
        sortedItems.sort((a, b) => a.price - b.price);
        break;
      case "high-to-low":
        sortedItems.sort((a, b) => b.price - a.price);
        break;
      default:
        // Do nothing for the "default" case
        break;
    }

    setFilteredItems(sortedItems);
    setCurrentPage(1);
  };

  // pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      {/* menu banner */}
      <div className=" selection-container">
        <div className="py-40 flex  md:flex-row justify-center items-center gap-8">
          {/* text */}
          <div className=" text-center space-y-7 px-4">
            <h2 className=" md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
              For the Power of Reliable
              <span className=" text-0-yellowColor"> Battery</span>
            </h2>
            <p className=" text-xl text-secondaryColor md:w-4/5 mx-auto">
              Energize your journey with a symphony of potent batteries,
              ensuring sustained power and enduring vitality for your vehicle
            </p>
            <button className=" bg-0-yellowColor text-white uppercase px-8 py-3 rounded-full">
              order now
            </button>
          </div>
        </div>
      </div>

      {/* menu section */}
      <div className=" selection-container">
        {/*   filter buttons*/}
        <div className="flex flex-col md:flex-row flex-wrap md:justify-between items-center space-y-3 mb-8">
          {/* buttons */}
          <div className="flex flex-row justify-start md:items-center md:gap-8 gap-4  flex-wrap">
            <button
              onClick={showAll}
              className={`focus:text-0-yellowColor focus:font-bold ${
                selectedCategory === "all" ? "active" : ""
              }`}
            >
              All
            </button>
            <button
              onClick={() => filterItems("popular")}
              className={`focus:text-0-yellowColor focus:font-bold ${
                selectedCategory === "popular" ? "active" : ""
              }`}
            >
              Popular
            </button>
            <button
              onClick={() => filterItems("car")}
              className={`focus:text-0-yellowColor focus:font-bold ${
                selectedCategory === "car" ? "active" : ""
              }`}
            >
              Car
            </button>
            <button
              onClick={() => filterItems("bike")}
              className={`focus:text-0-yellowColor focus:font-bold ${
                selectedCategory === "bike" ? "active" : ""
              }`}
            >
              Bike
            </button>
            <button
              onClick={() => filterItems("van")}
              className={`focus:text-0-yellowColor focus:font-bold ${
                selectedCategory === "van" ? "active" : ""
              }`}
            >
              Van
            </button>
            <button
              onClick={() => filterItems("other")}
              className={`focus:text-0-yellowColor focus:font-bold ${
                selectedCategory === "other" ? "active" : ""
              }`}
            >
              Other
            </button>
          </div>

          {/* sorting base filtering */}
          <div className="flex justify-end mb-4 rounded-sm">
            <div className=" bg-0-greenColor p-2 ">
              <FaFilter className="text-white h-4 w-4" />
            </div>
            <select
              id="sort"
              onChange={(e) => handleSortChange(e.target.value)}
              value={sortOption}
              className=" bg-0-greenColor text-white px-2 py-1 rounded-sm"
            >
              <option value="default"> Default</option>
              <option value="A-Z">A-Z</option>
              <option value="Z-A">Z-A</option>
              <option value="low-to-high">Low to High</option>
              <option value="high-to-low">High to Low</option>
            </select>
          </div>
        </div>

        {/* product card */}
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 pb-20">
          {filteredItems.map((item) => (
            <Cards key={item._id} item={item} />
          ))}
        </div>
      </div>

      {/* pagination */}
      <div className="flex justify-center my-8">
        {Array.from({
          length: Math.ceil(filteredItems.length / itemsPerPage),
        }).map((_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`mx-1 px-3 py-1 rounded-full ${
              currentPage === index + 1
                ? " bg-0-yellowColor text-white"
                : "bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Menu;
