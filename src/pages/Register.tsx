import { useEffect, useState } from "react";
import { UserType } from "../types/UserType";
import { useNavigate } from "react-router-dom";
import validation from "../components/RegisterValidator";
import { addUser } from "../services/api-service";
import { toast } from "react-toastify";

const Register = () => {
  const [formValue, setFormValue] = useState<UserType>({
    name: "",
    username: "",
    email: "",
    password: "",
    role: "user",
  });

  const [errors, setErrors] = useState<UserType>({
    name: "",
    username: "",
    email: "",
    password: "",
    role: "",
  });

  const [dataIsCorrect, setDataIsCorrect] = useState(false);

  const [formIsSubmitted, setFormIsSubmitetd] = useState(false);

  const submitForm = () => {
    setFormIsSubmitetd(true);
  };
  const navigate = useNavigate();

  useEffect(() => {
    if (Object.keys(errors).length === 0) {
      const userData = { ...formValue };
      setDataIsCorrect(true);
      uploadData(userData);
    }
  }, [errors]);

  const handleChange = (e: any) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    setErrors(validation(formValue));
    setDataIsCorrect(true);
  };

  const uploadData = async (userData: UserType) => {
    try {
      await Promise.all([
        await addUser(userData).then(
          (res) => {
            navigate("/");
            toast.success("Account created successfully!");
          },
          (err) => {
            toast.error("Error while creating the account!");
          }
        ),
      ]);
    } catch {}

    setFormValue({
      name: "",
      username: "",
      email: "",
      password: "",
      role: "user",
    });
  };

  return (
    <>
      <div
        className="container"
        style={{
          margin: "auto",
          marginTop: "20px",
          display: "flex",
          width: "600px",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "20px",
        }}>
        <h1 style={{ marginBottom: "30px" }}>Register </h1>
        <form method="POST">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            name="name"
            style={{ width: "400px" }}
            className="form-control"
            placeholder="Put your name here..."
            value={formValue.name}
            onChange={handleChange}
          />
          {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            name="username"
            className="form-control"
            placeholder="Put your username here..."
            value={formValue.username}
            onChange={handleChange}
          />
          {errors.username && <p style={{ color: "red" }}>{errors.username}</p>}
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Put you email here..."
            value={formValue.email}
            onChange={handleChange}
          />
          {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Put your password here..."
            value={formValue.password}
            onChange={handleChange}
          />
          {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
          <input
            type="text"
            name="role"
            value="user"
            onChange={handleChange}
            hidden></input>
          <button
            type="submit"
            style={{ marginTop: "16px" }}
            className="btn btn-info"
            onClick={handleFormSubmit}>
            Register
          </button>
        </form>
      </div>
      <div
        className="container"
        style={{
          marginTop: "20px",
          paddingBottom: "44vh",
        }}>
        <p>
          You already have an account? Click <a href="/login">here </a>to log
          in!
        </p>
      </div>
    </>
  );
};

export default Register;
