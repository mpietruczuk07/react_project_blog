import { MDBFooter, MDBIcon, MDBRow, MDBBtn } from "mdb-react-ui-kit";
import CurrentDate from "./CurrentDate";

const Footer = () => {
  return (
    <MDBFooter
      className="text-center"
      color="white"
      bgColor="info"
      style={{ marginTop: "30px", marginBottom: "0" }}>
      <MDBRow>
        <div
          className="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
          © <CurrentDate /> Jakub Kowalewski, Maria Supińska, Mateusz Pietruczuk
        </div>
        <div
          className="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
          <a className="text-white" href="/about-us">
            About Us
          </a>
        </div>
      </MDBRow>
      <section>
        <MDBBtn
          outline
          color="light"
          floating
          className="m-1"
          href="https://www.facebook.com/"
          role="button">
          <MDBIcon fab icon="facebook-f" />
        </MDBBtn>

        <MDBBtn
          outline
          color="light"
          floating
          className="m-1"
          href="https://twitter.com/home"
          role="button">
          <MDBIcon fab icon="twitter" />
        </MDBBtn>

        <MDBBtn
          outline
          color="light"
          floating
          className="m-1"
          href="https://www.google.pl/"
          role="button">
          <MDBIcon fab icon="google" />
        </MDBBtn>
      </section>
    </MDBFooter>
  );
};

export default Footer;
