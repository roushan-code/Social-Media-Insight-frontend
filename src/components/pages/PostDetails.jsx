import React, { useEffect, useState } from 'react'
import AdminLayout from './AdminLayout'
import UserTable from './UserTable'
// import { useErrors } from '../../hooks/hook';
import { usePostDetailsQuery } from '../../redux/api/api';

import { useNavigate } from 'react-router-dom';



const PostDetails = () => {
  const navigate = useNavigate();
  // const [deleteEmployee] = useDeleteEmployeeMutation();
// const onEditClick = (id) => {
//   navigate(`/employees/${id}`);
// };

// const onDeleteClick = async(id) => {
//   const toastId = toast.loading("Deleting Emp...")
//   try {
//     await deleteEmployee(id).unwrap().then((data) => {
//       console.log(data);
//       toast.success(data?.message, {id: toastId});
//     });
    
//   } catch (error) {
//     console.error('Failed to delete the employee:', error);
//   }
// };

const columns = [{
  field: 'id',
  headerName: 'ID',
  headerClassName: 'table-header',
  width: 230,
},

{
  field: 'postType',
  headerName: 'Post Type',
  headerClassName: 'table-header',
  width: 150,
},
{
  field: 'likes',
  headerName: 'Likes',
  headerClassName: 'table-header',
  width: 150,
},
{
  field: 'comments',
  headerName: 'Comments',
  headerClassName: 'table-header',
  width: 150,
},
{
  field: 'shares',
  headerName: 'Shares',
  headerClassName: 'table-header',
  width: 150,
},
// {
//   field: 'edit',
//   headerName: 'Edit',
//   headerClassName: 'table-header',
//   width: 100,
//   renderCell: (params) => (
//     <Button
//       variant="contained"
//       color="primary"
//       onClick={() => onEditClick(params.row.id)}
//     >
//       Edit
//     </Button>
//   ),
// },
// {
//   field: 'delete',
//   headerName: 'Delete',
//   headerClassName: 'table-header',
//   width: 100,
//   renderCell: (params) => (
//     <Button
//       variant="contained"
//       color="secondary"
//       onClick={() => onDeleteClick(params.row.id)}
//     >
//       Delete
//     </Button>
//   ),
// },
];


  
  // const {loading,data,error} = useFetchData(`${server}/api/v1/admin/users`, "dashboard-users")

  const allPosts = usePostDetailsQuery();
  const { data, error, isLoading, isError } = allPosts;
  console.log(data)
  
//   useErrors([{
//     isError: isError,
//     error: error
// }])

  
  const [rows, setRows] = useState([]);

  useEffect(() => {
    console.log(data)
    if(data){
      setRows(data?.data.map((i) => ({
        ...i,
        id: i._id,
      })));
    }
  }, [data]); // add dashboardData to the dependency array

  return  (
    <AdminLayout>
      {isLoading ? <h3>Loading</h3> : <UserTable heading={"All Employees"} columns={columns} rows={rows} />}
    </AdminLayout>
  );
};

export default PostDetails