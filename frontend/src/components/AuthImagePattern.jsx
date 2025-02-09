const AuthImagePattern = ({ title, subtitle }) => {
    return (
      <div className="hidden lg:flex items-center justify-center bg-base-200 p-12">
        <div className="max-w-md text-center">
          <img className="mb-2.5" src="https://img.freepik.com/free-vector/vector-network-background-abstract-polygon-triangle_2065-76.jpg?ga=GA1.1.1513545806.1724570762&semt=ais_hybrid" alt=""/>
          <h2 className="text-2xl font-bold mb-4">{title}</h2>
          <p className="text-base-content/60">{subtitle}</p>
        </div>
      </div>
    );
  };
  
  export default AuthImagePattern;