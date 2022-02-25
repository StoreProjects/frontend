import React from "react";

const LoginScreen = () => {
  return (
    <div className="container flex mx-auto justify-center">
      <div className="w-5/12 h-full mt-10">
        <form className="w-full h-96 bg-white shadow-xl rounded px-8 pt-6 pb-8 mb-4">
          <div className="mt-3">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="correo"
            >
              Correo
            </label>
            <input
              type="text"
              name="email"
              placeholder="email"
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            />
          </div>
          {/* <p className="text-red-500 text-xs italic">{formErrors.email}</p> */}
          <div className="mt-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="correo"
            >
              Contraseña
            </label>
            <input
              type="password"
              placeholder="Contraseña"
              name="password"
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            />
          </div>
          {/* <p className="text-red-500 text-xs italic">{formErrors.password}</p> */}
          <div className="flex items-center justify-between mt-10">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              iniciar sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
