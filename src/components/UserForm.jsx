import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

function UserForm({ mutation }) {
    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors },
        reset,
    } = useForm()

    const formSubmit = (data) => {
        mutation.mutate(data)
        reset()
    }

    return (
        <div className="w-full flex items-center justify-center px-2 sm:px-4">
            <form
                onSubmit={handleSubmit(formSubmit)}
                className="
          bg-white
          p-4 sm:p-5
          rounded-2xl
          w-full sm:w-[80%] md:w-[50%] lg:w-[30%]
          flex flex-col items-center justify-center
        "
            >
                <h1 className="text-xl sm:text-2xl md:text-3xl text-gray-800 font-bold text-center py-3 sm:py-5">
                    Create new user
                </h1>

                <div className="flex flex-col gap-2 sm:gap-3 w-full">
                    <label className="text-base sm:text-lg md:text-xl font-semibold">
                        Name:
                    </label>

                    <input
                        {...register("name", {
                            required: "Please enter your name",
                            pattern: {
                                value: /^[A-Z][a-z]{1,14}(?:\s[A-Z][a-z]{1,14})?$/,
                                message:
                                    "The name must have a capital letter and contain a minimum of 2 to 14 letters.",
                            },
                        })}
                        className="bg-gray-100 p-3 sm:p-5 rounded-2xl outline-none text-sm sm:text-base"
                        placeholder="Enter your name"
                        autoComplete="off"
                    />

                    {errors.name && (
                        <p className="text-red-600 text-sm">{errors.name.message}</p>
                    )}

                    <label className="text-base sm:text-lg md:text-xl font-semibold">
                        Email:
                    </label>

                    <input
                        {...register("email", {
                            required: "Please enter your email",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Email must contain @",
                            },
                        })}
                        className="bg-gray-100 p-3 sm:p-5 rounded-2xl outline-none text-sm sm:text-base"
                        placeholder="Enter your email"
                        autoComplete="off"
                    />

                    {errors.email && (
                        <p className="text-red-600 text-sm">{errors.email.message}</p>
                    )}
                </div>

                <button
                    disabled={isSubmitting}
                    className="
            bg-gray-100
            px-6 sm:px-10
            py-3 sm:py-5
            rounded-2xl
            mt-4 sm:mt-5
            text-base sm:text-xl md:text-2xl
            font-semibold
            transition-all
            md:hover:scale-110
            disabled:opacity-60
          "
                >
                    Submit
                </button>
            </form>
        </div>
    )
}

export default UserForm
