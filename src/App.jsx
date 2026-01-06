import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import UserForm from './components/UserForm'
import { createUser, deleteUser, getUsers, updateUser } from './lib/requests'
import toast from 'react-hot-toast'
import { FaTrash } from 'react-icons/fa'
import { FaPencil } from 'react-icons/fa6'
import { MdOutlineCancel } from "react-icons/md";
import { useState } from 'react'

function App() {
  const queryClient = useQueryClient()
  const [uptadeData, setUpdateData] = useState(null)

  // Get users
  const { data: users, isLoading, isError, error } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  })

  // Create user
  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: (newUser) => {
      queryClient.setQueriesData(['users'], (oldUsers = []) => [
        ...oldUsers,
        newUser,
      ])
      toast.success('User created successfully!')
    },
  })

  // Delete user
  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: (_, id) => {
      queryClient.setQueriesData(['users'], (oldUsers = []) =>
        oldUsers.filter((user) => user.id !== id)
      )
      toast.success('User deleted successfully!')
    },
  })

  const updateMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: (newUser) => {
      queryClient.setQueriesData(['users'], (oldUsers = []) =>
        oldUsers.map((user) =>
          user.id === newUser.id ? newUser : user
        )
      )
      toast.success('User updated successfully!')
      setUpdateData(null)
    },
  })

  const handeleDelete = (id) => {
    deleteMutation.mutate(id)
  }

  if (isLoading)
    return (
      <h2 className="text-center text-lg sm:text-xl mt-8">Loading...</h2>
    )

  if (isError)
    return (
      <h2 className="text-center text-lg sm:text-xl mt-8 text-red-600">
        Error: {error.message}
      </h2>
    )

  console.log(uptadeData);


  return (
    <div className="min-h-screen bg-gray-100 py-6 sm:py-8 px-2 sm:px-0">
      <UserForm mutation={mutation} setUpdateData={setUpdateData} uptadeData={uptadeData} updateMutation={updateMutation} />

      <h1 className="text-center text-2xl sm:text-3xl md:text-4xl mt-10 font-bold mb-6 sm:mb-10 text-gray-800">
        Users
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto px-2 sm:px-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="
              bg-white rounded-lg shadow-md
              p-4 sm:p-6
              border border-gray-200
              transition-all relative
              md:hover:shadow-lg md:hover:scale-105 md:hover:border-2 md:hover:border-black
            "
          >
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1 sm:mb-2 wrap-break-word">
              {user.name}
            </h3>

            <p className="text-sm sm:text-base text-gray-600 break-all">
              {user.email}
            </p>

            {uptadeData?.id !== user.id && (
              <button
                onClick={() => setUpdateData(user)}
                className="
      text-blue-400 absolute
      top-10 left-70 sm:top-4 sm:right-4
      p-2 transition-all
      md:hover:scale-125 md:hover:text-blue-700
    "
              >
                <FaPencil />
              </button>
            )}

            {uptadeData?.id == user.id &&
              <button
                onClick={() => { setUpdateData(null) }}
                className="
            text-red-500 absolute
            top-10 left-70 sm:top-4 sm:right-4
            p-2
            transition-all
            md:hover:scale-125 hover:text-red-900
            "
              >
                <MdOutlineCancel />
              </button>
            }
            <button
              onClick={() => handeleDelete(user.id)}
              className="
                text-red-500 absolute
                top-2 right-2 sm:top-4 sm:right-4
                p-2
                transition-all
                md:hover:scale-125 md:hover:text-red-900
              "
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
