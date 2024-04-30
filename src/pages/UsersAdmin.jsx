import Table from "../components/Tables/Table";

const UsersAdmin = () => {
  return (
    <div>
      <Table
        data={[
          { id: 1, name: "John", age: 25 },
          { id: 2, name: "Jane", age: 22 },
          { id: 3, name: "Doe", age: 30 },
        ]}
      />
    </div>
  );
};

export default UsersAdmin;
