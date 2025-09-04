const ErrorDisplay = ({ message }) => (
  <div className="flex justify-center items-center h-full text-center">
    <div className="bg-red-500/20 border border-red-500 text-red-300 px-6 py-4 rounded-lg" role="alert">
      <strong className="font-bold text-red-200">Oops! An Error Occurred</strong>
      <span className="block sm:inline mt-2"> {message}</span>
    </div>
  </div>
);

export default ErrorDisplay;
