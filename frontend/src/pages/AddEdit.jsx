import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "./Home.css";

const AddEdit = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
  });

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/api/get/${id}`).then((res) => {
        setFormData({
          firstName: res.data[0].firstName,
          lastName: res.data[0].lastName,
        });
      });
    }
  }, [id]);

  const { firstName, lastName } = formData;

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!firstName || !lastName) {
      toast.error("Please fill all the input fields");
    } else {
      if (!id) {
        axios
          .post("http://localhost:5000/api/post", {
            firstName,
            lastName,
          })
          .then(() => {
            setFormData({ firstName: "", lastName: "" });
          })
          .catch((err) => toast.error(err.response.data));

        setTimeout(() => {
          toast.success("Person Added Successfully");
          navigate("/");
        }, 500);
      } else {
        axios
          .put(`http://localhost:5000/api/update/${id}`, {
            firstName,
            lastName,
          })
          .then(() => {
            setFormData({ firstName: "", lastName: "" });
          })
          .catch((err) => toast.error(err.response.data));

        setTimeout(() => {
          toast.success("Person Updated Successfully");
          navigate("/");
        }, 500);
      }
    }
  };

  return (
    <div className="container">
      <Link to="/">
        <button className="btn btn-secondary">Back</button>
      </Link>
      <form onSubmit={submitHandler}>
        <div className="form-field">
          <label htmlFor="firstName">Firstname: </label>
          <input
            onChange={handleChange}
            type="text"
            id="firstName"
            name="firstName"
            value={firstName || ""}
            placeholder="First Name"
          />
        </div>
        <div className="form-field">
          <label htmlFor="lastName">Lastname: </label>
          <input
            onChange={handleChange}
            type="text"
            id="lastName"
            name="lastName"
            value={lastName || ""}
            placeholder="Last Name"
          />
        </div>
        <input type="submit" value={id ? "Update" : "Add"} className="btn" />
      </form>
    </div>
  );
};

export default AddEdit;
