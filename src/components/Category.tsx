import { MDBCard, MDBListGroup, MDBListGroupItem } from "mdb-react-ui-kit";

interface CategoryTypes {
  handleCategory: any;
  options: string[];
}

const Category = ({ handleCategory, options }: CategoryTypes) => {
  return (
    <MDBCard style={{ width: "18rem", marginTop: "20px" }}>
      <h4>Categories</h4>
      <MDBListGroup flush="true">
        {options.map((item: string, index: number) => (
          <MDBListGroupItem
            key={index}
            style={{ cursor: "pointer" }}
            onClick={() => handleCategory(item)}>
            {item}
          </MDBListGroupItem>
        ))}
      </MDBListGroup>
    </MDBCard>
  );
};

export default Category;
