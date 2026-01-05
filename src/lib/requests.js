import axiosInstance from '../api/axios';

export const getUsers = async () => {
    const res = await axiosInstance.get(
        '/users'
    )
    console.log(res.data);

    return res.data
}

export const createUser = async (newUser) => {
    const res = await axiosInstance.post(
        '/users',
        newUser
    )
    return res.data
}

export const deleteUser = async (id)=>{
    const res = await axiosInstance.delete(`/users/${id}`)
    return res.data
}