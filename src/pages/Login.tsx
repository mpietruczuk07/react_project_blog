import { useEffect, useState } from "react";
import { UserType } from "../types/UserType";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getAllUsers } from "../services/api-service";
import { useAppDispatch } from "../redux/hooks";
import { setLoggedUser } from "../redux/userSlice";

const Login = () => {
  const [formValue, setFormValue] = useState<UserType[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getAllUsers()
      .then((res) => {
        setFormValue(res.data);
      })
      .catch((error) => {
        console.error("Error fething: ", error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleLogin = (login: string, password: string) => {
    let accountExists: boolean = false;
    formValue?.forEach((item) => {
      if (item.username === login && item.password === password) {
        dispatch(setLoggedUser(item));
        accountExists = true;
        navigate("/");
        toast.success("Logged in successfully!");
      }
    });
    if (accountExists === false) {
      navigate("/");
      toast.error("User doesn't exist!");
    }
  };

  return (
    <>
      <div
        style={{
          margin: "auto",
          marginTop: "20px",
          display: "flex",
          width: "600px",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "20px",
        }}
        className="container">
        <h1 style={{ marginBottom: "30px" }}>Login </h1>
        <form
          method="POST"
          onSubmit={(event: React.SyntheticEvent) => {
            const target = event.target as typeof event.target & {
              login: { value: string };
              password: { value: string };
            };
            handleLogin(target.login.value, target.password.value);
          }}>
          <label htmlFor="login" className="form-label">
            Username
          </label>
          <input
            type="text"
            name="login"
            className="form-control"
            style={{ width: "400px" }}
          />
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input type="password" name="password" className="form-control" />
          <input
            type="submit"
            className="btn btn-info"
            value="Login"
            style={{ marginTop: "16px" }}
          />
        </form>
      </div>
      <div
        className="container"
        style={{
          marginTop: "20px",
          paddingBottom: "54vh",
        }}>
        <p>
          You don't have an account? Click <a href="/register">here</a> to
          register!
        </p>
      </div>
    </>
  );
};

export default Login;
