import { useEffect } from "react";
import { useNavigate } from "react-router";

function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Website only has the collection page, so redirect to it
    navigate("/collection", { replace: true });
  }, [navigate]);

  return <></>;
}

export default HomePage;
