import React, { useEffect, useState } from "react";
import axios from "axios";

function UserList() {
  const [userData, setUserData] = useState("");
  // Fetching user Data
  const fetchUser = async () => {
    const availableUser = await axios.get("/getUser");
    if (availableUser.data.user.length > 0) {
      setUserData(availableUser.data.user);
    }
  };
  useEffect(() => {
    fetchUser();
  }, [userData]);
  //   Editing User
  const handleEdit = async (user) => {
    const userName = prompt("Enter Name: ");
    const userEmail = prompt("Enter Email: ");
    if (!userName || !userEmail) {
      alert("Enter name and email Both !");
    } else {
      const res = await axios.put(`/updateUser/${user._id}`, {
        name: userName,
        email: userEmail,
      });
      console.log(res);
    }
  };
  //   Deleting User
  const handleDelete = (userId) => {
    const res = axios.delete(`/deleteUser/${userId}`);
    console.log(res);
  };

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-8">
          <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">
            All Users
          </h1>
        </div>
        <div className="lg:w-2/3 w-full mx-auto overflow-auto">
          <table className="table-auto w-full text-left whitespace-no-wrap">
            <thead>
              <tr>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">
                  Name
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Email
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Edit
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {userData &&
                userData.map((data) => (
                  <tr>
                    <td className="px-4 py-3">{data.name}</td>
                    <td className="px-4 py-3">{data.email}</td>
                    <td className="px-4 py-3">
                      <button
                        className="hover:text-green-500"
                        onClick={() => handleEdit(data)}
                      >
                        Edit
                      </button>
                    </td>
                    <td className="px-4 py-3 text-lg text-gray-900">
                      <button
                        className="hover:text-red-500"
                        onClick={() => handleDelete(data._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default UserList;
