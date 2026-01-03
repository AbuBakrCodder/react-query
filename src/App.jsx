import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import UserForm from './components/UserForm';
import { createUser, getUsers } from './lib/requests'
import toast from 'react-hot-toast';

function App() {
  const queryClient = useQueryClient();

  // Get
  const { data: users, isLoading, isError, error } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers
  })

  // Create user

  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: (newUser) => {
      queryClient.setQueriesData(['users'], (oldUsers) => [...oldUsers, newUser])
      toast.success("User created successfully!")
    },
  })

  if (isLoading) return <h2 className='text-center text-xl mt-8'>Loading...</h2>
  if (isError) return <h2 className='text-center text-xl mt-8 text-red-600'>Error: {error.message}</h2>

  return (
    <div className='min-h-screen bg-gray-100 py-8'>
      <UserForm mutation={mutation} />
      <br />
      <h1 className='text-center text-4xl font-bold mb-10 text-gray-800'>Users</h1>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4'>
        {users.map(user => (
          <div key={user.id} className='bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow'>
            <h3 className='text-lg font-semibold text-gray-800 mb-2'>{user.name}</h3>
            <p className='text-gray-600'>{user.email}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
