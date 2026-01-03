import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

function UserForm({ mutation }) {
    const { register, handleSubmit, formState: { isSubmitting, errors }, reset } = useForm()

    const formSubmit = (data) => {
        console.log(data) // <-- endi undefined emas
        mutation.mutate(data)
        reset()
    }

    return (
        <div className="w-full flex items-center justify-center">
            <form
                onSubmit={handleSubmit(formSubmit)}
                className="bg-white p-5 rounded-2xl w-[30%] flex flex-col items-center justify-center"
            >
                <h1 className="text-3xl text-gray-800 font-bold text-center py-5">
                    Create new user
                </h1>

                <div className="flex flex-col gap-3 w-full">
                    <label className="text-xl font-semibold">Name:</label>
                    <input
                        {...register("name", {
                            required: "Please enter your name",
                            pattern: {
                                value: /^[A-Z][a-z]{1,14}(?:\s[A-Z][a-z]{1,14})?$/,
                                message: "Name must be like: Abu Bakr"
                            }
                        })}
                        className="bg-gray-100 p-5 rounded-2xl outline-none"
                        placeholder="Enter your name"
                        autoComplete="off"
                    />

                    {errors.name && <p className="text-red-600">{errors.name.message}</p>}
                    <label className="text-xl font-semibold">Email:</label>
                    <input
                        {...register("email", {
                            required: "Please enter your email",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Email must contain @"
                            }
                        })}
                        className="bg-gray-100 p-5 rounded-2xl outline-none"
                        placeholder="Enter your email"
                        autoComplete="off"
                    />

                    {errors.email && <p className="text-red-600">{errors.email.message}</p>}
                </div>

                <button
                    disabled={isSubmitting}
                    className="bg-gray-100 px-10 py-5 rounded-2xl mt-5 hover:scale-110 text-2xl font-semibold transition-all"
                >
                    Submit
                </button>
            </form>
        </div>
    )
}

export default UserForm
