import useLogin from "../../hooks/login";

function Login() {
  const {
    formData,
    handleChange,
    handleSubmit,
    error
  } = useLogin();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded shadow">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
            {error.length !== 0 && (
                <div className="p-4 bg-red-500 text-white">{error}</div>
            )}
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                </label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 mt-1 border rounded"
                />
            </div>
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                </label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-3 py-2 mt-1 border rounded"
                />
            </div>
            <div>
                <button
                    type="submit"
                    className="w-full px-4 py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700"
                >
                    Login
                </button>
                don't have an account? <a href="/register">register</a>
            </div>
        </form>
      </div>
    </div>
  );
};

export default Login
