import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "./Home.css";

const Home = () => {
  const [datas, setDatas] = useState([]);

  const loadData = async () => {
    const response = await axios.get("http://localhost:5000/api/get");
    setDatas(response.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const deletePerson = (id) => {
    if (window.confirm("Are you sure?")) {
      axios.delete(`http://localhost:5000/api/remove/${id}`);
      // .then(() => loadData());
      toast.success("Person Deleted Successfully");
      setTimeout(loadData, 500);
    }
  };

  return (
    <>
      <div className="container">
        <Link to="/addPerson">
          <button className="btn btn-secondary">Add Person</button>
        </Link>
        {datas.length !== 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>SN</th>
                <th>Firstname</th>
                <th>LastName</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {datas.map((item, index) => {
                return (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>
                      <Link to={`/update/${item.id}`}>
                        <button
                          style={{ "margin-right": "10px" }}
                          className="btn btn-primary"
                        >
                          Edit
                        </button>
                      </Link>
                      <button
                        className="btn btn-danger"
                        onClick={() => deletePerson(item.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <h2>No Datas Found </h2>
        )}
      </div>
    </>
  );
};

export default Home;
