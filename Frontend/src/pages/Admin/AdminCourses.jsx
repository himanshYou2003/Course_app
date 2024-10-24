import { useEffect, useState } from "react";
import Card from "../../components/card";
import { Link, useNavigate } from "react-router-dom";

function AdminCourses() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const token = localStorage.getItem('token');  
  const navigate = useNavigate()

  useEffect(() => {
    fetch("http://localhost:3000/admin/courses", {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(data => {
      setData(data.courses);
      setFilteredData(data.courses);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }, [token]);

  useEffect(() => {
    if (search === "") {
      setFilteredData(data);
    } else {
      const filtered = data.filter(course =>
        course.title.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [search, data]);

  const handleClick = (title) => {
    navigate("edit")
    // navigate("/admin/edit", { state: { courseId, title } });
  }

  return (
    <div className="py-10 px-4 max-w-7xl mx-auto">
      <div className="mb-8 flex items-center gap-8">
        <Link to="/adminName" className="bg-gray-800 text-white py-2 px-4 text-xl rounded-md transition-transform transform hover:bg-gray-700 hover:scale-105">
        &larr; Back
        </Link>
        <h1 className="text-4xl font-bold text-gray-800 text-center">Your Courses</h1>
      </div>
      <div className="mb-3 bg-green-100 p-5 flex gap-5 flex-col rounded-lg shadow-lg">
        <div>
          <input 
            type="text" 
            placeholder="Search for Best Course" 
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
            className="pl-3 py-2 pr-24 rounded-lg"
          />
        </div>
        {filteredData.length === 0 ? (
          <div className="w-full text-center">Good Things Take Time</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredData.map((val) => (
              <Card 
                key={val._id}
                title={val.title} 
                description={val.description} 
                imageLink={val.imageLink} 
                price={val.price} 
                buttonText={"View"}
                handleClick={() => handleClick(val)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminCourses;
